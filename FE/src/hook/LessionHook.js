import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { URL, apiURL } from "../Context/constant";
import { serviceFetch } from "../ultis/service";
import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../ultis/Common";
import { useParams } from "react-router-dom";

export const addLecture = async (body) => {
  const data = await serviceFetch({
    url: apiURL + "/api/lesson",
    method: "POST",
    data: {
      ...body,
    },
  });
  return data;
};

export const getUserData = async () => {
  const token = getToken();
  // if (!token) {
  //   return null;
  // }
  const res = await serviceFetch({
    url: apiURL + "/api/auth/get",
    method: "POST",
    data: { token: token },
  });
  return res;
};

export const addChapter = async (body) => {
  const data = await serviceFetch({
    url: apiURL + "/api/lesson/chapter",
    method: "POST",
    data: {
      ...body,
    },
  });
  return data;
};
export const getAllChapters = async (body) => {
  const data = await serviceFetch({
    url: apiURL + "/api/lesson/getchapter",
    method: "GET",
    params: {
      ...body,
    },
  });
  return data;
};
export const updateChapter = async (body) => {
  const { id, ...other } = body;
  const data = await serviceFetch({
    url: apiURL + "/api/lesson/chapter/" + id,
    method: "POST",
    data: {
      ...other,
    },
  });
  return data;
};
export const getChapterById = async (body) => {
  const { id } = body;
  const data = await serviceFetch({
    url: apiURL + "/api/lesson/chapterid/" + id,
    method: "GET",
  });
  return data;
};

export const addCourse = async (body) => {
  const data = await serviceFetch({
    url: apiURL + "/api/course",
    method: "POST",
    data: {
      ...body,
    },
  });
  return data;
};
export const updateLecture = async (body) => {
  const data = await serviceFetch({
    url: apiURL + "/api/lesson",
    method: "PUT",
    data: {
      ...body,
    },
  });
  return data;
};
export const updateAssignment = async (body) => {
  const data = await serviceFetch({
    url: apiURL + "/api/assignment",
    method: "PUT",
    data: {
      ...body,
    },
  });
  return data;
};
export const getLectureById = async ({ queryKey }) => {
  const data = await serviceFetch({
    url: apiURL + "/api/lesson/" + queryKey[1],
    method: "GET",
  });
  return data;
};

export const updateCourse = async (body) => {
  const data = await serviceFetch({
    url: apiURL + "/api/course/" + body?.id,
    method: "PUT",
    data: {
      ...body?.body,
    },
  });
  return data;
};

export const getCourse = async ({ queryKey }) => {
  const data = await serviceFetch({
    url: apiURL + "/api/course/" + queryKey[1],
    method: "GET",
  });
  return data;
};

export const getAllCourse = async ({ queryKey }) => {
  // const  []=queryKey
  const data = await serviceFetch({
    url: apiURL + "/api/course/all",
    method: "GET",
    params: {
      ...queryKey[1],
    },
  });
  return data;
};

export const addSection = async (body) => {
  const data = await serviceFetch({
    url: apiURL + "/api/section",
    method: "POST",
    data: {
      ...body,
    },
  });
  return data;
};

export const addGroup = async (body) => {
  const data = await serviceFetch({
    url: apiURL + "/api/group",
    method: "POST",
    data: {
      ...body,
    },
  });

  return data;
};

export const updateSection = async (body) => {
  const data = await serviceFetch({
    url: apiURL + "/api/lesson/section/" + body?.id,
    method: "PUT",
    data: {
      ...body?.body,
    },
  });
  return data;
};

export const updateGroup = async (body) => {
  const data = await serviceFetch({
    url: apiURL + "/api/group/" + body?.id,
    method: "PUT",
    data: {
      ...body?.body,
    },
  });
  return data;
};

// export const removeGroup = async (body) => {
//   const data = await serviceFetch({
//     url: apiURL + "/api/group/" + body?.id,
//     method: "PUT",
//     data: {
//       ...body?.body,
//     },
//   });
//   return data;
// };

export const getGroupById = async ({ queryKey }) => {
  const data = await serviceFetch({
    url: apiURL + "/api/group/" + queryKey[1],
    method: "GET",
  });
  return data;
};

export const useLectureService = () => {
  const queryClient = useQueryClient();
  const addLectureMutation = useMutation(addLecture, {
    onSuccess: (data) => {
      if (!data?.message) {
        queryClient.setQueryData(["lesson", data?.lesson?._id], data);
      } else {
        const dt = {
          lesson: {},
        };
        queryClient.setQueryData(["lesson"], dt);
      }
    },
  });
  return {
    addLecture: async (body) => {
      return addLectureMutation.mutateAsync({ ...body });
    },
  };
};

export const useGroupService = () => {
  const queryClient = useQueryClient();
  const { id: _id } = useParams();
  const [id, setId] = useState(_id);
  const retryOptions = {
    retry: 1, // Number of retry attempts
    retryDelay: 5000, // Delay between retry attempts in milliseconds
  };
  const { data } = useQuery(["group_detail", id], getGroupById, retryOptions);
  const addLectureMutation = useMutation(addLecture, {
    onSuccess: (data) => {
      if (!data?.message) {
        queryClient.setQueryData(["lesson", data?.lesson?._id], data);
      } else {
        const dt = {
          lesson: {},
        };
        queryClient.setQueryData(["lesson"], dt);
      }
    },
  });

  const addMeetingMutation = useMutation(createMeeting, {
    onSuccess: (data) => {
      if (!data?.message) {
        queryClient.invalidateQueries(["group_detail", id]);
      } else {
        // queryClient.setQueryData(["course", id], null);
      }
    },
  });
  return {
    addLecture: async (body) => {
      return addLectureMutation.mutateAsync({ ...body });
    },
    addMeeting: async (body) => {
      return addMeetingMutation.mutateAsync({ ...body });
    },

    fetch: async (params) => {
      const res = await queryClient.fetchQuery(
        ["group_detail", params],
        getGroupById
      );
      return res;
    },
  };
};

export const useCourseService = () => {
  const retryOptions = {
    retry: 9, // Number of retry attempts
    retryDelay: 5000, // Delay between retry attempts in milliseconds
  };
  const [id, setId] = useState(
    !!sessionStorage.getItem("new_course")
      ? sessionStorage.getItem("new_course")
      : ""
  );
  const { data } = useQuery(["course", id], getCourse, retryOptions);
  const queryClient = useQueryClient();
  const updatedCourseMutation = useMutation(updateCourse, {
    onSuccess: (data) => {
      if (!data?.message) {
        queryClient.invalidateQueries(["course", id]);
      } else {
        queryClient.setQueryData(["course", id], null);
      }
    },
  });

  const addSectionMutation = useMutation(addSection, {
    onSuccess: (data) => {
      if (!data?.message) {
        queryClient.invalidateQueries(["course", id]);
      }
    },
    onError: (error) => {},
  });

  const updateSectionMutation = useMutation(updateSection, {
    onSuccess: (data) => {
      if (!data?.message) {
        queryClient.invalidateQueries(["course", id]);
      }
    },
    onError: (error) => {},
  });

  const addLectureMutation = useMutation(addLecture, {
    onSuccess: (data) => {
      if (!data?.message) {
        queryClient.invalidateQueries(["course", id]);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const addAssignmentMutation = useMutation(addAssignment, {
    onSuccess: (data) => {
      if (!data?.message) {
        queryClient.invalidateQueries(["course", id]);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const addGroupMutation = useMutation(addGroup, {
    onSuccess: (data) => {
      if (!data?.message) {
        queryClient.invalidateQueries(["course", id]);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const updateGroupMutation = useMutation(updateGroup, {
    onSuccess: (data) => {
      if (!data?.message) {
        queryClient.invalidateQueries(["course", id]);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const updateLectureMutation = useMutation(updateLecture, {
    onSuccess: (data) => {
      if (!data?.message) {
        queryClient.invalidateQueries(["course", id]);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const updateAssigmentMutation = useMutation(updateAssignment, {
    onSuccess: (data) => {
      if (!data?.message) {
        queryClient.invalidateQueries(["course", id]);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const deleteGroupMutation = useMutation(deleteDocument, {
    onSuccess: (data) => {
      if (!data?.message) {
        queryClient.invalidateQueries(["course", id]);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return {
    // addCourse: async (body) => {
    //   return addCourseMutation.mutateAsync({ ...body });
    // },
    updateCourse: async (body) => {
      return await updatedCourseMutation.mutateAsync({ ...body });
    },
    addSection: async (body) => {
      return await addSectionMutation.mutateAsync({ ...body });
    },
    updateSection: async (body) => {
      return await updateSectionMutation.mutateAsync({ ...body });
    },
    addLecture: async (body) => {
      return await addLectureMutation.mutateAsync({ ...body });
    },
    addAssignment: async (body) => {
      return await addAssignmentMutation.mutateAsync({ ...body });
    },
    addGroup: async (body) => {
      return await addGroupMutation.mutateAsync({ ...body });
    },
    updateGroup: async (body) => {
      return await updateGroupMutation.mutateAsync({ ...body });
    },
    updateLecture: async (body) => {
      return await updateLectureMutation.mutateAsync({ ...body });
    },
    deleteGroupMutation: async (body) => {
      return await deleteGroupMutation.mutateAsync({ ...body });
    },
    updateAssignment: async (body) => {
      return await updateAssigmentMutation.mutateAsync({ ...body });
    },
    get: (id) => {
      return data;
    },
    fetch: async (params) => {
      console.log("prefetchh");
      const res = await queryClient.fetchQuery(["course", params], getCourse);
      setId(id);
      return res;
    },
  };
};

export const getByRole = async (body) => {
  const data = await serviceFetch({
    url: apiURL + "/api/course/getbyrole",
    method: "GET",
    params: {
      ...body,
    },
  });
  return data;
};

export const getAllCategories = async (body) => {
  const data = await serviceFetch({
    url: apiURL + "/api/auth/categories",
    method: "GET",
    params: {
      ...body,
    },
  });
  return data;
};

export const uploadFile = async (body) => {
  console.log("body: " + JSON.stringify(body));
  const res = await axios.post(
    "https://api.cloudinary.com/v1_1/drvb2kjug/upload",
    body
  );
  return res;
};

export const addAssignment = async (body) => {
  const data = await serviceFetch({
    url: apiURL + "/api/assignment",
    method: "POST",
    data: {
      ...body,
    },
  });
  return data;
};

export const payment = async (body) => {
  const data = await serviceFetch({
    url: apiURL + "/payment",
    method: "POST",
    data: {
      ...body,
    },
  });
  return data;
};
export const addOrder = async (body) => {
  const data = await serviceFetch({
    url: apiURL + "/api/order",
    method: "POST",
    data: {
      ...body,
    },
  });
  return data;
};

export const getAllOrder = async ({ queryKey }) => {
  const data = await serviceFetch(
    {
      url: apiURL + "/api/order/all",
      method: "GET",
      params: {
        ...queryKey[1],
      },
    },
    URL,
    null,
    true
  );
  return data;
};

export const updateOrder = async (body) => {
  const data = await serviceFetch({
    url: apiURL + "/api/order",
    method: "PUT",
    data: {
      ...body,
    },
  });
  return data;
};

export const getOrder = async ({ queryKey }) => {
  const data = await serviceFetch({
    url: apiURL + "/api/order/" + queryKey[1],
    method: "GET",
  });
  return data;
};

export const createMeeting = async (body) => {
  const data = await serviceFetch({
    url: apiURL + "/api/meeting",
    method: "POST",
    data: body,
  });
  return data;
};

export const getMeeting = async ({ queryKey }) => {
  const data = await serviceFetch({
    url: apiURL + "/api/meeting/get/" + queryKey[1],
    method: "GET",
  });
  return data;
};

export const adminGetAllCategory = async ({ queryKey }) => {
  const data = await serviceFetch({
    url: apiURL + "/api/auth/allcategory",
    method: "GET",
  });
  return data;
};
export const adminGetAllCategoryGroup = async ({ queryKey }) => {
  const data = await serviceFetch({
    url: apiURL + "/api/auth/allcategorygroup",
    method: "GET",
  });
  return data;
};

export const addCategory = async (body) => {
  const data = await serviceFetch({
    url: apiURL + "/api/auth/category",
    method: "POST",
    data: body,
  });
  return data;
};

export const addCategoryGroup = async (body) => {
  const data = await serviceFetch({
    url: apiURL + "/api/auth/categorygroup",
    method: "POST",
    data: body,
  });
  return data;
};

export const deleteDocument = async (body) => {
  const data = await serviceFetch({
    url: apiURL + "/api/auth/delete",
    method: "DELETE",
    params: body,
  });
  return data;
};

export const postComment = async (body) => {
  const data = await serviceFetch({
    url: apiURL + "/api/course/comment",
    method: "POST",
    data: body,
  });
  return data;
};

export const updateUser = async (body) => {
  const data = await serviceFetch({
    url: apiURL + "/api/auth/" + body?.id,
    method: "POST",
    data: body,
  });
  return data;
};

// export const useCategoryGroupService=()=>{
//   const addCateGroupMutation = useMutation(updateGroup, {
//     onSuccess: (data) => {
//       if (!data?.message) {
//         queryClient.invalidateQueries(["course", id]);
//       }
//     },
//     onError: (error) => {
//       console.log(error);
//     },
//   });

//   return {
//     // addCourse: async (body) => {
//     //   return addCourseMutation.mutateAsync({ ...body });
//     // },
//     updateCourse: async (body) => {
//       return await updatedCourseMutation.mutateAsync({ ...body });
//     }}
// }
