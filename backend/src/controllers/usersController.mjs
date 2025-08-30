import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password, role, createdAt, updatedAt } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        role,
        password: hashedPassword,
        createdAt,
        updatedAt,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    //get the user by unique email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // if the user does not exite throw an error
    if (!user) {
      return res.status(404).json({ error: "Invalid credentials" });
    }

    // check whether the password is valid
    const isPasswordValid = bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(404).json({ error: "Invalid credentials" });
    }
    // generating a token upon authentication
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "24hr" });
    res.json({ message: "you logged in successful", token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export const updateUser = async (req, res) => {
  const updatedUser = req.body;

  const { id } = req.params;

  try {
    const user = await prisma.user.update({
      where: { id: parseInt(id) },

      data: {
        ...updatedUser,
      },
    });

    res.status(200).json({ message: "User updated successfully", data: user });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {}
};
