import { MeetingChatType } from "../api/meeting.api";
import { Meeting } from "../models";
import { serviceFetch } from "../utils/fetch";

export const userStartMeeting = async (room: any, user: string) => {
  const isRoomExist = await serviceFetch({
    url: "api/meeting/" + room,
    method: "GET",
  });
  if (isRoomExist?.status !== 200) {
    const newRoom = await serviceFetch({
      url: "api/meeting",
      method: "POST",
      data: {
        attendance: [
          {
            user: user,
            time: new Date(),
            status: "join",
          },
        ],
        users: [user],
      },
    });
    return newRoom;
  } else {
    const member = isRoomExist?.meeting?.users as Array<any>;
    const set = new Set<string>(member);
    set.add(user);
    const newuser = Array.from(set);
    // const newmtg = await serviceFetch({
    //   url: "api/meeting",
    //   method: "PUT",
    //   data: {
    //     _id: isRoomExist?.meeting?._id,
    //     data: { users: newuser },
    //   },
    // });
    const meeting = await Meeting.findByIdAndUpdate(
      isRoomExist?.meeting?._id,
      {
        $push: {
          attendance: {
            user: user,
            time: new Date(),
            status: "join",
          },
        },
        $addToSet: {
          users: user,
        },
      },
      { new: true }
    );
    return { meeting: meeting };
  }
  // name status: join leave
};

export const userExit = async (userId: string, room: string) => {
  const newmtg = await serviceFetch({
    url: "api/meeting/online",
    method: "POST",
    data: {
      userId: userId,
      room: room,
      type: "delete",
    },
  });
  return newmtg;
};

export const meetingChat = async (body: MeetingChatType) => {
  const { userId, message, room, time } = body;

  const rs = await serviceFetch({
    url: "api/meeting/chat",
    method: "POST",
    data: {
      userId: userId,
      room: room,
      message: message,
      time: time || new Date(),
    },
  });
  if (rs?.status === 200) {
    return rs?.msg?.chat;
  }
  return [];
};
export const groupChat = async (body: {
  group: string;
  msg: string;
  userId: string;
  time: string;
}) => {
  const { userId, msg, group, time } = body;

  const rs = await serviceFetch({
    url: "/api/group/chat",
    method: "POST",
    data: {
      userId: userId,
      group: group,
      msg: msg,
      time: time || new Date(),
    },
  });
  console.log(rs, 111);
  if (rs?.status === 200) {
    return rs?.data?.chats;
  }
  return [];
};
