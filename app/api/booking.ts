import { NextApiRequest, NextApiResponse } from "next";
import { booking } from "./models/booking";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const bookings = await booking.findMany();
      res.status(200).json(bookings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching bookings" });
    }
  } else {
    // Implement logic for other HTTP methods (POST, PUT, DELETE)
    res.status(405).json({ message: "Method not allowed" });
  }
}
