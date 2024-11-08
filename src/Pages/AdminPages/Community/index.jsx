import "./styles.scss";
import { db } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import PageHeading from "../../../Shared/Headings/PageHeading";
import { onValue, ref, orderByChild } from "firebase/database";
import {
  Container,
  Row,
  Col,
  Card,
  CardFooter,
  CardHeader,
  CardBody,
} from "reactstrap";
import Images from "../../../HelperMethods/Constants/ImgConstants";
import Message from "../../../Shared/AdminShared/Components/Message";

const Community = (props) => {
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(false);
  const [groupMembers, setGroupMembers] = useState([]);
  const [groupMessages, setGroupMessages] = useState([]);

  const messageEl = useRef(null);

  useEffect(() => {
    const query = ref(db, "GroupMessages", orderByChild("messageTime"));
    const unsubscribe = onValue(query, (snapshot) => {
      const data = snapshot.val();

      if (snapshot.exists()) {
        Object.values(data).map((item, index) =>
          setGroupMessages([...groupMessages, item])
        );
      }
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (messageEl.current) {
      messageEl.current.scrollIntoView();
    }
  }, [groupMessages]);

  useEffect(() => {
    const query = ref(db, "Groups");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();

      if (snapshot.exists()) {
        const groupKeys = Object.keys(data);
        const groupId = groupKeys[0];
        setGroupMembers(data[groupId].usersIds);
      }
    });
  }, []);

  useEffect(() => {
    const query = ref(db, "Users");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();

      if (snapshot.exists()) {
        const usersArray = Object.values(data);
        const members = usersArray.map((user) => user);
        setMembers(members);
      }
    });
  }, []);

  const getMemberData = (memberId) => {
    const member = members.find((member) => {
      return member.userId === memberId;
    });

    return member;
  };

  return (
    <React.Fragment>
      <Container className="adminDashBoardScrolling" fluid>
        <Row>
          <Col md={12} className="text-center">
            <PageHeading
              headingText="Community"
              categoryText=""
              className="text-start"
            />
          </Col>
          <Col md={3} className=" mb-3">
            <h5 className="mb-0 fw-bold text-start d-md-block d-none text-black-custom">
              Members
            </h5>
            <h6 className="mb-0 fw-bold text-start d-md-none d-block text-black-custom">
              Members
            </h6>
            <Card className={`onlyBorderRadius p-0`}>
              <CardHeader className="bg-transparent border-0"></CardHeader>
              <CardBody className="chatCardFooterHeight py-0">
                {groupMembers.map((groupMember, index) => {
                  const member = getMemberData(groupMember);
                  return (
                    <Col
                      md={12}
                      key={index}
                      onMouseOver={() => setHoveredIndex(index)}
                      onMouseOut={() => setHoveredIndex(false)}
                      className={`d-flex mb-1 cursorPointer align-items-center py-1 bgCommunity rounded-4 ps-1`}
                      onClick={() => {
                        if (member?.role === "Trainee") {
                          navigate(
                            `/admin/traineeProviderProfile/${member?.serverUserId}`
                          );
                        } else {
                          navigate(
                            `/admin/serviceProviderProfile/${member?.uuid}`
                          );
                        }
                      }}
                    >
                      <div
                        className={`bgProperties rounded-circle ${
                          hoveredIndex === index ? "cardHovered" : ""
                        }`}
                        style={{
                          border: "3px solid White",
                          backgroundImage:
                            member?.avatar === "null" ||
                            member?.avatar === undefined
                              ? `url(${Images.USER_DUMMY_IMG})`
                              : `url(${member?.avatar})`,
                          width: "45px",
                          height: "45px",
                        }}
                      ></div>
                      <div className="text-start">
                        <p className="ms-3 mb-0 small fw-bold">
                          {member?.name}
                        </p>
                        <p className="ms-3 mb-0 small fw-bold">
                          {member?.role}
                        </p>
                      </div>
                    </Col>
                  );
                })}
              </CardBody>
              <CardFooter className="border-0 bg-transparent"></CardFooter>
            </Card>
          </Col>
          <Col md={8} className="position-relative me-3">
            <h5 className="mb-0 fw-bold text-start  d-md-block d-none text-black-custom">
              Chat
            </h5>
            <h6 className="mb-0 fw-bold text-start d-md-none d-block text-black-custom">
              Chat
            </h6>
            <Card className="px-2 onlyBorderRadius">
              <CardHeader className="border-0 bg-transparent"></CardHeader>
              <CardBody className="py-0 chatCardFooterHeight">
                {groupMessages.map((messages, index) => {
                  return Object.values(messages).map((message, index) => {
                    const member = getMemberData(message.messageFrom);
                    return (
                      <Col md={12} className="text-start" key={index}>
                        <Message member={member} message={message} />
                        <div className="" ref={messageEl}></div>
                      </Col>
                    );
                  });
                })}
              </CardBody>

              <CardFooter className="border-0 bg-transparent"></CardFooter>
            </Card>
            {/* <CardFooter className="chatCardFooter border-0 bg-transparent">
              <div className="position-absolute chatButton ">
                <LuSend className="fs-3 textParrotGreen" />
              </div>
              <InputField
                type="text"
                name="AdminInputChat"
                placeholder="Start Typing"
              />
            </CardFooter> */}
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};
export default Community;
