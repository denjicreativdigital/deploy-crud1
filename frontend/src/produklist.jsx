import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Produklist() {
  const [produk, setproduk] = useState([]);

  useEffect(() => {
    getproduk();
  }, []);

  const getproduk = async () => {
    const response = await axios.get("http://localhost:3000/produk");
    console.log("Data produk dari API:", response.data);
    setproduk(response.data);
  };

const deleteproduk = async(aydi) =>{
  await axios.delete(`http://localhost:3000/produk/${aydi}`)
    getproduk()
  
}

  return (
    <div>

      <Link to={"/add"} className="py-2 px-4 bg-green-500">New</Link>
    <div className="flex flex-wrap gap-5 justify-center mt-10">
      {produk.map((pariabel) => (
        <div className="bg-zinc-400 w-[300px]" key={pariabel.id}>
          <img src={pariabel.url} alt="" className="w-[95%] mx-auto mt-2" />

          <h1 className="font-bold text-center">{pariabel.name}</h1>

          <div className="flex justify-center gap-3">
            <a className="bg-black cursor-pointer text-white py-2 px-7 my-5 rounded-xl" onClick={() => deleteproduk(pariabel.id)}>
              delete
            </a>
            <Link to={`/edit/${pariabel.id}`} className="bg-black cursor-pointer text-white py-2 px-7 my-5 rounded-xl">
            edit
            </Link>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}

export default Produklist;
