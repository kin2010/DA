import { serviceFetch } from "../utils/fetch";

export const userStartMeeting = async (
  socket: any,
  room: any,
  user: string
) => {
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
    console.log(333, set, user);
    const newuser = Array.from(set);
    console.log(44, newuser, isRoomExist);
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
