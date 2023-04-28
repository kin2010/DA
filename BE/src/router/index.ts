import express from "express";
import authApi from "./auth.router";
import lessionApi from "./lession.router";
import cout from "../router/course.router";
import meeting from "../router/meeting.router";
const route = express.Router();
route.use("/auth", authApi);
route.use("/lession", lessionApi);
route.use("/course", cout);
route.use("/meeting", meeting);
export default route;
