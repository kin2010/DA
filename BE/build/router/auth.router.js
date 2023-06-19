"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var api_1 = require("../api");
var api_2 = require("../api");
var router = express_1.default.Router();
router.route("/login").post(api_1.AuthService.login);
router.route("/register").post(api_1.AuthService.register);
router.route("/role").post(api_2.RoleSerice.addRole);
router.route("/get").post(api_1.AuthService.getUser);
router.route("/category").post(api_2.RoleSerice.addCategory);
router.route("/categorygroup").post(api_2.RoleSerice.addCategoryGroup);
router.route("/categories").get(api_2.RoleSerice.getCategory);
router.route("/allcategory").get(api_2.RoleSerice.getAllCategory);
router.route("/allcategorygroup").get(api_2.RoleSerice.getAllCategoryGroup);
exports.default = router;
