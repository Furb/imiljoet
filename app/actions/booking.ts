import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

// Define a type for the response data
type ResponseData =
  | { message: string }
  | import("@prisma/client").Booking[] // Using Prisma-generated types
  | import("@prisma/client").Booking;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    if (req.method === "GET") {
      const bookings = await prisma.booking.findMany();
      res.status(200).json(bookings);
    } else if (req.method === "POST") {
      const bookingData = req.body; // For simplicity, not validating input here
      const booking = await prisma.booking.create({
        data: bookingData,
      });
      res.status(201).json(booking);
    } else {
      // Method Not Allowed
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    // Handling any errors
    console.error("API Error", error);
    res.status(500).json({ message: "Server error" });
  }
}
