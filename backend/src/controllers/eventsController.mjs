import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      include: {
        category: true, // 👈 includes full category object
      },
    });
    res
      .status(200)
      .json({ Mesage: "Events Fetched Successfull.", Events: events });
  } catch (error) {
    res.status(500).json({ Message: "Internal Server Error" });
  }
};

export const addEvent = async (req, res) => {
  const addedEvent = req.body;
  try {
    const event = await prisma.event.create({
      data: {
        ...addedEvent,
      },
    });
    res.status(201).json({ Message: "Event add successfull.", Event: event });
  } catch (error) {
    res.status(500).json({ Message: "Internal Server Error" });
  }
};

export const UpdateEvent = async (req, res) => {
  const { id } = req.params;
  const updatedEvent = req.body;

  try {
    const event = await prisma.event.update({
      where: { id: parseInt(id) },
      data: {
        ...updatedEvent,
      },
    });
    res
      .status(200)
      .json({ Message: "event updated successfull.", Event: event });
  } catch (error) {
    res.status(500).json({ Message: "Internal  server error" });
  }
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.event.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ Message: "event deleted successfull." });
  } catch (error) {
    res.status(500).json({ Message: "Internal server error" });
  }
};
