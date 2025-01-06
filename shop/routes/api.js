var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');



// for generating  secret key
const crypto = require('crypto');

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex');
};
console.log(generateSecretKey());

// for verifying token for protected route


const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
 
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - Missing token' });
    }
 
    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET , (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized - Invalid token' });
      }
 
      req.userId = decoded.userId;
      next();
    });
  };


router.get('/simpleapi',verifyToken, (req,res) => {
    res.status(200).json({text: 'Hello world, This is your first api call'})
});

// route for signup

router.post('/signupapi', (req, res) => {
    const {name, email, password, confirmPassword } = req.body;
 
    // Check if the password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Password and Confirm Password do not match' });
    }
 
    // Check all fields are not empty
    const user = new User({name, email, password });
    const validationError = user.validateSync();
 
    if (validationError) {
      return res.status(400).json({ error: validationError.errors });
    }
 
    // Check if the email is already taken
    User.findOne({ email })
      .then(existingUser => {
        if (existingUser) {
          return res.status(400).json({ message: 'Email already taken' });
        }
 
        // Hash the password using bcrypt
        return bcrypt.hash(password, 10);
      })
      .then(hashedPassword => {
        // Create a new user in MongoDB
        const newUser = new User({ name,email, password: hashedPassword });
        return newUser.save();
      })
      .then(() => {
        // Respond with success
        res.status(201).json({ message: 'Account created successfully' });
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      });
  });





  // Login API
  router.post('/loginapi', (req, res) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user || !bcrypt.compare(req.body.password,user.password)) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
 
        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET = generateSecretKey(), { expiresIn: '1h' });
 
        // Send the token in the response
        res.status(200).json({ token });
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      });
  });



module.exports = router;