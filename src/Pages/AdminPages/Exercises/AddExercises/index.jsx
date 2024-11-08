import React from "react";
import { Col, Row, Container } from "reactstrap";
import PageHeading from "../../../../Shared/Headings/PageHeading";
import GoBack from "../../../../Shared/AdminShared/Components/GoBack";
import AddExerciseFrom from "../../../../Shared/AdminShared/Components/AddExerciseForm";

const AddExercises = () => {
  return (
    <Container>
      <Row>
        <GoBack />
        <Col md={12} className="text-start pt-0">
          <PageHeading headingText="Add Exercises" categoryText="" />
        </Col>
        <Col md={12}>
          <AddExerciseFrom />
        </Col>
      </Row>
    </Container>
  );
};

export default AddExercises;
