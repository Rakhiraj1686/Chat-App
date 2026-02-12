import User from "../models/userModel.js";
import bcrypt from "bcrypt";

//=================REGISTER==================
export const UserRegister = async (req, res, next) => {
  try {
    //accept data from Fronted
    const { fullName, email, mobileNumber, password } = req.body;

    //Verify that all data exist
    if (!fullName || !email || !mobileNumber || !password) {
      const error = new Error("All fields required");
      error.statusCode = 400;
      return next(error);
    }

    console.log({ fullName, email, mobileNumber, password });

    //check for duplicate user before registration
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("Email already exists");
      error.statusCode = 409;
      return next(error);
    }

    console.log("Sending Data to DB");

    //encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    console.log("password hashing done, hashPassword = ", hashPassword);

    //save data to database
    const newUser = await User.create({
      fullName,
      email: email.toLowerCase(),
      mobileNumber,
      password: hashPassword,
    });

    //send response to frontend
    console.log(newUser);
    res.status(201).json({ message: "Registration Successfull" });
  } catch (error) {
    next(error);
  }
};

//===================LOGIN========================
export const UserLogin = async (req, res, next) => {
  try {
    //fetch data from frontend
    const { email, password } = req.body;

    //verify that all data exist
    if (!email || !password) {
      const error = new Error("All fields required");
      error.statusCode = 400;
      return next(error);
    }

    //check for if user is registred or not
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const error = new Error("Email not registered");
      error.statusCode = 400;
      return next(error);
    }

    //verify password
    const isVerified = await bcrypt.compare(password, existingUser.password);
    if (!isVerified) {
      const error = new Error("Password didn't match");
      error.statusCode = 400;
      return next(error);
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!isPasswordMatch) {
      const error = new Error("Password did not match");
      error.statusCode = 400;
      return next(error);
    }
    //Token Genration will be done here
    // genToken(existingUser, res);

    //send message to frontend
    res.status(200).json({ message: "Login Successfull", data: existingUser });
  } catch (error) {
    next(error);
  }
};

//===================GOOGLEUSERLOGIN===============
export const GoogleUserLogin = async (req, res, next) => {
  try {
    if (!imageUrl) {
      //use Default Photo code here
      //using placehold.co
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      if (existingUser.userType === "regular") {
        console.log("pink");
      } else {
        console.log("Green");
      }
    } else {
      // console.log("orange");
      const HashGoogleID = bcrypt.hash(id, salt);
      const newUser = await User.create({
        fullName: name,
        email,
        googleId: HashGoogleID,
        userType: "google",
      });

      res.status(200).json({ message: "Login successful", data: newUser });
    }
  } catch (error) {}
};
