const userModel = require("../models/userModel.js")
const validation = require("../validations/validator.js")
const moment = require("moment")
const bcrypt = require("bcrypt")



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

module.exports = {createUser}