import Note from "../models/node.model.js";

/**
 * Create a new note
 */
export const createNode = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: "Title and Content are required" });
    }

    const newNote = await Note.create({ title, content });
    res.status(201).json({ success: true, note: newNote });
  } catch (error) {
    console.error("Create Note Error:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/**
 * Get all notes, newest first
 */
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: notes.length, notes });
  } catch (error) {
    console.error("Get Notes Error:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/**
 * Update a note by ID
 */
export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true, runValidators: true } // ensures validation rules
    );

    if (!updatedNote) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    res.status(200).json({ success: true, note: updatedNote, message: "Note updated successfully" });
  } catch (error) {
    console.error("Update Note Error:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/**
 * Delete a note by ID
 */
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    res.status(200).json({ success: true, note: deletedNote, message: "Note deleted successfully" });
  } catch (error) {
    console.error("Delete Note Error:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
