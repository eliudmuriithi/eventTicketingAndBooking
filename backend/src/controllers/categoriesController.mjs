import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json({
      message: "categories fetched successful.",
      Categories: categories,
    });
  } catch (error) {
    res.status(500).json({ Message: "Internal server error" });
  }
};

export const addCategory = async (req, res) => {
  const category = req.body;
  try {
    const addedCategory = await prisma.category.create({
      data: {
        ...category,
      },
    });
    res.status(201).json({
      Message: "cateeeegory add successful.",
      Category: addedCategory,
    });
  } catch (error) {
    res.status(500).json({ Message: "Internal server error" });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const updatedCategory = req.body;

  try {
    const category = await prisma.category.update({
      where: { id: parseInt(id) },
      data: {
        ...updatedCategory,
      },
    });
    res
      .status(200)
      .json({ Message: "category updated successful", Category: category });
  } catch (error) {
    res.status(500).json({ Message: "Internal server error" });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.category.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ Message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ Message: "Intenal server error" });
  }
};
