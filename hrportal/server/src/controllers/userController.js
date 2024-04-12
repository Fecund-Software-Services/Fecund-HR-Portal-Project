const User = require("../collections/users");
const bcrypt = require("bcrypt");

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // CHECKING IF THE USER ALREADY EXISTS
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    console.log(error.message);
  }

  if (!existingUser) {
    return res.status(404).json({ message: "Error: Email ID not found!" });
  }

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

  return res.status(200).json({ message: "Sucessfully logged in " });
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
      console.log(error.message);
    }

    if (existingUser) {
      return res.status(400).json({ message: "Error: Email ID already exists!" });
    }

     // CHECKING IF EMPLOYEE ID ALREADY EXISTS
     let existingID
     try {
       existingID = await User.findOne({ employeeID });
     } catch (error) {
       console.log(error.message);
     }
  
     if (existingID) {
       return res.status(400).json({ message: "Error: Employee ID already exists!"})
     }

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
      password: hashedPassword,
      answer1: hashedAnswer1,
      answer2: hashedAnswer2,
      answer3: hashedAnswer3,
    });
    await user.save();
    return res.status(201).json({ message: user });
  } catch (error) {
    console.log(error.message);
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
      console.log(error.message);
    }

    if (!existingUser) {
      return res.status(400).json({ message: "Error: Email ID not found!" });
    }

     // CHECKING IF EMPLOYEE ID  EXISTS
    let existingID;
    try {
      existingID = await User.findOne({ employeeID });
    } catch (error) {
      console.log(error.message);
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
      console.log(error.message)
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
      console.log(error.message)
    }
    return res.status(200).json({ message: "You can reset password now " });
  } catch (error) {
    console.log (error.message)
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
    console.log(error.message)
  }
}

module.exports = { loginUser, signupUser, forgotPassword, resetPassword};



