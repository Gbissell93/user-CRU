var express = require("express");
const { createUser } = require("./controller/userController");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json("respond with a resource");
});

router.post("/new-user", createUser);
module.exports = router;
