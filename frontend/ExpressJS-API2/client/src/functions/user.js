import axios from "axios";

export const list = async (authtoken) =>
  await axios.get(process.env.REACT_APP_API + "/user", {
    headers: {
      authtoken,
    },
  });

export const changRole = async (authtoken, data) =>
  await axios.post(
    process.env.REACT_APP_API + "/chang-role",
    {data},
    {
      headers: {
        authtoken,
      },
    }
  );
