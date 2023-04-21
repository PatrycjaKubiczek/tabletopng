const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
});

const Team = mongoose.model("Team", TeamSchema);

module.exports = Team;
