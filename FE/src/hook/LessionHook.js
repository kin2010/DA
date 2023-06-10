import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiURL } from "../Context/constant";
import { serviceFetch } from "../ultis/service";
import { useEffect, useState } from "react";

export const addLecture = async (body) => {
  const data = await serviceFetch({
    url: apiURL + "/api/lession",
    method: "POST",
    data: {
      ...body,
    },
  });
  return data;
};

export const addChapter = async (body) => {
  const data = await serviceFetch({
    url: apiURL + "/api/lession/chapter",
    method: "POST",
    data: {
      ...body,
    },
  });
  return data;
};
export const getAllChapters = async (body) => {
  const data = await serviceFetch({
    url: apiURL + "/api/lession/getchapter",
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
    url: apiURL + "/api/lession/chapter/" + id,
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
    url: apiURL + "/api/lession/chapterid/" + id,
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
    url: apiURL + "/api/lession",
    method: "PUT",
    data: {
      ...body,
    },
  });
  return data;
};
export const getLectureById = async (body) => {
  const { id, ...other } = body;
  const data = await serviceFetch({
    url: apiURL + "/api/lession/" + body?.id,
    method: "GET",
    data: {
      ...other,
    },
  });
  return data;
};

export const updateCourse = async (body) => {
  console.log(body, "params");
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

export const updateSection = async (body) => {
  const data = await serviceFetch({
    url: apiURL + "/api/section/" + body?.id,
    method: "PUT",
    data: {
      ...body?.body,
    },
  });
  return data;
};

export const useLectureService = () => {
  const queryClient = useQueryClient();
  const addLectureMutation = useMutation(addLecture, {
    onSuccess: (data) => {
      if (data.status === 200) {
        queryClient.setQueryData(["lession", data?.lession?._id], data);
      } else {
        const dt = {
          lession: {},
        };
        queryClient.setQueryData(["lession"], dt);
      }
    },
  });
  return {
    addLecture: async (body) => {
      return addLectureMutation.mutateAsync({ ...body });
    },
  };
};

export const useCourseService = () => {
  const [id, setId] = useState(
    !!sessionStorage.getItem("new_course")
      ? sessionStorage.getItem("new_course")
      : ""
  );
  const { data } = useQuery(["course", id], getCourse);
  const queryClient = useQueryClient();
  const updatedCourseMutation = useMutation(updateCourse, {
    onSuccess: (data) => {
      if (data.status === 200) {
        queryClient.invalidateQueries(["course", id]);
      } else {
        queryClient.setQueryData(["course", id], null);
      }
    },
  });

  const addSectionMutation = useMutation(addSection, {
    onSuccess: (data) => {
      if (data.status === 200) {
        queryClient.invalidateQueries(["course", id]);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const updateSectionMutation = useMutation(updateSection, {
    onSuccess: (data) => {
      if (data.status === 200) {
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
