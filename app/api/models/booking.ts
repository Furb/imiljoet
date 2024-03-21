import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const booking = prisma.booking.define({
  id: {
    type: "Int",
    primaryKey: true,
    autoIncrement: true,
  },
  subject: {
    type: "String",
  },
  startTime: {
    type: "DateTime",
  },
  endTime: {
    type: "DateTime",
  },
});
