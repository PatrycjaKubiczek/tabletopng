const express = require("express");
const router = express.Router();

const userActions = require("../actions/api/userActions");

router.get("/users", userActions.getAllUsers);
router.get("/users/:id", userActions.getUser);
router.post("/users", userActions.saveUser);
router.put("/users/:id", userActions.updateUser);
router.delete("/users/:id", userActions.deleteUser);
router.patch("/users/:id/add-points", userActions.addPointsToUser);

const teamActions = require("../actions/api/teamActions");

router.get("/teams", teamActions.getAllTeams);
router.get("/teams/:id", teamActions.getTeam);
router.post("/teams", teamActions.saveTeam);
router.put("/teams/:id", teamActions.updateTeam);
router.delete("/teams/:id", teamActions.deleteTeam);

module.exports = router;
