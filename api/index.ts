import express, { Request } from "express";
import morgan from "morgan";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
import assignId from "./middlewares/assignId.js";
import logger from "./middlewares/logger.js";
import credentials from "./config/credentials.js";
import corsOptions from "./config/corsOptions.js";
import notFound from "./config/notFound.js";
import errHandler from "./middlewares/errHandler.js";
import checkOutRoute from "./routes/checkoutRoute.js";
import productsRoute from "./routes/productsRoute.js";

/**
 * -------------- GENERAL SETUP ----------------
 */

const port = process.env.PORT || 5000;
const app = express();

//* Creating new tokens for id and origin to set log format
morgan.token('id', (req: Request) => req.id);

morgan.token('origin', (req: Request) => req.headers.origin);

//* Using middleware to create unique id for every coming request on log file
app.use(assignId);

//* Using middleware to creare a logger file in determined structure saving log for every coming request
app.use(morgan(':date[web] :id :method :origin :url', {
  stream: await logger('reqLog.txt')
}))

//* Handle options credentials check - before CORS
//* and fetch cookies credentials requirement
app.use(credentials);

//* Cross Origin Resource Sharing
app.use(cors(corsOptions));

//* built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: true }));

//* built-in middleware for json
app.use(express.json());


app.get("^/$|index(.html)?", (_req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
})

const apiRoute = express.Router();
app.use("/api/v1", apiRoute);

/**
 * -------------- ROUTES ----------------
 */

apiRoute.use("/checkout", checkOutRoute);
apiRoute.use("/products", productsRoute)

app.all('*', notFound);
app.use(errHandler);

app.listen(port, () => {
  console.log(`Backend server is running on ${port}`);
})