import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  InputLabel,
  Link,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { getAllChapters } from "../../hook/LessionHook";
import { useParams } from "react-router-dom";
import CreateLession from "../Course/CreateLession";
import Lession from "../../component/Lession";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { getChapterById } from "../../hook/LessionHook";
import ModalCommon from "../../component/Modal";
const Tab3 = () => {
  const [chapters, setChapters] = React.useState([]);
  const [vl, setVl] = useState(false);
  const [validated, setValidated] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState();
  const [isShowLession, setIsShowLession] = useState(false);
  const [updateLessionId, setUpdateLessionId] = useState("");

  const { id } = useParams();
  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    setVl(value);
    if (!!chapters?.length) {
      setSelectedChapter(
        chapters?.filter((chapter) => chapter._id === value)[0]
      );
    }
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const save = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const ff = e.currentTarget;

    if (ff.checkValidity() === false) {
    } else {
    }
    setValidated(true);
  };
  useEffect(() => {
    handleInitialization();
  }, []);
  const handleInitialization = async () => {
    const params = {
      idCourse: id,
    };
    const res = await getAllChapters(params);
    setChapters(res?.chapters);
  };

  const addLession = () => {
    setUpdateLessionId("");
    setIsShowLession(true);
  };

  const getChapter = async (id) => {
    const params = {
      id: selectedChapter?._id,
    };
    const res = await getChapterById(params);
    if (res?.data?.lessions) {
      setSelectedChapter(res?.data);
    }
  };

  useEffect(() => {
    console.log("isshoq", isShowLession);
  }, [isShowLession]);

  useEffect(() => {
    console.log("sad");
  }, []);

  return (
    <div>
      <h4 className="mb-5">Bài giảng của khóa học: </h4>
      <Row className="w-100 ">
        <Row>
          <Form.Label className="labell">Chương mục:</Form.Label>
          <FormControl sx={{ m: 1, width: 300 }} required>
            <InputLabel id="demo-multiple-name-label">Chương mục :</InputLabel>
            {!!chapters?.length && (
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={vl}
                onChange={handleChange}
                input={<OutlinedInput label="Chương mục :" />}
                MenuProps={MenuProps}
                defaultValue={!!chapters?.length ? chapters[0] : ""}
                error={validated}
                helperText="Không được để trống !"
              >
                {chapters?.map((chapter) => (
                  <MenuItem
                    key={chapter?._id}
                    value={chapter?._id}
                    // style={getStyles(name, vl, theme)}
                  >
                    {chapter?.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          </FormControl>
        </Row>
        <Divider />
        <Row>
          <Col md={8}>
            {selectedChapter && (
              <>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography variant="h5">
                      {selectedChapter?.name || ""}
                    </Typography>
                    <Divider></Divider>
                  </AccordionSummary>
                  <AccordionDetails>
                    {selectedChapter?.lessions?.map((lession) => (
                      <Lession
                        lession={lession}
                        key={lession?._id}
                        className="lession"
                        isEdit
                        setUpdateLessionId={setUpdateLessionId}
                        setIsShowLession={setIsShowLession}
                      ></Lession>
                    ))}
                    <div
                      className="d-flex align-center mt-3"
                      onClick={addLession}
                    >
                      <PostAddIcon
                        style={{ fontSize: "20px", marginRight: "4px" }}
                        color="primary"
                      />
                      <Link>Thêm bài giảng</Link>
                    </div>
                  </AccordionDetails>
                </Accordion>
                <CreateLession
                  isShowLession={isShowLession}
                  refetch={getChapter}
                  idChapter={selectedChapter}
                  setIsShowLession={setIsShowLession}
                  updateLessionId={updateLessionId}
                ></CreateLession>
              </>
            )}
          </Col>
          <Col md={4}></Col>
        </Row>
      </Row>
    </div>
  );
};

export default Tab3;
