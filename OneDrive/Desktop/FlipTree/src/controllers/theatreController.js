const theatreModel = require("../models/theatreModel.js")
const validation = require("../validations/validator.js")




//====================================  Creating a theatre  ===========================================//

const createTheatre = async function (req,res){
    try{
        let body = req.body
        let {name, location} = body

        if(validation.emptyBody(body)) return res.status(400).send({status: false, message: "Request cannot be empty!"})

        if(!name) return res.status(400).send({status: false, message: "Name of the theatre is mandatory!"})
        if(!validation.isValid(name)) return res.status(400).send({status: false, message: "The input string cannot be empty!"})
        body.name = body.name.trim().split(" ").filter(x => x).join(" ")

        if(!location) return res.status(400).send({status: false, message: "Location of the theatre is mandatory!"})
        if(!validation.isValid(location)) return res.status(400).send({status: false, message: "The input string cannot be empty!"})
        body.location = body.location.trim().split(" ").filter(x => x).join(" ")


        let create = await theatreModel.create(body)
        res.status(201).send({status: true, message: "Theatre created successfully!", data: create})
    }catch(error){
        res.status(500).send({status: false, message: error.message})
    }
};


module.exports = {createTheatre}