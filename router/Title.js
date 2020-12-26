const title = require('express').Router()
const titleSchema = require('../schema/Title')
const reasonSchema = require('../schema/Reason')

title.post("/",async(req,res)=>{
    const {title,type,uid} = req.body
    console.log("req",req.body)
    
    const  postData = {
        title,
        type,
        uid,
        debit:0,
        credit:0,
        available:0
    }

    const insert = await new titleSchema(postData)

    console.log(insert)
    
    await insert.save((err,doc)=>{
        if(err){
            res.status(404).send(err)
        }
        if(doc){
            res.status(200).send(doc)
        }
    })
})

title.get("/",async(req,res)=>{
    const data = await titleSchema.find({uid:req.query.uid})
    res.send(data)
})

title.put("/",async(req,res)=>{
    console.log(req.body)

    const {id,title} = req.body

    const update = await titleSchema.updateOne({_id:id},{$set:{title:title}})
    if(update.ok === 1){
        res.status(200).send("SuccesFully")
    }
    else{
        res.status(404).send("Something Wrong")
    }


})

title.delete("/",async(req,res)=>{
    const title = await titleSchema.findOne({_id:req.query.id})
    const deleteTitle = await titleSchema.deleteOne({_id:req.query.id})
    if(deleteTitle.ok === 1){
        
        const deleteReason = await reasonSchema.deleteMany({title:title.title})
        if(deleteReason.ok ===1){
            res.status(200).send("Deleted Success")
        }
        else{
            res.status(404).send("Something Wrong")
        }
    }
    else{
        res.status(404).send("Something Wrong")
    }
})

module.exports = title