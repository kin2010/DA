import { serviceFetch } from "../utils/fetch";

export const userStartMeeting = async (room: any, user: string) => {
  const isRoomExist = await serviceFetch({
    url: "api/meeting",
    method: "GET",
    data: {
      url: room,
    },
  });
  if (isRoomExist?.status !== 200) {
    const newRoom = await serviceFetch({
      url: "api/meeting",
      method: "POST",
      data: {
        url: room,
        users: [user],
      },
    });
    return newRoom;
  } else {
    const member = isRoomExist?.meeting?.users as Array<any>;
    const set = new Set<string>(member);
    set.add(user);
    const newuser = Array.from(set);
    const newmtg = await serviceFetch({
      url: "api/meeting",
      method: "PUT",
      data: {
        _id: isRoomExist?.meeting?._id,
        data: { users: newuser },
      },
    });
    return newmtg;
  }
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
