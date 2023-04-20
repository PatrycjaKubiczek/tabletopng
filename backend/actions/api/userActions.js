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
    } catch (e) {
      res.status(422).json({ message: e.message });
    }

    res.status(201).json({ message: "success", data: { name, team, points } });
  }
  async getAllUsers(req, res) {
    let doc;
    try {
      doc = await User.find({});
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
    res.status(200).json({ message: "success", data: doc });
  }
  async getUser(req, res) {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });

    res.status(200).json({ message: "success", data: user });
  }
  async updateUser(req, res) {
    const id = req.params.id;
    const name = req.body.name;
    const team = req.body.team;
    const user = await User.findOne({ _id: id });

    user.name = name;
    user.team = team;
    await user.save();

    res.status(201).json({ message: "success", data: { id, name, team } });
  }
  async deleteUser(req, res) {
    const id = req.params.id;
    await User.deleteOne({ _id: id });

    res.sendStatus(204);
  }
  async addPointsToUser(req, res) {
    const id = req.params.id;
    const points = req.body.points;
    const user = await User.findOne({ _id: id });

    user.points = points;
    await user.save();

    res.status(201).json({ message: "success", data: { id, points } });
  }
}

module.exports = new UserActions();
