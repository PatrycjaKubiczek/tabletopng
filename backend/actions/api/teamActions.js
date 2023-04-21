const Team = require("../../db/models/team");

class TeamActions {
  async saveTeam(req, res) {
    const name = req.body.name;
    const logo = req.body.logo;
    const points = 0;
    let team;

    try {
      team = new Team({ name, logo });
      await team.save();
    } catch (e) {
      res.status(422).json({ message: e.message });
    }

    res.status(201).json({ message: "success", data: { name, team, points } });
  }
  async getAllTeams(req, res) {
    let doc;
    try {
      doc = await Team.find({});
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
    res.status(200).json({ message: "success", data: doc });
  }
  async getTeam(req, res) {
    const id = req.params.id;
    const team = await Team.findOne({ _id: id });

    res.status(200).json({ message: "success", data: team });
  }
  async updateTeam(req, res) {
    const id = req.params.id;
    const name = req.body.name;
    const teamName = req.body.team;
    const team = await Team.findOne({ _id: id });

    Team.name = name;
    Team.teamName = team;
    await user.save();

    res.status(201).json({ message: "success", data: { id, name, team } });
  }
  async deleteTeam(req, res) {
    const id = req.params.id;
    await Team.deleteOne({ _id: id });

    res.sendStatus(204);
  }
  async addPointsToTeam(req, res) {
    const id = req.params.id;
    const points = req.body.points;
    const team = await Team.findOne({ _id: id });

    team.points = points;
    await team.save();

    res.status(201).json({ message: "success", data: { id, points } });
  }
}

module.exports = new TeamActions();
