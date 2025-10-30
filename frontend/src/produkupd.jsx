import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Put = () => {
  const [title, settitle] = useState("");
  const [file, setfile] = useState("");
  const [view, setview] = useState("");
  const {id} = useParams()
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
    await axios.patch(`http://localhost:3000/produk/${id}`, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    navigate("/");
  };


useEffect( () => {
    produkId()
 },[] )

  const produkId = async () => {
const respon = await axios.get(`http://localhost:3000/produk/${id}`)
    console.log(respon.data)
    settitle(respon.data.name)
    setfile(respon.data.image)
    setview(respon.data.url)
}

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

        
              <button
                type="submit"
                className="bg-blue-600 py-2 px-4 rounded-xl hover:bg-blue-950 hover:text-white mt-4"
              >
                Update
              </button>
          
        </form>
      </div>
    </div>
  );
};

export default Put;
