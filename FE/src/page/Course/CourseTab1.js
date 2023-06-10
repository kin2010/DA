/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import { Col, Row } from "antd";
import AddIcon from "@mui/icons-material/Add";
import { useCourseService } from "../../hook/LessionHook";
import { useQueryClient } from "@tanstack/react-query";
import Tab2 from "../Tab2";
import TeacherModal from "../../component/TeacherModal";
import { serviceFetch } from "../../ultis/service";
import { apiURL } from "../../Context/constant";
import VirtualList from "rc-virtual-list";
import { Avatar, List } from "antd";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
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
const CourseTab1 = ({ course, setCourse, changeTab, dataTeacher }) => {
  const { openNotification } = React.useContext(AppContextProvider);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const { handleSubmit, setFieldValue, setValues, values } = useFormikContext();
  const queryClient = useQueryClient();
  const { data } = queryClient.getQueryData(["categories"]) || { data: null };
  const courseId = sessionStorage.getItem("new_course");

  const courseService = useCourseService();
  const courseData = courseService.get();

  useEffect(() => {
    if (!!courseData) {
      setValues({
        name: courseData?.data?.name,
        teachers: courseData?.data?.teachers?.map((teacher) => teacher?._id),
        description: courseData?.data?.description,
        target: courseData?.data?.target,
        requirement: courseData?.data?.requirement,
        category: courseData?.data?.category,
      });
    }
  }, [courseData]);

  const categoryChange = (e) => {
    console.log(e.target?.value);
    setFieldValue("category", e.target?.value || "");
  };

  return (
    <div className="widget-inner">
      <form className={"course-cr m-b30"} onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12">
            <div className="ml-auto">
              <h3>1. Basic info</h3>
            </div>
          </div>
          <div className="form-group col-6">
            <div>
              <FormControl label="Course title" name="name"></FormControl>
            </div>
          </div>

          <div className="form-group col-6">
            <label className="col-form-label">Teachers :</label>
            <div>
              <Dropdown data={dataTeacher}></Dropdown>
            </div>
          </div>
          <div className="seperator" />
          <div className="col-12 m-t20">
            <div className="ml-auto m-b5">
              <h3>2. Description</h3>
            </div>
          </div>
          <div className="form-group col-12">
            <label className="col-form-label">Course description</label>
            <div>
              <EditorCommon name="description"></EditorCommon>
            </div>
          </div>
          <div className="form-group col-6">
            <FormControl
              label="What will students learn in your course?*"
              name="target"
            >
              <textarea className="form-control" />
            </FormControl>
          </div>
          <div className="form-group col-6">
            <FormControl label="Requirements*" name="requirement">
              <textarea className="form-control" />
            </FormControl>
          </div>
          <div className="col-12 m-t20">
            <div className="ml-auto">
              <h3 className="m-form__section">3. Add Item</h3>
            </div>
          </div>
          <div className="col-12">
            <table id="item-add" style={{ width: "100%" }}>
              <tbody>
                <tr className="list-item">
                  <td>
                    <div className="row">
                      <div className="col-md-12">
                        <label className="col-form-label">
                          Course Category
                        </label>
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
                      {/* <div className="col-md-2">
                            <label className="col-form-label">Close</label>
                            <div className="form-group">
                              <a className="delete" href="#">
                                <i className="fa fa-close" />
                              </a>
                            </div>
                          </div> */}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-12 mt-5">
            <Button variant="contained" color="primary" type="submit">
              Save changes
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
