const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController.js")
const theatreController = require("../controllers/theatreController.js")
const movieController = require("../controllers/movieController.js")
const showController = require("../controllers/showController.js")



//================================  User Handler  ========================================//

router.post("/user/create", userController.createUser)

router.put("/user/bookTicket", userController.bookTicket)

router.put("/user/updateTicket", userController.updateTicket)



//================================  Theatre Handler  ========================================//

router.post("/theatre/create", theatreController.createTheatre)

router.get("/theatre/getTheatres", theatreController.getTheatres)


//================================  Movie Handler  ========================================//

router.post("/movie/create", movieController.createMovie)

router.get("/movie/getMovies", movieController.getMovies)


//================================  Movie Handler  ========================================//

router.post("/show/create", showController.createShow)



//====================================  Invalid API  ==========================================//

router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        msg: "The api you requested is not available!"
    })
})


module.exports = router;