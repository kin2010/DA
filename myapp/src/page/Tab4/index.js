import React from "react";
import { Button, Form, Row } from "react-bootstrap";

const Tab4 = () => {
  return (
    <>
      <h3 className="mb-3">Create new schedule :</h3>
      <Row className="w-50">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Schedule title:</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              Enter the schedule title
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Row>
    </>
  );
};

export default Tab4;
