/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Editor from ".";
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { Button } from "@mui/material";
import {
  addChapter,
  getChapterById,
  updateChapter,
  useCourseService,
} from "../../hook/LessionHook";
import { AppContextProvider } from "../../Context/AppContext";
import { useParams } from "react-router-dom";
const CrChapter = ({
  refetch,
  updateChapterId,
  course,
  setChangeCurrent,
  current,
}) => {
  const [form, setForm] = useState({ name: "", mota: "" });
  const [validated, setValidated] = useState(false);
  const { openNotification } = React.useContext(AppContextProvider);
  const { id } = useParams();

  useEffect(() => {
    if (!!updateChapterId) {
      setForm({
        name: "",
        mota: "",
      });
      fetchChapter();
    } else {
      setForm({
        name: "",
        mota: "",
      });
    }
  }, [updateChapterId]);

  const fetchChapter = async () => {
    const params = { id: updateChapterId, ...form };
    const res = await getChapterById(params);
    setForm({ ...res });
  };

  const change = (e) => {
    setForm({
      ...form,
      name: e?.target?.value,
    });
  };
  const handleChangeEditor = (name, result) => {
    const ne = form;
    ne[name] = result;
    setForm({
      ...ne,
    });
  };
  const lessionService = useCourseService();
  const save = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const ff = e.currentTarget;

    if (ff.checkValidity() === false) {
    } else {
      try {
        if (!updateChapterId) {
          const params = {
            idCourse: id,
            ...form,
          };
          const res = await addChapter({ ...params });
          openNotification(res);
          if (!!refetch) {
            refetch();
          }
        } else {
          const params = {
            idChapter: updateChapterId,
            ...form,
          };
          const res = await updateChapter({ ...params });
          openNotification(res);
          if (!!refetch) {
            refetch();
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    setValidated(true);
  };
  return (
    <>
      <Form
        onSubmit={(e) => save(e)}
        noValidate
        validated={validated}
        // style={{
        //   backgroundColor: "#f1f1f1",
        //   padding: "20px 20px",
        //   margin: "20px 0 0 0",
        // }}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="input"
            name="name"
            placeholder="Tên chương"
            onChange={change}
            className="mb-2"
          />
          <Form.Text className="text-muted"></Form.Text>
          <Editor name="mota" handleChange={handleChangeEditor}></Editor>
          <Button
            // onClick={save}
            className="mt-4  me-5"
            variant="primary"
            type="submit"
          >
            <DataSaverOnIcon color="white" className="me-3" />
            Lưu
          </Button>
          <Button
            // onClick={() => dete(le)}
            className="mt-4 "
            variant="danger"
            type="button"
          >
            <DeleteSweepIcon color="white" className="me-3" />
            Xóa
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default CrChapter;
