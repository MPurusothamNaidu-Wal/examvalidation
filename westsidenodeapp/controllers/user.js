const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
exports.createUser = function (req, res) {
    console.log(req.body);
    let encryptedPassword;
    try {
        let salt = bcrypt.genSaltSync(10);
        console.log(salt);
        encryptedPassword = bcrypt.hashSync(req.body.password, salt);
        console.log(encryptedPassword);
    }
    catch (error) {
        console.log(error);
        console.log("error in bcrypt");
    }
    const userOb = new User({
        name: req.body.name,
        age: req.body.age,
        dob: req.body.dob,
        password: encryptedPassword,
        email: req.body.email,
    });
    console.log(userOb);
    userOb.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.json("User created successfully");
        }
    })
}

exports.getUser = function (req, res) {
    User.find((err, users_list) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json(users_list);
        }
    })
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    let userOb = await User.findOne({ email });
    if (!userOb) {
        res.status(400).json({ status: 0, debug_data: "user not found" });
    }
    const passCorrect = await bcrypt.compareSync(password, userOb.password);
    if (!passCorrect) {
        res.status(400).json({
            status: 0,
            debug_data: "user credentials wrong",
        });
    }
    //We need to send JWT token and also information about the user like his user id and email
    // If password is correct we create a JWT token.
    //Payload is data that is sent inside token to user
    const payload = {
        user: {
            email: email,
        }
    };
    // Creating a jwt token to send to front end to let user login as long as user has token he can login into website.
    //User normally store token in cookie or in local storage (for react)
    //the user will send this token everytime to server to verify . If not sending token he doesnt want to login
    // and cannot access secure area of website.
    jwt.sign(
        payload,
        "secret_String",
        {
            expiresIn: 1200,
        },
        (err, token) => {
            if (err) {
                throw error,
                res.json({
                    status: 0,
                    debug_data: "Temporary error in backend",
                });
            }
            res.status(200).json({
                token,
            })
        }
    )
};