import {Router} from "express";
import { createUser, createTodo, fetchTodo } from "../controllers/user.controller";

const router = Router()

router.route("/").post(createUser)
router.route("/:userId/todo").post(createTodo)
router.route("/todo/:todoId").get(fetchTodo)

export default router;

