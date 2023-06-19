import express from "express";
const router = express.Router();
import { OrderService } from "../api";
router.route("/").post(OrderService.add);
router.route("/").put(OrderService.update);
router.route("/:id").get(OrderService.getById);

export default router;
