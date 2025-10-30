import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [title, settitle] = useState("");
  const [file, setfile] = useState("");
  const [view, setview] = useState("");
  const navigate = useNavigate();

  const load = (e) => {
    const image = e.target.files[0];
    setfile(image);
    setview(URL.createObjectURL(image));
  };

  const render = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    await axios.post("http://localhost:3000/produk", formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    navigate("/");
  };

  return (
    <div className="body">
      <div className="flex justify-center">
        <form action="" onSubmit={render}>
          {/* name */}
          <div className="name">
            <label className="">Product Name</label>
            <div className="control">
              <input
                type="text"
                className="border py-2 px-5"
                value={title}
                onChange={(e) => settitle(e.target.value)}
                placeholder="Product Name"
              />
            </div>
          </div>

          {/* file */}
          <div className="name">
            <label className="">Product Image</label>
            <div className="controll">
              <input
                type="file"
                className="border p-4"
                onChange={load}
                placeholder="chose image"
              />
            </div>
          </div>

          {view ? (
            <figure>
              <img src={view} alt="view image" className="w-[200px] mt-5" />
            </figure>
          ) : (
            ""
          )}

          <div className="field">
            <div className="control">
              <button
                type="submit"
                className="bg-blue-600 py-2 px-4 rounded-xl hover:bg-blue-950 hover:text-white mt-4"
              >
                render
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
