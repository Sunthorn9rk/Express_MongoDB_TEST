// rafce
import React, {useState, useEffect} from "react";
// import axios from "axios";
import {Link} from "react-router-dom";

import {remove, create, getdata} from "../functions/product";

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
        <input
          type="text"
          name="name"
          onChange={(e) => handleChange(e)}
          placeholder="name"
        />
        <br />
        <input
          type="text"
          name="detail"
          placeholder="detail"
          onChange={(e) => handleChange(e)}
        />

        <br />
        <input
          type="text"
          name="price"
          placeholder="price"
          onChange={(e) => handleChange(e)}
        />
        <br />

        <input type="file" name="file" onChange={(e) => handleChange(e)} />
        <br />
        <button>Submit</button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">name</th>
            <th scope="col">detail</th>
            <th scope="col">price</th>
            <th scope="col">Image</th>
            <th scope="col">action</th>
            <th scope="col">edit</th>
          </tr>
        </thead>
        <tbody>
          {/* ลูปเอาitem แต่ละอันมาโชว์ */}
          {data
            ? data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.detail}</td>
                  <td>{item.price}</td>
                  <td>{item.file}</td>
                  <td onClick={() => handleRemove(item._id)}>
                    <Link>delete</Link>
                  </td>
                  <td>
                    <Link to={"/edit/" + item._id}>edit</Link>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default FormProduct;
