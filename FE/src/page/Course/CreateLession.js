/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
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
  getLessionById,
  updateLession,
  useCourseService,
  useLessionService,
} from "../../hook/LessionHook";
import { AppContextProvider } from "../../Context/AppContext";
import Lession from "../../component/Lession";
function CreateLession({ course, idChapter, refetch, updateLessionId }) {
  const [validated, setValidated] = useState(false);
  const lessionService = useLessionService();
  const courseService = useCourseService();
  const { openNotification } = useContext(AppContextProvider);
  const [lession, setLession] = useState({});
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
    if (!!updateLessionId) {
      reset();
      fetchLession();
    } else {
      reset();
    }
  }, [updateLessionId]);

  const fetchLession = async () => {
    const params = { id: updateLessionId };
    const res = await getLessionById(params);
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
  useEffect(() => {
    // console.log(22, form);
  }, [form]);
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

    if (ff.checkValidity() === false) {
    } else {
      try {
        if (!updateLessionId) {
          const params = { ...form, chapter: idChapter };
          const res = await lessionService.addLession(params);
          console.log(res);
          if (!!refetch) {
            refetch();
          }
          if (res?.status === 200) {
            openNotification(res);
          }
        } else {
          const params = { ...form, id: updateLessionId };
          const res = await updateLession(params);
          if (res?.status === 200) {
            if (!!refetch) {
              refetch();
            }
            openNotification(res);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    setValidated(true);
  };
  const dete = () => {
    //
    // const index = lession.findIndex((a) => a === le);
    // let neww;
    // if (index) {
    //   lession = lession.splice(index, 1);
    //   neww = [...lession];
    // }
    // setLe(neww);
  };
  return (
    <>
      {show ? (
        <Form
          onSubmit={(e) => save(e)}
          noValidate
          validated={validated}
          style={{
            backgroundColor: "#f1f1f1",
            padding: "20px 20px",
            margin: "20px 0 0 0",
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
                  // value={dateFormat(
                  //   form.start !== "" ? new Date(form.start) : new Date()
                  // )}
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
                  // defaultValue={10}
                  min={10}
                  value={form.time}
                />
                <Form.Text className="text-muted">Thời gian ( phút )</Form.Text>
              </Form.Group>
            </Col>
          </Row>
          <Form.Label>Bài tập đính kèm :</Form.Label>
          <Uploadd change={changeFile}></Uploadd>

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
            onClick={() => dete()}
            className="mt-4 "
            variant="danger"
            type="button"
          >
            <DeleteSweepIcon color="white" className="me-3" />
            Xóa
          </Button>
        </Form>
      ) : (
        <Lession
          view={lession?.view}
          time={lession?.time}
          name={lession?.name}
          member={lession?.member}
        ></Lession>
      )}
    </>
  );
}

export default CreateLession;