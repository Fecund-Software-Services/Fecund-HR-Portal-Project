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
    return res.status(404).json({ message: "Error: Email ID not found !" });
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
      return res.status(400).json({ message: "Error: Email ID already exists !" });
    }

     // CHECKING IF EMPLOYEE ID ALREADY EXISTS
     let existingID
     try {
       existingID = await User.findOne({ employeeID });
     } catch (error) {
       console.log(error.message);
     }
  
     if (existingID) {
       return res.status(400).json({ message: "Error: Employee ID already exists !"})
     }

    // HASHING THE PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATING A NEW USER
    const user = new User({
      firstName,
      lastName,
      employeeID,
      email,
      password: hashedPassword,
      answer1,
      answer2,
      answer3,
    });
    await user.save();
    return res.status(201).json({ message: user });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { loginUser, signupUser };
