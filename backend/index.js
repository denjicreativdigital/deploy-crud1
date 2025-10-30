import express from "express"
import cors from "cors"
import FileUpload from "express-fileupload"
import router from "./routes/routeproduct.js"

const port = 3000
const app = express()
app.use(cors())
app.use(express.json())
app.use(FileUpload())
app.use('/images', express.static('public/images'))
app.use(router)

app.listen(port, ()=> console.log('server success'))