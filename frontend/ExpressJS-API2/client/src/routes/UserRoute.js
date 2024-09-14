import React from "react";
import {useSelector} from "react-redux";
import ResponsiveAppBar from "../layout/ResponsiveAppBar";
import Notfound404 from "../components/pages/Notfound404";

const UserRoute = ({children}) => {
  // ดึง state ที่เก็บไว้ใน store redux มา
  const {user} = useSelector((state) => ({...state}));
  console.log("UserRoute", user);

  // check login
  return user && user.user.token ? (
    <>
      <ResponsiveAppBar />
      {children}
    </>
  ) : (
    <Notfound404 text="No Login" />
  );
};

export default UserRoute;
