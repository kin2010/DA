export { default as AuthService } from "./auth.api";
export { default as RoleSerice } from "./role.api";
export { default as LectureService } from "./lession.api";
export { default as MeetingSerivce } from "./meeting.api";
export { default as SectionService } from "./section.api";
export { default as AssignmentService } from "./assignment";
export type pageParams = {
  limit?: string;
  skip?: string;
};
