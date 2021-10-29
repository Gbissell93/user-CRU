const express = require("express");
const router = express.Router();
const { jwtMiddleware } = require("../shared/jwt");
const Todo = require("./model/Todo");
const User = require("../user/model/user");
const { isBoolean } = require("validator");
/* GET order listing. */
router.get("/", jwtMiddleware, async function (req, res) {
  allTodo = await Todo.find({});

  res.json({ message: "success", payload: allTodo });
});

router.post("/new", jwtMiddleware, async function (req, res) {
  try {
    const { todo, isDone } = req.body;

    //err check section
    let errObj = {};

    if (!isBoolean(isDone)) {
      errObj.todoName = "must be 'true' or 'false'";
    }

    if (Object.keys(errObj).length > 0) {
      return res.status(500).json({ message: "error", error: errObj });
    }

    const decoded = res.locals.decoded;
    let foundUser = await User.findOne({ email: decoded.email });

    const createdtodo = new Todo({
      todo,
      isDone,
      todoOwner: foundUser._id,
    });

    let savedtodo = await createdtodo.save();

    foundUser.todoList.push(savedtodo._id);

    res.json({ message: "success", createdtodo });
  } catch (e) {
    res.status(500).json({ message: "error", error: e.message });
  }
});

router.delete("/delete-by-id/:id", jwtMiddleware, async function (req, res) {
  try {
    let deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo) {
      return res
        .status(404)
        .json({ message: "failure", error: "recod not found" });
    } else {
      const decoded = res.locals.decoded;

      let foundUser = await User.findOne({ email: decoded.email });

      let newTodoArray = foundUser.todoList.filter((item) => {
        item._id.toString() !== req.params.id;
      });
      foundUser.todoList = newTodoArray;

      await foundUser.save();

      res.json({ message: "item deleted", deleted: deletedTodo });
    }
  } catch (e) {
    res.status(500).json({ message: "error", error: e.message });
  }
});
module.exports = router;
