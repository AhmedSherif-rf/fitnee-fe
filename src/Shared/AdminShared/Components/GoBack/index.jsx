import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { FaAngleDoubleLeft } from "react-icons/fa";

const Index = () => {
  const navigate = useNavigate();

  return (
    <button
      className="d-flex align-items-center border-0 p-2 mt-1 textYellow py-2 bg-transparent"
      onClick={() => navigate(-1)}
    >
      <FaAngleDoubleLeft size={25} />
      <div>
        <small className="fw-bold ms-1">Back</small>
      </div>
    </button>
  );
};

export default memo(Index);
