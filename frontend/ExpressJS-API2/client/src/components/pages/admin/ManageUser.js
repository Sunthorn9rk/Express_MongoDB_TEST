import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";

// function
import {list, changRole} from "../../../functions/user";

// material UI
import {Button, MenuItem, Select, TextField} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ManageUser = () => {
  const [data, setData] = useState([]);
  const {user} = useSelector((state) => ({...state}));
  //   console.log(user);

  useEffect(() => {
    loadData(user.user.token);
  }, []);

  const loadData = async (authtoken) => {
    await list(authtoken)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const role = ["admin", "user"];

  const handleChangeRole = async (id, e) => {
    console.log(id, e.target.value);

    const value = {
      id: id,
      role: e.target.value,
    };

    await changRole(user.user.token, value)
      .then((res) => {
        loadData(user.user.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell scope="col">#</TableCell>
              <TableCell scope="col">name</TableCell>
              <TableCell scope="col">role</TableCell>
              <TableCell scope="col">ip</TableCell>
              <TableCell scope="col">updatedAt</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* ลูปเอาitem แต่ละอันมาโชว์ */}
            {data
              ? data.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{"&:last-child td, &:last-child th": {border: 0}}}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <Select
                        onChange={(e) => handleChangeRole(item._id, e)}
                        defaultValue={item.role}
                        style={{width: "100px"}}
                      >
                        {role.map((item, index) => (
                          <MenuItem value={item} key={index}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell>{item.ip}</TableCell>
                    <TableCell>{item.updatedAt}</TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ManageUser;
