const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');


const JWT_SECRET = 'jamesisgoodboy'


//ROUTE 1: create a user using: POST "/api/auth/createuser". Doesn't require login
router.post('/createuser', [
  //validation of data
  body('name').isLength({ min: 3 }),
  body('email', 'put a valid mail').isEmail(),
  // body('username', 'username must contain 5 letters').isLength({ min: 5 }),
  body('password', 'Password must have a minimum of 5 characters').isLength({ min: 5 }),

], async (req, res) => {
  let success = false;
  //if error occurs return Bad request and errors
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ success, errors: error.array() });
  }

  try {
    //check whether  the user with this email exist already or not
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ success, error: "User with this email already exist " })
    }

    //password hashing with salt
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt)

    //create a new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      // username: req.body.username,
      password: secPass,
    })

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);

    //res.json(user)
    success = true;
    res.json({ success, authtoken })

    //catching errors if any kind of error arise in app
  } catch (error) {
    console.error(error.message);
    res.status(500).send("INTERNAL SERVER ERROR SORRY FOR THE INCONVENINCE")

  }

})

// ROUTE 2 : Authenticate a user using: POST "/api/auth/login". Doesn't require login
router.post('/login', [
  //validation of data
  //  body('name').isLength({ min: 3 }),
  body('email', 'put a valid mail').isEmail(),
  // body('username', 'username must contain 5 letters').isLength({ min: 5 }),
  body('password', 'Password cannot be blank').exists(),

], async (req, res) => {
  let success = false;
  //if error occurs return Bad request and errors
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  //if username or password is incorrect with existing save in database
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      success = false;
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false;
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authtoken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("INTERNAL SERVER ERROR OCCURED SORRY FOR THE INCONVENINCE ");
  }
})


// ROUTE 3 : Get loggedin user deails: POST "/api/auth/getuser".  require login
router.post('/getuser', fetchuser, async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("INTERNAL SERVER ERROR OCCURED SORRY FOR THE INCONVENINCE");
  }
})

module.exports = router