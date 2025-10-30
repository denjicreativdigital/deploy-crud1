import { BrowserRouter, Routes, Route } from "react-router-dom";
import Produklist from "./produklist.jsx"
import Add from "./productadd.jsx"
import Put from "./produkupd.jsx"


function App() {

  return (
    <>
<BrowserRouter>
<Routes>
<Route path="/" element={<Produklist />} />
<Route path="add" element={<Add />} />
<Route path="edit/:id" element={<Put />} />
</Routes>
</BrowserRouter>
    </>
  )
}

export default App
