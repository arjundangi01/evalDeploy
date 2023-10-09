const express = require("express");
const authorizeMdl = require("../middlewares/authoriseMdl");
const TodoModel = require("../model/todo.model");

const todoRouter = express.Router();

todoRouter.get("/", authorizeMdl, async (req, res) => {
  try {
    const { status, tag } = req.query;
    const userId = req.userId;
    let filter = {
      authorId: userId,
    };
    if (status) {
      filter["status"] = status;
    }
    if (tag) {
      filter["tag"] = tag;
    }
    const todos = await TodoModel.find(filter);
    res.status(200).send(todos);
  } catch (error) {
    console.log("err in get req", error);
  }
});
todoRouter.get("/one/:todoId", authorizeMdl, async (req, res) => {
  try {
    const userId = req.userId;
    const  {todoId}  = req.params;
    console.log(todoId)

    const todos = await TodoModel.findOne({_id:todoId});
    res.status(200).send(todos);
  } catch (error) {
    console.log("err in get req", error);
  }
});
todoRouter.post("/", authorizeMdl, async (req, res) => {
  try {
    const { taskName, status, tag } = req.body;
    const userId = req.userId;
    console.log('first',taskName,status,tag)
    const newTodo = await TodoModel.create({
      taskName,
      status,
      tag,
      authorId: userId,
    });
    console.log(newTodo)
    res.status(200).send(newTodo);
  } catch (error) {
    console.log("err in get req", error);
  }
});
todoRouter.patch("/:todoId", authorizeMdl, async (req, res) => {
  try {
    const { todoId } = req.params;
    console.log(todoId);
    const input = req.body;
    const userId = req.userId;
    const checkForUser = await TodoModel.findOne({
      authorId: userId,
      _id: todoId,
    });
    if (!checkForUser) {
      return res.status(400).send({ message: "You are not allowed to update this blog" });
    }

    const newTodo = await TodoModel.updateOne({ _id: todoId }, input);
    res.status(200).send({ message: "blog updated" });
  } catch (error) {
    console.log("err in get req", error);
  }
});
todoRouter.delete("/:todoId", authorizeMdl, async (req, res) => {
  try {
    const { todoId } = req.params;
    console.log(todoId);
 
    const userId = req.userId;
    const checkForUser = await TodoModel.findOne({
      authorId: userId,
      _id: todoId,
    });
    if (!checkForUser) {
      return res.status(400).send({ message: "You are not allowed to delete this blog" });
    }

    await TodoModel.deleteOne({ _id: todoId });
    res.status(200).send({ message: "blog deleted" });
  } catch (error) {
    console.log("err in get req", error);
  }
});

module.exports = todoRouter;
