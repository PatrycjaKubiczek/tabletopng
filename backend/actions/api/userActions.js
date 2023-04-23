const mongoose = require("mongoose");
mongoose.set("debug", true);

const User = require("../../db/models/user");

class UserActions {
  async saveUser(req, res) {
    const name = req.body.name;
    const team = req.body.team;
    const points = 0;
    let user;

    try {
      user = new User({ name, team, points });
      await user.save();
      res
        .status(201)
        .json({ message: "success", data: { name, team, points } });
    } catch (e) {
      res.status(422).json({ message: e.message });
    }
  }
  async getAllUsers(req, res) {
    let doc;
    try {
      doc = await User.find({});
      res.status(200).json({ message: "success", data: doc });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
  async getUser(req, res) {
    const id = req.params.id;
    let user;
    try {
      user = await User.findOne({ _id: id });
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json({ message: "success", data: user });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }

  async updateUser(req, res) {
    const id = req.params.id;
    const name = req.body.name;
    const team = req.body.team;

    const { error } = updateUserSchema.validate({ name, team });
    if (error) {
      return res.status(422).json({ message: error.details[0].message });
    }

    const user = await User.findOne({ _id: id });

    user.name = name;
    user.team = team;
    await user.save();

    res.sendStatus(201).json({ message: "success", data: { id, name, team } });
  }
  async deleteUser(req, res) {
    const id = req.params.id;
    await User.deleteOne({ _id: id });

    res.sendStatus(204);
  }
  async addPointsToUser(req, res) {
    const id = req.params.id;
    const points = req.body.points;
    //add validation
    if (!id) {
      return res.sendStatus(400).json({ message: "User id is required" });
    }
    const user = await User.findOne({ _id: id });

    user.points = points;
    await user.save();

    res.sendStatus(201).json({ message: "success", data: { id, points } });
  }
}

module.exports = new UserActions();
