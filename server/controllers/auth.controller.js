import { User } from '../models/user.model.js'
import Jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


const jwtSecret = "secret";
const bcryptSalt = bcrypt.genSaltSync(10);

export const loginController = async(req, res) => {

    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });
    if (foundUser) {
        const passOk = bcrypt.compareSync(password, foundUser.password);
        if (passOk) {
            Jwt.sign({ userId: foundUser._id, username:foundUser.username ,email:foundUser.email}, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).status(201).json({
                    id: foundUser._id,
                    success: true
                });
            });
        }
        else{
            console.log("wrong password")
        }
    }
    else{
       console.log("user not found")
    }
}


export const signupController = async (req, res) => {
    console.log("req.body = ", req.body)
    const { username, password, email } = req.body;
    try {
        const hashedPassword = bcrypt.hashSync(password, bcryptSalt)
        const createdUser = await User.create({
            username: username,
            password: hashedPassword,
            email: email,
        })
        //Jwt.sign -- is async function
        Jwt.sign({ userId: createdUser._id, username ,email}, jwtSecret, {}, (err, token) => {
            if (err) throw err;
            console.log("signing a cookie")
            res.cookie('token', token).status(201).json({
                id: createdUser._id,
                success: true
            });

        })
    } catch (error) {
        if (error) throw error;
        res.status(500).json('error')
    }

}

export const profileController=(req, res) => {

    const token = req.cookies?.token;
    if (token) {
        Jwt.verify(token, jwtSecret, {}, (err, userData) => {
            if (err) throw err;
            console.log("profile data", userData)
            res.json(userData); 
        });
    } else {
        res.status(401).json('no token');
    }
}