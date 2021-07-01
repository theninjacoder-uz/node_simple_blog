const express = require("express");
const blogController = require("../controllers/blogController");

const router = express.Router();

router.get("/", blogController.blogGetIndex);

router.post("/", blogController.blogCreate);

router.get("/create", blogController.blogCreateGet);

router.get("/:id", blogController.blogGetDetails);

router.delete("/:id", blogController.blogDelete);

module.exports = router;
