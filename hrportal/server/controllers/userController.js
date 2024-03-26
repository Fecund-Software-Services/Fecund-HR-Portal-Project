const User = require('../collections/userModel')
const bcrypt = require('bcrypt')

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
    return res.status(404).json({ message: "User does not exist" });
  }

  // CHECKING IF THE PASSWORD IS CORRECT
  const isPasswordCorrect = await bcrypt.compare(
    password,
    existingUser.password
  );

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  return res.status(200).json({ message: "Sucessfully logged in " });
};
  
// signup user
const signupUser = async (req, res) => {
  try {
    const { firstName, lastName, employeeID, email, password, answer1, answer2, answer3 } = req.body;

    // CHECKING IF THE USER ALREADY EXISTS
    let existingUser;
    try {
      existingUser = await User.findOne({ email });
    } catch (error) {
      console.log(error.message);
    }

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
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
      answer3
    });
    await user.save();
    return res.status(201).json({ message: user });
  } catch (error) {
    console.log(error.message);
  }
};


module.exports = {loginUser, signupUser}