/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { List, Typography } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import CreateLession from "../Course/CreateLession";
import AddIcon from "@mui/icons-material/Add";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CrChapter from "../Course/CrChapter";
import { useNavigate, useParams } from "react-router-dom";
import { getAllChapters } from "../../hook/LessionHook";
const Tab2 = ({ course }) => {
  const [data, setData] = useState([]);
  const [chapter, setChapter] = useState([]);
  const [updateLessionId, setUpdateLessionId] = useState();
  const [updateChapterId, setUpdateChapterId] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/course/create");
    }
    getChapters();
  }, []);

  const getChapters = async () => {
    const params = {
      idCourse: id,
    };
    const res = await getAllChapters({ ...params });
    setChapter(res?.chapters || []);
    console.log("_________", id, res);
  };

  const setChangeCurrent = (key, less) => {
    //update name
    // sett(key, less);

    if (data) {
      const cpData = data;
      const k = cpData[key]?.key;
      const d = {
        key: k || "lession",
        value: less?.name,
      };
      cpData[key] = d;
      setData([...cpData]);
    }
  };

  const addNewChapter = () => {
    console.log("add");
    setUpdateChapterId("");
  };
  const updateLession = (id) => {
    setUpdateLessionId(id);
  };
  const updateChap = (id) => {
    console.log("setUpdateChap", id);
    setUpdateChapterId(id);
  };

  useEffect(() => {
    console.log("change", updateChapterId);
  }, [updateChapterId]);

  const handleClickChapter = () => {};

  return (
    <div>
      <h4 className="mb-5">Chương mục của khóa học: </h4>
      <Row className="w-100 ">
        <Col className="w-25" style={{ flex: "none" }}>
          {!!chapter?.length &&
            chapter.map((ch) => (
              <Fragment key={ch?._id}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography onClick={() => updateChap(ch?._id)}>
                      {ch?.name}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography
                      onClick={handleClickChapter}
                      dangerouslySetInnerHTML={{ __html: ch?.mota }}
                    ></Typography>
                    {/* {!!ch?.lessions?.length && (
                      <List
                        bordered
                        dataSource={
                          !!ch?.lessions?.length ? ch?.lessions : ["..."]
                        }
                        renderItem={(item, key) => (
                          <List.Item onClick={() => updateLession(item?._id)}>
                            <Typography.Text mark>[{key + 1}] </Typography.Text>{" "}
                            {item?.name}
                          </List.Item>
                        )}
                      />
                    )} */}
                  </AccordionDetails>
                </Accordion>
              </Fragment>
            ))}
          <Button onClick={addNewChapter}>
            <AddIcon className="me-2" />
            ADD NEW CHAPTER
          </Button>
        </Col>
        <Col className="w-75" style={{ flex: "none" }}>
          <CrChapter
            course={course}
            refetch={getChapters}
            updateChapterId={updateChapterId}
          ></CrChapter>
        </Col>
      </Row>
    </div>
  );
};

export default Tab2;
