import express from "express"
import {
    getproduk,
    getprodukByid,
    saveproduk,
    updateproduk,
    deleteproduk
} from "../controller/Productcontrol.js"

const router = express.Router()

router.get('/produk', getproduk)
router.get('/produk/:id', getprodukByid)
router.post('/produk', saveproduk)
router.patch('/produk/:id', updateproduk)
router.delete('/produk/:id', deleteproduk)

export default router