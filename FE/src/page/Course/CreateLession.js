/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { DatePicker, Space } from "antd";
import React from "react";
import { Row, Col } from "react-bootstrap";
import Uploadd from "../../component/Upload";
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { addMinutes } from "date-fns";
import { dateFormat } from "../../ultis/func";
import {
  getLectureById,
  updateLecture,
  useCourseService,
  useLectureService,
} from "../../hook/LessionHook";
import { AppContextProvider } from "../../Context/AppContext";
import Lecture from "../../component/Lession";
import ModalCommon from "../../component/Modal";
function CreateLecture({
  course,
  idChapter,
  refetch,
  updateLectureId,
  setIsShowLecture,
  isShowLecture,
}) {
  const [validated, setValidated] = useState(false);
  const lessionService = useLectureService();
  const { openNotification } = useContext(AppContextProvider);
  const [lession, setLecture] = useState({});
  const [form, setForm] = useState({
    name: "",
    desc: "",
    start: "",
    end: "",
    time: 10,
    baitap: [],
    file: [],
  });
  const [show, setShow] = useState(true);
  const hanldeChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const ref = useRef();
  const reset = () => {
    setForm({
      name: "",
      desc: "",
      start: "",
      end: "",
      time: 10,
      baitap: [],
      file: [],
    });
  };

  useEffect(() => {
    if (!!updateLectureId) {
      reset();
      fetchLecture();
    } else {
      reset();
    }
  }, [updateLectureId]);

  const fetchLecture = async () => {
    const params = { id: updateLectureId };
    const res = await getLectureById(params);
    setForm({ ...res?.lession });
  };

  const onChange = (value, dateString) => {
    // console.log("Formatted Selected Time: ", dateString);

    setForm({
      ...form,
      start: dateFormat((new Date(dateString), form.time)),
      end: dateFormat(addMinutes(new Date(dateString), form.time)),
    });
  };
  const changeFile = (file) => {
    setForm({
      ...form,
      file: file.fileList,
    });
  };

  const onOk = (value, dateString) => {
    // console.log(value.format("MMMM Do YYYY"));
    // setForm({
    //   ...form,
    //   start: dateFormat((new Date(value), form.time)),
    //   end: dateFormat(addMinutes(new Date(value), form.time)),
    // });
  };
  const save = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const ff = e.currentTarget;
    if (ff?.checkValidity() === false) {
    } else {
      try {
        if (!updateLectureId) {
          const params = { ...form, chapter: idChapter };
          const res = await lessionService.addLecture(params);
          console.log(res);
          if (!!refetch) {
            refetch();
          }
          if (!res?.message) {
            openNotification(res);
            setIsShowLecture(false);
          }
        } else {
          const params = { ...form, id: updateLectureId };
          const res = await updateLecture(params);
          if (!res?.message) {
            if (!!refetch) {
              refetch();
            }
            openNotification(res);
            setIsShowLecture(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    setValidated(true);
  };
  const dete = () => {};
  return (
    <>
      <ModalCommon
        open={isShowLecture}
        setOpen={setIsShowLecture}
        title="Tạo bài giảng"
        footer={<></>}
      >
        {show ? (
          <>
            <Form
              onSubmit={(e) => save(e)}
              noValidate
              validated={validated}
              style={{
                backgroundColor: "#f1f1f1",
                padding: "20px 20px",
                margin: "0px 0 0 0",
              }}
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Tên bài giảng: </Form.Label>
                <Form.Control
                  onChange={hanldeChange}
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  placeholder="Enter email"
                />
                <Form.Text className="text-muted">Nhập tên bài giảng</Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Mô tả</Form.Label>
                <Form.Control
                  onChange={hanldeChange}
                  name="desc"
                  type="text"
                  placeholder="Mô tả"
                  value={form.desc}
                />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Bắt đầu :</Form.Label>
                    <br />
                    <DatePicker
                      className="date_picker"
                      format="YYYY-MM-DD HH:mm"
                      showTime
                      onChange={onChange}
                      onOk={onOk}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Thời gian</Form.Label>
                    <Form.Control
                      onChange={hanldeChange}
                      name="time"
                      type="number"
                      placeholder="Thời gian:"
                      min={10}
                      value={form.time}
                    />
                    <Form.Text className="text-muted">
                      Thời gian ( phút )
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Label>Bài tập đính kèm :</Form.Label>
              <Uploadd change={changeFile}></Uploadd>
              <div className="modal_footer">
                <Button className=" me-5" variant="primary" type="submit">
                  <DataSaverOnIcon color="white" className="me-3" />
                  Lưu
                </Button>
                <Button onClick={() => dete()} variant="danger" type="button">
                  <DeleteSweepIcon color="white" className="me-3" />
                  Xóa
                </Button>
              </div>
            </Form>
          </>
        ) : (
          <Lecture
            view={lession?.view}
            time={lession?.time}
            name={lession?.name}
            member={lession?.member}
          ></Lecture>
        )}
      </ModalCommon>
    </>
  );
}

export default CreateLecture;
