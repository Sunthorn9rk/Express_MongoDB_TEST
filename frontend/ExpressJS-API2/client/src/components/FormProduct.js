// rafce
import React, {useState, useEffect} from "react";
// import axios from "axios";
import {Link} from "react-router-dom";

import {remove, create, getdata} from "../functions/product";

// material UI
import {Button, TextField} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const FormProduct = () => {
  // javascript
  //   const tam = "tam roitai";
  const [data, setData] = useState([]);
  const [form, setForm] = useState({});

  useEffect(() => {
    // code
    loadData();
  }, []);

  const loadData = async () => {
    getdata()
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    if (e.target.name === "file") {
      setForm({
        // ...form คือเอาค่าเดิมของ form มาก่อนแล้วค่อยเอาค่าใหม่เขียนทับ
        ...form,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setForm({
        // ...form คือเอาค่าเดิมของ form มาก่อนแล้วค่อยเอาค่าใหม่เขียนทับ
        ...form,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //ตั้งให้ตอนกด submit แล้วไม่ refresh เว็บ
    const formWithImageData = new FormData();

    // ลูปทุกๆตัวใน form
    for (const key in form) {
      formWithImageData.append(key, form[key]);
    }

    //console.log(formWithImageData);

    create(formWithImageData)
      .then((res) => {
        console.log(res.data);
        loadData();
      })
      .catch((err) => console.log(err));
  };

  const handleRemove = async (id) => {
    remove(id)
      .then((res) => {
        console.log(res);
        loadData();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {/* HTML */}
      FormProduct
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <TextField
            id="outlined-basic"
            label="name"
            variant="outlined"
            name="name"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="detail"
            variant="outlined"
            name="detail"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="price"
            variant="outlined"
            name="price"
            type="number"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="file"
            variant="outlined"
            name="file"
            type="file"
            onChange={(e) => handleChange(e)}
            focused
          />
        </div>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell scope="col">#</TableCell>
              <TableCell scope="col">name</TableCell>
              <TableCell scope="col">detail</TableCell>
              <TableCell scope="col">price</TableCell>
              <TableCell scope="col">Image</TableCell>
              <TableCell scope="col">action</TableCell>
              <TableCell scope="col">edit</TableCell>
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
                    <TableCell>{item.detail}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{item.file}</TableCell>
                    <TableCell>
                      <DeleteIcon
                        color="error"
                        cursor="pointer"
                        onClick={() => handleRemove(item._id)}
                      >
                        delete
                      </DeleteIcon>
                    </TableCell>
                    <TableCell>
                      <Link to={"/edit/" + item._id}>
                        <EditIcon />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FormProduct;
