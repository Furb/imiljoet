import prisma from "@/app/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

function capitalizeFirstLetter(obj: Record<string, any>): Record<string, any> {
  return Object.keys(obj).reduce<Record<string, any>>((accumulator, key) => {
    const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
    accumulator[capitalizedKey] = obj[key];
    return accumulator;
  }, {});
}

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({});

    const transformedBookings = bookings.map((booking) => ({
      ...capitalizeFirstLetter(booking),
      StartTime: new Date(booking.startTime),
      EndTime: new Date(booking.endTime),
    }));
    return new NextResponse(JSON.stringify(transformedBookings), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.error("Failed to retrieve bookings:", error);
    return new NextResponse(
      JSON.stringify({
        error: "Failed to retrieve bookings",
        details: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type");

  if (
    !contentType ||
    (!contentType.includes("application/json") &&
      !contentType.includes("application/x-www-form-urlencoded"))
  ) {
    return new NextResponse("Unsupported content type", { status: 415 });
  }

  try {
    const requestData = await req.json();
    console.log("Posting data to server", requestData);

    if (
      !requestData.added ||
      !Array.isArray(requestData.added) ||
      requestData.added.length === 0
    ) {
      return new NextResponse("No booking data provided", { status: 400 });
    }

    const {
      Subject: subject,
      StartTime: startTime,
      EndTime: endTime,
      Description: description,
      RoomId: roomId,
    } = requestData.added[0];

    console.log("Received data:", {
      startTime,
      endTime,
      subject,
      description,
      roomId,
    });

    if (
      !startTime ||
      new Date(startTime).toString() === "Invalid Date" ||
      !endTime ||
      new Date(endTime).toString() === "Invalid Date" ||
      typeof subject !== "string" ||
      (description !== undefined && typeof description !== "string") ||
      typeof roomId !== "number"
    ) {
      return new NextResponse("Invalid booking data provided", { status: 400 });
    }

    const booking = await prisma.booking.create({
      data: {
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        subject,
        description,
        roomId: roomId.toString(),
      },
    });

    return new NextResponse(JSON.stringify(booking), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.error("Failed to create booking:", error);
    return new NextResponse(
      JSON.stringify({
        error: "Failed to insert booking",
        details: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
