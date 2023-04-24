const Team = require("../../db/models/team");

class TeamActions {
  async saveTeam(req, res) {
    const name = req.body.name;
    const logo = req.body.logo;

    if (!name || !logo) {
      return res.status(422).json({ message: "Name and logo are required" });
    }

    try {
      const existingTeam = await Team.findOne({ name });
      if (existingTeam) {
        return res.status(422).json({ message: "Team already exists" });
      }

      const team = new Team({ name, logo });
      await team.save();

      res.status(201).json({ message: "success", data: { name, team } });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }

  async getAllTeams(req, res) {
    try {
      const teams = await Team.find({});
      res.status(200).json({ message: "success", data: teams });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }

  async getTeam(req, res) {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "Team ID is required" });
    }

    try {
      const team = await Team.findOne({ _id: id });
      if (!team) {
        return res.status(404).json({ message: "Team not found" });
      }

      res.status(200).json({ message: "success", data: team });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }

  async updateTeam(req, res) {
    const id = req.params.id;
    const name = req.body.name;

    if (!id) {
      return res.status(400).json({ message: "Team ID is required" });
    }
    if (!name) {
      return res.status(422).json({ message: "Name is required" });
    }

    try {
      const team = await Team.findOne({ _id: id });

      if (!team) {
        return res.status(404).json({ message: "Team not found" });
      }
      const points = req.body.points;
      team.points += points;

      await team.save();

      res.status(200).json({ message: "success", data: team });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }

  async deleteTeam(req, res) {
    const id = req.params.id;
    await Team.deleteOne({ _id: id });

    res.sendStatus(204);
  }

  //   async addPointsToTeam(req, res) {
  //     const id = req.params.id;
  //     const points = req.body.points;
  //     const team = await Team.findOne({ _id: id });

  //     team.points = points;
  //     await team.save();

  //     res.sendStatus(201).json({ message: "success", data: { id, points } });
  //   }
}

module.exports = new TeamActions();
