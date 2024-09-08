import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";

import {read, update} from "../functions/product";

const FormEditProduct = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    detail: "",
    price: "",
  });
  const [fileold, setFileOld] = useState();

  useEffect(() => {
    loadData(params.id);
  }, []);

  const loadData = async (id) => {
    read(id).then((res) => {
      setData(res.data);
      setFileOld(res.data.file);
    });
  };

  const handleChange = (e) => {
    if (e.target.name === "file") {
      setData({
        // ...form คือเอาค่าเดิมของ form มาก่อนแล้วค่อยเอาค่าใหม่เขียนทับ
        ...data,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setData({
        // ...form คือเอาค่าเดิมของ form มาก่อนแล้วค่อยเอาค่าใหม่เขียนทับ
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formWithImageData = new FormData();

    // ลูปทุกๆตัวใน form
    for (const key in data) {
      formWithImageData.append(key, data[key]);
    }

    formWithImageData.append("fileold", fileold);
    navigate("/");
    update(params.id, formWithImageData)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      FormEditProduct 555
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="name"
          onChange={(e) => handleChange(e)}
          placeholder="name"
          value={data.name}
        />{" "}
        <br />
        <input
          type="text"
          name="detail"
          placeholder="detail"
          value={data.detail}
          onChange={(e) => handleChange(e)}
        />
        <br />
        <input
          type="text"
          name="price"
          placeholder="price"
          value={data.price}
          onChange={(e) => handleChange(e)}
        />
        <br />
        <input type="file" name="file" onChange={(e) => handleChange(e)} />
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default FormEditProduct;
