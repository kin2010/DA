/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import { Col, Row } from "antd";
import AddIcon from "@mui/icons-material/Add";
import {
  getAllCategories,
  getCourse,
  useCourseService,
} from "../../hook/LessionHook";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Tab2 from "../Tab2";
import TeacherModal from "../../component/TeacherModal";
import { serviceFetch } from "../../ultis/service";
import { apiURL } from "../../Context/constant";
import VirtualList from "rc-virtual-list";
import { Avatar, List } from "antd";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, useParams } from "react-router-dom";
import { AppContextProvider } from "../../Context/AppContext";
import Uploadd from "../../component/Upload";
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";
import EditorCommon from "../../component/EdittorCommon/EdittorCommon";
import { Formik, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import { courseCreateSchema } from "../../Validation/CourseCreate";
import FormControl from "../../component/FormControl";
import { Button, ButtonBase, InputLabel, Select } from "@mui/material";
import Dropdown from "../../component/Dropdown";
import { Select as SeclectAntd } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";
export const TIME_FORMAT = "yyyy-MM-dd";
const CourseTab1 = ({ course, setCourse, changeTab, dataTeacher }) => {
  const { openNotification } = React.useContext(AppContextProvider);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const { handleSubmit, setFieldValue, setValues, values } = useFormikContext();
  const queryClient = useQueryClient();
  const courseId = sessionStorage.getItem("new_course");
  const { data } = useQuery(["categories"], getAllCategories);
  const courseService = useCourseService();
  const id = sessionStorage.getItem("new_course");
  const [query, setQuery] = useState();
  const { data: courseData } = useQuery(["course", id], getCourse);
  const [date, setDate] = useState({
    start: dayjs(new Date()),
    end: dayjs(new Date()),
  });

  useEffect(() => {
    if (!!courseData) {
      setValues({
        name: courseData?.name,
        teachers: courseData?.teachers?.map((teacher) => teacher?._id),
        description: courseData?.description,
        target: courseData?.target,
        requirement: courseData?.requirement,
        category: courseData?.category,
      });
      setDate({
        start: dayjs(courseData?.start),
        end: dayjs(courseData?.end),
      });
    }
  }, [courseData]);

  const categoryChange = (e) => {
    setFieldValue("category", e.target?.value || "");
  };

  useEffect(() => {
    setFieldValue("start", format(new Date(date.start), TIME_FORMAT));
    setFieldValue("end", format(new Date(date.end), TIME_FORMAT));
  }, [date]);

  return (
    <div className="widget-inner">
      <form className={"course-cr m-b30"} onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12">
            <div className="ml-auto">
              <h3 className="text-primary">1. Thông tin cơ bản</h3>
            </div>
          </div>
          <div className="form-group col-12">
            <div>
              <FormControl label="Tên khóa học" name="name"></FormControl>
            </div>
          </div>

          {/* <div className="form-group col-6">
            <label className="col-form-label">Giảng viên đào tạo:</label>
            <div>
              <Dropdown data={dataTeacher}></Dropdown>
            </div>
          </div> */}
          <div className="seperator" />
          <div className="col-12 m-t20">
            <div className="ml-auto m-b5">
              <h3 className="text-primary">2. Mô tả khóa học</h3>
            </div>
          </div>
          <div className="form-group col-12">
            <FormControl
              label={"Mô tả khóa học"}
              name="description"
              type={"editor"}
            ></FormControl>
          </div>
          <div className="form-group col-12">
            <FormControl
              label="Mục tiêu khóa học *"
              name="target"
              type={"editor"}
            ></FormControl>
          </div>
          <div className="form-group col-12">
            <FormControl
              name="requirement"
              label="Yêu cầu khóa học *"
              type={"editor"}
            ></FormControl>
          </div>
          <div className="col-12 m-t20">
            <div className="ml-auto">
              <h3 className="m-form__section text-primary">
                3. Thể loại và thời gian
              </h3>
            </div>
          </div>
          <div className="col-12">
            <table id="item-add" style={{ width: "100%" }}>
              <tbody>
                <tr className="list-item">
                  <td>
                    <div className="row">
                      <div className="col-md-12">
                        <label className="col-form-label">Thể loại</label>
                        <div>
                          <Select
                            style={{ width: "100%", background: "white" }}
                            native
                            defaultValue=""
                            id="grouped-native-select"
                            label="Grouping"
                            placeholder="Select"
                            onChange={categoryChange}
                            value={values["category"]}
                          >
                            {!!data?.length ? (
                              <>
                                {data?.map((data) => (
                                  <optgroup
                                    key={data?._id?._id}
                                    label={data?._id?.name}
                                  >
                                    {data?.categories?.map((category) => (
                                      <option
                                        key={category?._id}
                                        value={category?._id}
                                      >
                                        {category?.name}
                                      </option>
                                    ))}
                                  </optgroup>
                                ))}
                              </>
                            ) : (
                              <>
                                <optgroup label="Category 1">
                                  <option value={1}>Option 1</option>
                                  <option value={2}>Option 2</option>
                                </optgroup>
                                <optgroup label="Category 2">
                                  <option value={3}>Option 3</option>
                                  <option value={4}>Option 4</option>
                                </optgroup>
                              </>
                            )}
                          </Select>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <label className="col-form-label">
                          Thời gian bắt đầu và kết thúc khóa học *
                        </label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer
                            components={["DatePicker", "DatePicker"]}
                          >
                            <DatePicker
                              label="Thời gian bắt đầu"
                              value={dayjs(date.start)}
                              defaultValue={dayjs(date.start)}
                              sx={{
                                backgroundColor: "white",
                              }}
                              onChange={(newValue) =>
                                setDate({ ...date, start: newValue })
                              }
                            />
                            <DatePicker
                              label="Thời gian kết thúc"
                              value={dayjs(date.end)}
                              defaultValue={dayjs(date.end)}
                              onChange={(newValue) =>
                                setDate({ ...date, end: newValue })
                              }
                              sx={{
                                backgroundColor: "white",
                              }}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-12 mt-5">
            <Button variant="contained" color="primary" type="submit">
              Lưu thay đổi
            </Button>
            <Button
              className="ms-3"
              variant="outlined"
              color="primary"
              type="submit"
            >
              Reset
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default CourseTab1;
