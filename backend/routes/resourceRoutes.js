const express = require('express');
const router = express.Router();
const resourceController = require("../controllers/resourceController");

router.get("/getResources",resourceController.getResources);

module.exports = router;