import React from "react";

const AllNotifications = () => {
  const dispatch = useDispatch();
  const { user, loading, notifications } = useSelector((state) => state.user);
  
  return <div>AllNotifications</div>;
};

export default AllNotifications;
