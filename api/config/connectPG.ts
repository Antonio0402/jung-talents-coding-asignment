import * as dotenv from "dotenv";
dotenv.config();
import pg, { QueryConfig } from "pg";

const Pool = pg.Pool;

export const pool = new Pool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_NAME,
})

export const query = async (queryString: string | QueryConfig<any[]>, value?: any[]) => {
  const result = await pool.query(queryString, value);
  return result;
}