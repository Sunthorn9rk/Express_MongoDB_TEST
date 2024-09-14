import React, {useEffect, useState} from "react";
import liff from "@line/liff";
import {loginLine} from "../../../functions/auth";

// ใช้เพื่อเปลี่ยนเส้นทางหน้าเว็บ
import {useNavigate} from "react-router-dom";

// ใช้redux ใช้ในการเก็บข้อมูลไปยัง store
import {useDispatch} from "react-redux";

import {login} from "../../../store/userSlice";

const Line = () => {
  const navi = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initLiff = async () => {
      try {
        await liff.init({liffId: "2006326354-Vkx2x4ad"});

        if (liff.isLoggedIn) {
          await handelLogin();
        }
      } catch (err) {
        console.log(err);
      }
    };

    initLiff();
  }, []);

  const handelLogin = async () => {
    try {
      // code
      const profile = await liff.getProfile();

      await loginLine(profile)
        .then((res) => {
          console.log(res);

          setLoading(false);

          dispatch(
            login({
              name: res.data.payload.user.name,
              role: res.data.payload.user.role,
              token: res.data.token,
            })
          );
          // frontend เก็บข้อมูลไว้ที่หน้าบ้านด้วย
          localStorage.setItem("token", res.data.token);
          roleRedirects(res.data.payload.user.role);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
      //   const idToken = liff.getIDToken();
      //   console.log(profile, idToken);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const roleRedirects = (role) => {
    if (role === "admin") {
      navi("/admin/index");
    } else {
      navi("/user/index");
    }
  };

  return loading ? <h1>Loading...</h1> : null;
};

export default Line;
