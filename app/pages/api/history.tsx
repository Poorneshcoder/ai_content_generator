// pages/api/history.ts

import { db } from "../../../utils/db";
import { aiOuput } from "../../../utils/schema";


export default async function handler(req, res) {
  try {
    const result = await db.select(aiOuput).all();
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
