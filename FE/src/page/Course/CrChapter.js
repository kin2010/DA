/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import {
  addChapter,
  getChapterById,
  updateChapter,
  useCourseService,
} from "../../hook/LessionHook";
import { AppContextProvider } from "../../Context/AppContext";
import { useParams } from "react-router-dom";
import EditorCommon from "../../component/EdittorCommon/EdittorCommon";
const CrChapter = ({ refetch, updateChapterId }) => {
  const [form, setForm] = useState({ name: "", mota: "" });
  const [validated, setValidated] = useState(false);
  const { openNotification } = React.useContext(AppContextProvider);
  const { id } = useParams();

  const fetchChapter = async () => {
    const params = { id: updateChapterId };
    const res = await getChapterById(params);
    setForm({ ...(res?.data || {}) });
  };

  const change = (e) => {
    setForm({
      ...form,
      name: e?.target?.value,
    });
  };
  const handleChangeEditor = (name, result) => {
    const cpForm = form;
    cpForm[name] = result;
    setForm({
      ...cpForm,
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
          //create
          const params = {
            idCourse: id,
            ...form,
          };
          const res = await addChapter({ ...params });
          openNotification(res);
        } else {
          //update
          const params = {
            idChapter: updateChapterId,
            ...form,
          };
          const res = await updateChapter({ ...params });
          openNotification(res);
        }
        if (!!refetch) {
          refetch();
        }
      } catch (error) {}
    }
    setValidated(true);
  };

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

  return (
    <>
      <Form onSubmit={(e) => save(e)} noValidate validated={validated}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Chương mục :</Form.Label>
          <Form.Control
            required
            type="input"
            name="name"
            placeholder="Tên chương"
            onChange={change}
            className="mb-2"
            value={form.name}
            defaultValue={""}
          />
          <Form.Text className="text-muted">Nhập tên chương mục :</Form.Text>
          <EditorCommon
            name="mota"
            handleChange={handleChangeEditor}
            value={form.mota}
          ></EditorCommon>
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
