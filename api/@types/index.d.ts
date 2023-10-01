import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      id?: string,
    }
  }
  type RequestBody = {
    totalAmount: string,
    firstName: string,
    lastName: string,
    suburb: string;
    line1: string;
    phone: string;
    countryCode: string;
    postcode: string;
    product: "pay-in-3" | "later"
    items: RequestCheckoutItem[]
  }
  type RequestCheckoutItem = {
    amount: string;
    quantity: number,
    name: string;
    category: string;
    sku: string;
  }
}



