import React from "react";
import {useSelector} from "react-redux";

const TestRedux1 = () => {
  // ดึงข้อมูลใน store
  const {user} = useSelector((state) => ({...state}));

  console.log("user", user);

  return (
    <div>
      TestRedux1
      <br />
      {user.value}
      <br />
      {user.user}
    </div>
  );
};

export default TestRedux1;
