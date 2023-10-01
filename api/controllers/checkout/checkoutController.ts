import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
dotenv.config();
import { OrderObject } from "../../model/order.model.js";
const SCALAPAY_SECRET_KEY = process.env.SCALAPAY_SECRET_KEY;

if (!SCALAPAY_SECRET_KEY) {
  throw new Error("Missing required environment variables");
}

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  const body: RequestBody = req.body;

  const orderObject: OrderObject = {
    totalAmount: {
      currency: "EUR",
      amount: body.totalAmount,
    },
    consumer: {
      surname: body.firstName,
      givenNames: body.lastName,
    },
    shipping: {
      countryCode: body.countryCode,
      name: body.firstName.concat(" ", body.lastName),
      postcode: body.postcode,
      suburb: body.suburb,
      line1: body.line1,
      phoneNumber: body.phone
    },
    merchant: {
      redirectCancelUrl: "https://portal.integration.scalapay.com/failure-url",
      redirectConfirmUrl: "https://portal.integration.scalapay.com/success-url",
    },
    type: "online",
    product: body.product,
    frequency: { number: 1, frequencyType: "monthly" },
    items: body.items.map((item) => ({
      price: { currency: "EUR", amount: item.amount },
      quantity: item.quantity,
      name: item.name,
      category: item.category,
      sku: item.sku,
    })),
    orderExpiryMilliseconds: 600000
  };

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${process.env.SCALAPAY_SECRET_KEY}`
    },
    body: JSON.stringify(orderObject)
  }

  try {
    const result = await fetch(`${process.env.SCALAPAY_API_URL}`, options);
    const data = await result.json();
    console.log(data);
    if (!data?.token) {
      return res.status(500).json('Can not procecced order successfully!')
    }
    return res.status(200).json(data)
    // return res.redirect(301, data.checkoutUrl);
  } catch (error) {
    if (error instanceof globalThis.Response.error) {
      next(error);
    }
  }
}




