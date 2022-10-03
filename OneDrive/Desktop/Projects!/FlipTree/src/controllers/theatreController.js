const theatreModel = require("../models/theatreModel.js")
const validation = require("../validations/validator.js")
const userModel = require("../models/userModel.js");





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








//====================================  Fetching theatre details  ===========================================//

const getTheatres = async function (req, res){
    try{
        let userId = req.params.userId
        let body = req.body
        let {location} = body

        if(!validation.idMatch(userId)) return res.status(400).send({status: false, message: "Invalid userId!"})
        let user = await userModel.findOne({_id: userId})
        if(!user) return res.status(404).send({status: false, message: "User not found"})


        if(!location) return res.status(400).send({status: false, message: "Location is required to fetch details of the theatres!"})
        if(!validation.isValid(location)) return res.status(400).send({status: false, message: "The input string cannot be empty!"})
        let theatre = await theatreModel.find({location: location})
        if(!theatre) return res.status(404).send({status: false, message: "No theatres found in this location!"})

        res.status(200).send({status: true, message: `Theatre details of ${location} are as follows: `, data: theatre})
        

    }catch(error){
        res.status(500).send({status: false, message: error.message})
    }
}


module.exports = {createTheatre, getTheatres}