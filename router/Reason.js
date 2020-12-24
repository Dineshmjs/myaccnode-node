const reason = require('express').Router()
const reasonSchema = require('../schema/Reason')
const titleSchema = require('../schema/Title')

const TitleAvailable = async (res, title) => {
    let credit = 0, debit = 0, available = 0

    const data = await reasonSchema.find({title})
    for (x of data) {
        if (x.action === "debit") {
            debit += x.amount
        }
        else {
            credit += x.amount
        }
    }

    available = credit - debit

    const updateTitle = await titleSchema.updateOne({ _id: title }, { $set: { credit: credit, debit: debit, available: available } })
    if (updateTitle.ok === 1) {
        res.status(200).send(updateTitle)
    }
}

reason.post("/", async (req, res) => {
    const { reason, amount, action, title } = req.body

    const data = {
        reason,
        title,
        action,
        amount
    }

    const insert = await new reasonSchema(data)

    await insert.save(async (err, doc) => {
        if (err) {
            res.status(404).send(err)
        }
        if (doc) {

            TitleAvailable(res, title)
        }
    })
})

reason.get("/", async (req, res) => {
    const data = await reasonSchema.find({ title: req.query.title })
    res.send(data)
})

reason.put("/", async (req, res) => {
    const { reason, amount, action, title, id } = req.body

    const update = {
        reason,
        action,
        amount
    }

    const updateReason = await reasonSchema.updateOne({_id:id},{$set:update})

    if(updateReason.ok === 1){
        TitleAvailable(res,title)
    }
    else{
        res.status(404).send("Something Wrong")
    }



})

reason.delete("/", async (req, res) => {
    const {title,reason} = req.query
    console.log(title,reason)
    const remove =await reasonSchema.deleteOne({title,_id:reason})
    TitleAvailable(res,title)
    
})

module.exports = reason