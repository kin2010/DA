import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiURL } from "../Context/constant";
import { serviceFetch } from "../ultis/service";

export const addLession = async (body) => {
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
export const updateLession = async (body) => {
  const data = await serviceFetch({
    url: apiURL + "/api/lession",
    method: "PUT",
    data: {
      ...body,
    },
  });
  return data;
};
export const getLessionById = async (body) => {
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
  const data = await serviceFetch({
    url: apiURL + "/api/course/" + body?.id,
    method: "PUT",
    data: {
      ...body,
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

export const useLessionService = () => {
  const queryClient = useQueryClient();
  const addLessionMutation = useMutation(addLession, {
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
    addLession: async (body) => {
      return addLessionMutation.mutateAsync({ ...body });
    },
  };
};

export const useCourseService = () => {
  const queryClient = useQueryClient();
  const addCourseMutation = useMutation(addCourse, {
    onSuccess: (data) => {
      if (data?.status === 200) {
        queryClient.setQueryData(["course", data?.course?._id], data);
      } else {
        const dt = {
          course: {},
        };
        queryClient.setQueryData(["course"], dt);
      }
    },
  });
  const updatedCourseMutation = useMutation(updateCourse, {
    onSuccess: (data) => {
      if (data.status === 200) {
        queryClient.setQueryData(["course_update", data?.course?._id], data);
      } else {
        const dt = {
          course: {},
        };
        queryClient.setQueryData(["course"], dt);
      }
    },
  });
  return {
    addCourse: async (body) => {
      return addCourseMutation.mutateAsync({ ...body });
    },
    updateCourse: async (body) => {
      return updatedCourseMutation.mutateAsync({ ...body });
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
