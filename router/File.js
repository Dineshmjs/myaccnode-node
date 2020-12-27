const file = require('express').Router()
const fileSchema = require('../schema/File')


file.post("/", async (req, res) => {
    console.log(req.body)

    const { type, url, file, description, uid } = req.body
    var newtype = ""

    console.log(type)
    if (type[0] === "i") {
        newtype = "image"
    }
    if (type[0] === "v") {
        newtype = "video"
    }
    if (type[0] === "a") {
        newtype = "audio"
    }

    console.log("type", newtype)

    const data = {
        type: newtype,
        url,
        file,
        description,
        uid,
        filetype: type
    }
    console.log(data)

    if (url) {
        const insert = await new fileSchema(data)
        await insert.save((err, doc) => {
            if (err) {
                res.status(404).send(err)
            }
            if (doc) {
                res.status(200).send(doc)
            }
        })
    }
})

file.get("/", async (req, res) => {
    const data = await fileSchema.find({uid:req.query.uid})
    res.status(200).send(data)
})

file.put("/", async (req, res) => {

})

file.delete("/", async (req, res) => {
    const deleteData = await fileSchema.deleteOne({ _id: req.query.id })
    if (deleteData.ok === 1) {
        res.status(200).send("Successfully Deleted")
    }
    else {
        res.status(404).send("Somethig Wrong")
    }
})

module.exports = file