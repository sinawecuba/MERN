import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// ✅ CREATE a book
router.post("/", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;

    if (!title || !author || publishYear === undefined) {
      return res.status(400).json({
        message: "Please send all required fields: title, author, publishYear",
      });
    }

    const newBook = { title, author, publishYear };
    const book = await Book.create(newBook);

    return res.status(201).json(book);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
});

// ✅ GET all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
});

// ✅ GET one book by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
});

// ✅ UPDATE a book
router.put("/:id", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;

    if (!title || !author || publishYear === undefined) {
      return res.status(400).json({
        message: "Please send all required fields: title, author, publishYear",
      });
    }

    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(
      id,
      { title, author, publishYear },
      { new: true }
    );

    if (!result) return res.status(404).json({ message: "Book not found" });

    return res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
});

// ✅ DELETE a book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Book.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ message: "Book not found" });

    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
});

export default router;
