const createtodo = async (req, res) => {
  try {
    const { todo, isDone } = req.body;

    //err check section
    let errObj = {};

    if (!isBoolean(isDone)) {
      errObj.todoName = "Amount can onlyb be a number";
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

    foundUser.todoList.push(savedtodo);

    res.json({ message: "success", createdtodo });
  } catch (e) {
    res.status(500).json({ message: "error", error: e.message });
  }
};

module.exports = {
  createtodo,
};
