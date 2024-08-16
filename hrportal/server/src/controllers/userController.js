/*
Project: Hiring Portal Project
Author: Sanjay HS
Date: 25/03/2024
Sprint: Sprint 1
User Story: Hiring Login Portal

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   | Phase   | Description 
-------------------------------------------------------------------------------------------------------
16/04/2024      HS                            2         1         Authentication & Authorization - Login
17/7/2024       HS                            1         2         User roles and permissions
12/07/2024      Harshini C                    1         2         Adding logger to all nodeJS files
-------------------------------------------------------------------------------------------------------
*/

const User = require("../collections/users");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const permission = require("../collections/userpermissions")
const { get } = require("mongoose");
const logger = require('../utility/logger');

// create token function for authentication
const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '2d'})
}

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // CHECKING IF THE USER ALREADY EXISTS
  let existingUser;
  try { 
    existingUser = await User.findOne({ email });
  
    console.log(existingUser)
  } catch (error) {
    logger.error(error.message);
  }

  if (!existingUser) {
    return res.status(404).json({ message: "Error: Email ID not found!" });
  }
  
  // const userName = existingUser.firstName;
  // const userRole = existingUser.role

  const { firstName, role } = existingUser;

  // Domain Check
  const emailRegex = /^[a-zA-Z0-9._%+-]+@fecundservices+\.com/;
  const validateEmail = emailRegex.test(email);
  if (!validateEmail) {
    return res.status(404).json({ message: "Error: Invalid Email ID!" });
  }

  // CHECKING IF THE PASSWORD IS CORRECT
  const isPasswordCorrect = await bcrypt.compare(
    password,
    existingUser.password
  );

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Error: Invalid Password!" });
  }
  // authentication token
  const token = createToken(existingUser._id)

  return res.status(201).json({ user: {firstName, email, role}, token });

 // return res.status(200).json({ message: "Sucessfully logged in " });
};

// signup user
const signupUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      employeeID,
      email,
      password,
      answer1,
      answer2,
      answer3,
    } = req.body;

    // DOMIANCHECK
    const emailRegex = /^[a-zA-Z0-9._%+-]+@fecundservices+\.com/;
    const validateEmail = emailRegex.test(email);
    if (!validateEmail){
      return res.status(400).json({ message: "Error: Invalid Email ID!" });
    }

    // CHECKING IF THE USER ALREADY EXISTS
    let existingUser;
    try {
      existingUser = await User.findOne({ email });
    } catch (error) {
      logger.error(error.message);
    }

    if (existingUser) {
      return res.status(400).json({ message: "Error: Email ID already exists!" });
    }

     // CHECKING IF EMPLOYEE ID ALREADY EXISTS
     let existingID
     try {
       existingID = await User.findOne({ employeeID });
     } catch (error) {
       logger.error(error.message);
     }
  
     if (existingID) {
       return res.status(400).json({ message: "Error: Employee ID already exists!"})
     }

     // Role management logic
    const haspermission = await permission.findOne({userPermissions: req.body.employeeID});    
    const role = haspermission ? 'admin' : 'user'

    // HASHING THE PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // HASHING THE ANSWERS OF SECURITY QUESTIONS
    const hashedAnswer1 = await bcrypt.hash(answer1, 10);
    const hashedAnswer2 = await bcrypt.hash(answer2, 10);
    const hashedAnswer3 = await bcrypt.hash(answer3, 10);

    // CREATING A NEW USER
    const user = new User({
      firstName,
      lastName,
      employeeID,
      email,
      role,
      password: hashedPassword,
      answer1: hashedAnswer1,
      answer2: hashedAnswer2,
      answer3: hashedAnswer3,
    });
    await user.save();
    // authentication token
    const token = createToken(user._id)
    return res.status(201).json({ firstName, email, token, role });
  } catch (error) {
    logger.error(error.message);
  }
};

// reset Password for the user.
const forgotPassword = async (req, res) => {
  try {
    const {email, employeeID, securityQuestion, answer} = req.body;

    // CHECKING IF EMAIL EXISTS
    let existingUser;
    try {
      existingUser = await User.findOne({ email });
    } catch (error) {
      logger.error(error.message);
    }

    if (!existingUser) {
      return res.status(400).json({ message: "Error: Email ID not found!" });
    }

     // CHECKING IF EMPLOYEE ID  EXISTS
    let existingID;
    try {
      existingID = await User.findOne({ employeeID });
    } catch (error) {
      logger.error(error.message);
    }
  
    if (!existingID) {
      return res.status(400).json({ message: "Error: Employee ID not found!"})
    }

    // to check whether the employeeID belongs to the user
    try {
      if (employeeID != existingUser.employeeID) {
        return res.status(400).json({ message: "Error: Employee ID not found!"})
      }
    } catch (error){
      logger.error(error.message)
    }

    // Validate security question answer based on selected question.
    try {
      if (securityQuestion == existingUser.securityQuestion1){
        const isAnswer1Correct = await bcrypt.compare(
          answer,
          existingUser.answer1
        );
        if (!isAnswer1Correct) {
          return res.status(400).json({ message: "Error: Incorrect Answer!" });
        }
      } else if(securityQuestion == existingUser.securityQuestion2) {
        const isAnswer2Correct = await bcrypt.compare(
          answer,
          existingUser.answer2
        );
        if (!isAnswer2Correct) {
          return res.status(400).json({ message: "Error: Incorrect Answer!" });
        }
      } else {
        const isAnswer3Correct = await bcrypt.compare(
          answer,
          existingUser.answer3
        );
        if (!isAnswer3Correct) {
          return res.status(400).json({ message: "Error: Incorrect Answer!" });
        }
      }

    } catch (error) {
      logger.error(error.message)
    }
    return res.status(200).json({ message: "You can reset password now " });
  } catch (error) {
    logger.error(error.message)
  }
 
};

// reset password to new password
const resetPassword = async (req, res) => {
  try {
    const {employeeID, newPassword} = req.body
    // hashing password
    const hashednewPassword = await bcrypt.hash(newPassword, 10);
    // updating new password
    await User.updateOne({employeeID}, {password: hashednewPassword})
    return res.status(200).json({message: "Password Reset Successful"})
  } catch (error) {
    logger.error(error.message)
  }
}


 
module.exports = { loginUser, signupUser, forgotPassword, resetPassword};



