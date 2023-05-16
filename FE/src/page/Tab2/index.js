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
import { useParams } from "react-router-dom";
import { getAllChapters } from "../../hook/LessionHook";
const Tab2 = ({ course }) => {
  const [data, setData] = useState([]);
  const [chapter, setChapter] = useState([]);
  const [current, setCurrent] = useState(0);
  const [showChapter, setShowChapter] = useState(false);
  const [currentId, setCurrentId] = useState();
  const [updateLessionId, setUpdateLessionId] = useState();
  const [updateChapterId, setUpdateChapterId] = useState();
  const { id } = useParams();

  useEffect(() => {
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
  /**
   *data:
          type:chapter||lession
          value: name 
   */
  useEffect(() => {
    console.log("data", data);
  }, [data]);

  const addNew = (id) => {
    setShowChapter(false);
    setCurrentId(id);
    setUpdateLessionId(null);
  };
  const changeKey = (item, key) => {
    setShowChapter(item?.key === "chapter");
    setCurrent(key);
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
    setShowChapter(true);
    console.log("add");
    setUpdateChapterId("");
  };
  const updateLession = (id) => {
    setShowChapter(false);
    setUpdateLessionId(id);
  };
  const updateChap = (id) => {
    setShowChapter(true);
    setUpdateChapterId(id);
  };
  return (
    <div>
      <Row className="w-100 ">
        <Col className="w-25" style={{ flex: "none" }}>
          {/* <List
            header={<div>Lession</div>}
            // footer={<div>Footer</div>}
            bordered
            dataSource={!!data.length ? data : ["..."]}
            renderItem={(item, key) => (
              <List.Item onClick={() => changeKey(item, key)}>
                <Typography.Text mark>[{key + 1}] </Typography.Text>{" "}
                {item.value}
              </List.Item>
            )}
          /> */}
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
                      dangerouslySetInnerHTML={{ __html: ch?.mota }}
                    ></Typography>
                    {!!ch?.lessions?.length && (
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
                    )}
                    {/* <Button onClick={() => addNew(ch?._id)}>
                      <AddIcon className="me-2" />
                      ADD NEW LESSION
                    </Button> */}
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
            idChapter={currentId}
            updateChapterId={updateChapterId}
          ></CrChapter>
          {/* {showChapter ? (
            <CrChapter
              course={course}
              refetch={getChapters}
              idChapter={currentId}
              updateChapterId={updateChapterId}
            ></CrChapter>
          ) : (
            <CreateLession
              course={course}
              refetch={getChapters}
              idChapter={currentId}
              updateLessionId={updateLessionId}
            ></CreateLession>
          )} */}
        </Col>
      </Row>
    </div>
  );
};

export default Tab2;
