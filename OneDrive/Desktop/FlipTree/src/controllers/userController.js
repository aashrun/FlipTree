const userModel = require("../models/userModel.js")
const movieModel = require("../models/movieModel.js")
const validation = require("../validations/validator.js")
const moment = require("moment")
const bcrypt = require("bcrypt")
const showModel = require("../models/showModel.js")



//====================================  Creating a user  ===========================================//

const createUser = async function (req, res){
    try{
        let body = req.body
        let {fullName, DOB, gender, email, mobileNumber, password, location} = body

        if(validation.emptyBody(body)) return res.status(400).send({status: false, message: "Request cannot be empty!"})

        if(!fullName) return res.status(400).send({status: false, message: "fullName is mandatory!"})
        if(!validation.isValid(fullName)) return res.status(400).send({status: false, message: "The input string cannot be empty!"})
        body.fullName = body.fullName.trim().split(" ").filter(x => x).join(" ")


        if(!DOB) return res.status(400).send({status : false, message : "DOB is required!"})
        DOB = moment(DOB).format("YYYY-MM-DD")
        if (!validation.isValidDateFormat(DOB)) return res.status(400).send({ status: false, msg: "Wrong date format!" })


        if(!gender) return res.status(400).send({status: false, message: "Your gender is required!"})
       if(!["male", "female", "other"].includes(gender)){
        return res.status(400).send({status : false, msg : "Should include 'male', 'female' and 'other' only!"})
    }


    if(!email) return res.status(400).send({status : false, message : "Email is required!"})
    if(!validation.validateEmail(email)) return res.status(400).send({status: false, message: "Invalid email format!"})
    let uniqueEmail = await userModel.findOne({email: email, isDeleted: false})
    if(uniqueEmail) return res.status(409).send({status: false, message: "This email already exists in the database!"})



    if(!mobileNumber) return res.status(400).send({status: false, message: "Mobile Number is mandatory!"})
    if(!validation.onlyNumbers(mobileNumber)) return res.status(400).send({status: false, message: "The key 'mobileNumber' should contain numbers only!"})
    if(!validation.isValidMobileNum(mobileNumber)) return res.status(400).send({status: false, message: "This number is not an Indian mobile number!"})
    let uniqueMobile = await userModel.findOne({mobileNumber: mobileNumber, isDeleted: false})
    if(uniqueMobile) return res.status(409).send({status: false, message: "This mobile already exists in the database!"})


    if(!password) return res.status(400).send({status : false, message : "Password is required!"})
    const salt = await bcrypt.genSalt(10)
    body.password = await bcrypt.hash(body.password, salt)


    if(!location) return res.status(400).send({status: false, message: "It's important for us to know regarding your current location to loacte theatres near you."})
    if(!validation.isValid(location)) return res.status(400).send({status: false, message: "The input string cannot be empty!"})
    body.location = body.location.trim().split(" ").filter(word => word).join(" ")
     

    let create = await userModel.create(body)
    res.status(201).send({status: true, message: "Successfully created a user!", data: create })

    }catch(error){
        res.status(500).send({status: false, message: error.message})
    }
};








//====================================  Booking Tickets  ===========================================//

const bookTicket = async function (req, res){
    try{
        let userId = req.params.userId
        let body = req.body
        let {movieName, timeSlot, seats} = body

        if(!validation.idMatch(userId)) return res.status(400).send({status: false, message: "Invalid userId!"})
        let user = await userModel.findOne({_id: userId})
        if(!user) return res.status(404).send({status: false, message: "User not found"})

        if(!movieName) return res.status(400).send({status: false, message: "Movie's name is a mandatory input!"})
        if(!validation.isValid(movieName)) return res.status(400).send({status: false, message: "The input string cannot be empty!"})

        let movie = await movieModel.findOne({movieName: movieName})
        if(!movie) {
            return res.status(404).send({status: false, message: "Movie not found!"})
        }else{
            let shows = await showModel.findOne({movieId: movie._id})
            let slots = shows.timeSlotsAndSeats // object

            let isBelowThreshold = (currentValue) => currentValue == 0;
            let values = Object.values(slots)
            if(values.every(isBelowThreshold)) return res.status(403).send({status: false, message: "No timeslots available for this movie!"})

            if(!timeSlot) return res.status(400).send({status: false, message: "Please provide with your desired timings!"})
            if(!seats) return res.status(400).send({status: false, message: "Please provide number of seats!"})

            for(let keys in slots){
               if(keys == timeSlot){
                if(obj[keys] > seats){
                let data = obj[keys] - seats
                 await showModel.findOneAndUpdate({_id: shows._id}, {timeSlotsAndSeats: data})
                return res.send(200).send({status: true, message: `Movie ticket successfully booked for ${seats} person/s!`})

                }else{
                    return res.send(404).send({status: false, message: "No seats available for this time"})
                }
               }else{
                return res.send(404).send({status: false, message: "No slot available for this time"})
               }
            }

        }

    }catch(error){
        res.status(500).send({status: false, message: error.message})
    }
};










module.exports = {createUser, bookTicket}