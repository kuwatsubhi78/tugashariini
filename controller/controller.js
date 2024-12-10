const pool = require("../config/db");

// mendapatkan semua catatan
const getNotes = async (req, res) => {
  try {
    const [results] = await pool.query("SELECT * FROM notes");
    res.json(results);
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat mengambil catatan",
      error: error,
    });
  }
};

// mendapatkan catatan berdasarkan id
const getNoteById = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await pool.query("SELECT * FROM notes WHERE id = ?", [
      id,
    ]);
    if (results.length === 0) {
      return res.status(404).json({ message: "Catatan tidak ditemukan" });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat mengambil catatan",
      error: error,
    });
  }
};

// menambahkan catatan
const addNote = async (req, res) => {
  const { title, note } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO notes (title, datetime, note) VALUES (?, NOW(), ?)",
      [title, note]
    );
    res.status(200).json({ message: "Catatan berhasil ditambahkan" });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat menambahkan catatan",
      error: error,
    });
  }
};

// menghapus catatan
const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM notes WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(400).json({ message: "ID catatan tidak ditemukan" });
    }

    const [result] = await pool.query("DELETE FROM notes WHERE id = ?", [id]);
    res.json({ message: "Catatan berhasil dihapus" });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat menghapus catatan",
      error: error,
    });
  }
};

// update catatan
const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, note } = req.body;
  try {
    const [rows] = await pool.query("SELECT * FROM notes WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(400).json({ message: "ID catatan tidak ditemukan" });
    }
    const [result] = await pool.query(
      "UPDATE notes SET title = ?, datetime = NOW(), note = ? WHERE id = ?",
      [title, note, id]
    );
    res.json({ message: "Catatan berhasil diperbarui" });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat memperbarui catatan",
      error: error,
    });
  }
};

module.exports = { getNotes, getNoteById, addNote, deleteNote, updateNote };
