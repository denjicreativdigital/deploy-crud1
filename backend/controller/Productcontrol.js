import Produk from "../models/product.js";
import path from "path"
import fs from "fs"


// GET ONLY
export const getproduk = async(req, res) =>{
    try{
        const response = await Produk.findAll()
        res.json(response)
    }catch (error){
        console.log('error in get only, sir ', error.message)
    }
    // res.send('get only is ready')
}

// GET BY ID
export const getprodukByid = async(req, res) =>{
try{
    const response = await Produk.findOne({
    where:{
    id: req.params.id
}})
    res.json(response)
}catch (error){
    console.log('error in getby ID sir')
}}

// POST PRODUCT
export const saveproduk = (req, res) =>{
if(req.file === null) return res.status(404).json({msg:'file not found'})
const name = req.body.title
const file = req.files.file
const Filesize = file.data.length
const ext = path.extname(file.name)
const filename = file.md5 + ext
const url = `${req.protocol}://${req.get("host")}/images/${filename}`
const allowedType = ['.png', '.jpg', '.jpeg', '.JPG']

if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid image"})
    if(Filesize > 5000000) return res.status(422).json({msg: "image lebih dari 5mb"})

        file.mv(`./public/images/${filename}`, async(err)=>{
            if(err) return res.status(500).json({msg: err.message})
                try{
            await Produk.create({name: name, image: filename, url: url})
            res.status(201).json({msg: "sukses membuat produk"})
                }catch(error){
                    console.log('error in postman sir')
                }
        })

}

// UPDATE PRODUCT
export const updateproduk = async(req, res) =>{
    const product = await Produk.findOne({
        where: {
            id: req.params.id 
        }
    })
if(!product) return res.status(404).json({msg: "no data detection"})
let fileName = ""
if(req.files === null) {
    fileName = Produk.image
}else {
    const file = req.files.file
    const Filesize = file.data.length
    const ext = path.extname(file.name)
    fileName = file.md5 + ext
    const allowedType = ['.png', '.jpg', '.jpeg', '.JPG']

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid image"})
        if(Filesize > 5000000) return res.status(422).json({msg: "image lebih dari 5mb"})

    const filePatch = `./public/images/${product.image}`
    if (fs.existsSync(filePatch)) {
        fs.unlinkSync(filePatch);
      }
    file.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message})})

    const name = req.body.title
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`
    try {
        await Produk.update({name: name, image: fileName, url: url }, {
            where: {
            id: req.params.id
            }
        })
        res.status(200).json({msg: "Update product is succes"})
    } catch (error) {
        console.log(error.message)
    }

}
}


// DELETE PRODUCT
export const deleteproduk = async(req, res) =>{
    const product = await Produk.findOne({
        where: {
            id: req.params.id 
        }
    })
if(!product) return res.status(404).json({msg: "no data detection"})

    try{
        const filePatch = `./public/images/${product.image}`
        fs.unlinkSync(filePatch)
        await Produk.destroy({
            where:{
                id: req.params.id
            }
        })
        res.status(200).json({msg: "delete is success"})
    } catch(error){
        console.log(error.message)
    }



}