const Note = require("../../db/models/note");

class NoteActions {
  async saveNote(req, res) {
    const title = req.body.title;
    const body = req.body.body;
    let note;

    try {
      note = new Note({ title, body });
      await note.save();
    } catch (e) {
      res.status(422).json({ message: e.message });
    }

    res.status(201).json({ message: "success", data: note });
  }
  async getAllNotes(req, res) {
    let doc;
    try {
      doc = await Note.find({});
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
    res.status(200).json({ message: "success", data: doc });
  }
  async getNote(req, res) {
    const id = req.params.id;
    const note = await Note.findOne({ _id: id });

    res.status(200).json({ message: "success", data: note });
  }
  async updateNote(req, res) {
    const id = req.params.id;
    const title = req.body.title;
    const body = req.body.body;
    const note = await Note.findOne({ _id: id });

    note.title = title;
    note.body = body;
    await note.save();

    res.status(201).json({ message: "success", data: { id, title, body } });
  }
  async deleteNote(req, res) {
    const id = req.params.id;
    await Note.deleteOne({ _id: id });

    res.sendStatus(204);
  }
}

module.exports = new NoteActions();
