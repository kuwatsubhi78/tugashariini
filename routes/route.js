const express = require("express");
const router = express.Router();
const controller = require("../controller/controller");

router.get("/catatan", controller.getNotes);
router.get("/catatan/:id", controller.getNoteById);
router.post("/tambah-catatan", controller.addNote);
router.delete("/hapus-catatan/:id", controller.deleteNote);
router.put("/perbarui-catatan/:id", controller.updateNote);

module.exports = router;
