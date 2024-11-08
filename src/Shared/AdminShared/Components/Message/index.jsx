import "./styles.scss";
import moment from "moment";
import { memo } from "react";
import { Card } from "reactstrap";
import Toaster from "../../../Toaster";
import { db } from "../../../../firebase";
import { ref, set } from "firebase/database";
import { FaDeleteLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Images from "../../../../HelperMethods/Constants/ImgConstants";

const Member = ({ message, member, recipient = null }) => {
  const navigate = useNavigate();

  const handleDeleteMessage = () => {
    const messageRef = ref(
      db,
      `GroupMessages/${message.messageTo}/${message.messageId}`
    );
    set(messageRef, { ...message, isDeleted: true })
      .then(() => Toaster.error("Message deleted"))
      .catch((error) => console.error("Error updating isDeleted:", error));
  };

  return (
    <div className="d-flex gap-2 py-2">
      {member && (
        <div
          className="bgProperties rounded-circle me-2 cursorPointer"
          onClick={() => {
            if (member?.role === "Trainee") {
              navigate(`/admin/traineeProviderProfile/${member?.serverUserId}`);
            } else {
              navigate(`/admin/serviceProviderProfile/${member?.uuid}`);
            }
          }}
          style={{
            backgroundImage:
              member?.avatar === "null" || member?.avatar === undefined
                ? `url(${Images.USER_DUMMY_IMG})`
                : `url(${member?.avatar})`,
            width: "35px",
            height: "35px",
          }}
        ></div>
      )}
      <Card
        className={`d-flex flex-column border ${
          message.isDeleted ? "messageWrapperDanger" : "messageWrapper"
        } p-2 ${
          parseInt(message?.messageFrom) === recipient?.id
            ? "messageWrapper"
            : "bgYellow"
        }`}
      >
        {member && <small className="fw-bold ">{member?.name}</small>}
        {(message.messageType === "TEXT" ||
          message.messageType === "EXERCISE") && (
          <small className="px-2">{message.messageText}</small>
        )}
        {message.messageType === "IMAGE" && (
          <div className="">
            <div
              className="bgProperties"
              style={{
                backgroundImage:
                  message?.mediaUrl === null
                    ? `url(${Images.USER_DUMMY_IMG})`
                    : `url(${message?.mediaUrl})`,
                width: "80px",
                height: "100px",
              }}
            ></div>
          </div>
        )}
        {message.messageType === "VIDEO" && (
          <div className="">
            <video
              muted
              controls={true}
              width="200px"
              height="150px"
              src={message?.mediaUrl}
            ></video>
          </div>
        )}
        {message.messageType === "Document" && (
          <embed width="200px" height="200px" src={message?.mediaUrl} />
        )}
        {message.messageType === "Audio" && (
          <audio controls>
            <source src={message?.mediaUrl} />
          </audio>
        )}
        <div className="d-flex justify-content-end pe-2">
          {" "}
          <small>{moment(message.messageTime).format("h:mm A")}</small>
        </div>
      </Card>
      {member && !message?.isDeleted && (
        <FaDeleteLeft
          color="#c56263"
          className="cursorPointer"
          onClick={handleDeleteMessage}
        />
      )}
    </div>
  );
};

export default memo(Member);
