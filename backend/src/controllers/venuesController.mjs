import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllVenues = async (req, res) => {
  try {
    const venues = await prisma.venue.findMany();
    res
      .status(200)
      .json({ Message: "Venues are Fetched Successfull.", Venues: venues });
  } catch (error) {
    console.log(`error ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addVenue = async (req, res) => {
  const data = req.body;

  try {
    const venue = await prisma.venue.create({
      data: {
        ...data,
      },
    });
    res
      .status(201)
      .json({ Message: "Venue Add Successfull.", createdVenue: venue });
  } catch (error) {
    console.log(`error :${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateVenue = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const venue = await prisma.venue.update({
      where: { id: parseInt(id) },

      data: {
        ...updatedData,
      },
    });
    res
      .status(200)
      .json({ Message: "Veneu Updated Successfull.", updatedVenue: venue });
  } catch (error) {
    console.log(`error :${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteVenue = async (req, res) => {
  const { id } = req.params;

  try {
    const venue = await prisma.venue.delete({
      where: { id: parseInt(id) },
    });
    res
      .status(200)
      .json({ Message: "Venue deleted successfull.", deleteVenue: venue });
  } catch (error) {}
};
