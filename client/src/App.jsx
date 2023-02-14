import React, { useState, useEffect } from "react";
import axios from "axios";
import { Buffer } from "buffer";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5001")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err, "it has an error"));
  });
  return (
    <div>
      {data.map((singleData) => {
        const base64String = Buffer.from(singleData.img.data.data).toString(
          "base64"
        );
        return (
          <div>
            <h3>{singleData.name}</h3>
            <img src={`data:image/jpg;base64,${base64String}`} />
          </div>
        );
      })}
    </div>
  );
}

export default App;
