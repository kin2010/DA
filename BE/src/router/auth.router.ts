import express from "express";
import { AuthService } from "../api";
import { RoleSerice } from "../api";
const router = express.Router();
router.route("/login").post(AuthService.login);
router.route("/register").post(AuthService.register);
router.route("/role").post(RoleSerice.addRole);
router.route("/get").post(AuthService.getUser);
router.route("/category").post(RoleSerice.addCategory);
router.route("/categorygroup").post(RoleSerice.addCategoryGroup);
router.route("/categories").get(RoleSerice.getCategory);
export default router;
