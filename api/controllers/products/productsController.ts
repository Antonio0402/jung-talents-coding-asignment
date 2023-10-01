import { NextFunction, Request, Response } from "express";
import { QueryResult } from "pg";
import { Product } from "../../model/product/product.model.js";
import { query } from "../../config/connectPG.js";

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result: QueryResult<Product> = await query(`
    SELECT * FROM public.products`);
    if (result.rows.length) {
      res.status(200).json({
        data: result.rows
      });
    } else {
      return res.status(204).json("No post found!");
    }
  } catch (error) {
    next(error);
  }
}

export const getProductBySlug = async (req: Request, res: Response, next: NextFunction) => {
  const { slug } = req.params;
  try {
    const result: QueryResult<Product> = await query(`SELECT * FROM public.products WHERE slug = $1;`, [slug])
    if (result.rows.length) {
      res.status(200).json({
        data: result.rows[0]
      })
    } else {
      res.status(204).json("No product found!");
    }
  } catch (error) {
    next(error);
  }
}