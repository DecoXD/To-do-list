const TaskControllers = require("../controllers/TaskControllers");
const express = require('express');
const router = express.Router();

router.post("/create",TaskControllers.createTaskPost)
router.post("/delete",TaskControllers.deleteTask)

router.get("/create",TaskControllers.createTask)

module.exports = router