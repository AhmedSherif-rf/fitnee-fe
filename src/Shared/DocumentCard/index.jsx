import styles from "./style.module.scss";
import React, { memo, useState } from "react";
import { Col, Card, CardBody, CardFooter } from "reactstrap";

const DocumentCard = (props) => {
  const { documentImg, documentTitle, className, index } = props;
  const [showFullImage, setShowFullImage] = useState(false);

  const handleToggleClick = () => {
    setShowFullImage(!showFullImage);
  };

  return (
    <Col lg={3} md={6} sm={6} key={index}>
      <Card
        className={`bgProperties ${className} ${styles.ProfileDocumentCard}`}
        style={{
          backgroundImage: `url(${documentImg})`,
        }}
        onClick={handleToggleClick}
      >
        <CardBody className="p-0"></CardBody>

        <CardFooter
          className={`text-center border-0 bgBlur ${styles.documentCardFooter}`}
        >
          {documentTitle}
        </CardFooter>

        {showFullImage && (
          <div
            className={` ${styles.fullImageOverlay}`}
            onClick={handleToggleClick}
          >
            <img src={documentImg} alt={documentTitle} />
          </div>
        )}
      </Card>
    </Col>
  );
};

export default memo(DocumentCard);
