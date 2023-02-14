import React, { useState, useEffect } from "react";
import axios from "axios";
import { Buffer } from "buffer";

function App() {
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5001")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err, "it has an error"));
  });

  //handleSubmit
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("testImage", file);
    formData.append("name", fileName);

    try {
      const response = await axios.post("http://localhost:5001", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(event) => setFileName(event.target.value)}
        />
        <input
          type="file"
          onChange={(event) => setFile(event.target.files[0])}
        />
        <input type="submit" />
      </form>
      {data.map((singleData) => {
        const base64String = Buffer.from(singleData.img.data.data).toString(
          "base64"
        );
        return (
          <div>
            <h3>{singleData.name}</h3>
            <img src={`data:image/jpg;base64,${base64String} `} width="300" />
          </div>
        );
      })}
    </div>
  );
}

export default App;
