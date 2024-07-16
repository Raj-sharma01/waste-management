import { User } from '../models/user.model.js'
import Jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Officer } from '../models/officer.model.js';

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

const createToken = (user) => {
    return Jwt.sign({ userId: user._id, username:user.username, email:user.email,  role: user.role }, 'secret', { expiresIn: '7d' });
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log("trying to login as user")
        // Check if the user exists in the User collection
        let user = await User.findOne({ email });
        console.log("user ",user)
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
            const token = createToken(user);
            
            res.cookie('token', token);
            return res.status(200).json({ message: 'Login successful', id:user._id , success:true, role:user.role, username:user.username, email:user.email });
        }

        console.log("trying to login as officer")
        // Check if the user exists in the Officer collection
        console.log(email)
        user = await Officer.findOne({ email });
        console.log("user = ",user)
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
            const token = Jwt.sign({ userId: user._id,username:user.username,email:user.email, role: 'officer' }, 'secret', { expiresIn: '7d' });
            res.cookie('token', token);
            return res.status(200).json({ message: 'Login successful', id: user._id ,success:true, role : 'officer',username:user.username,email:user.email });
        }

        // If no user found
        return res.status(400).json({ message: 'User not found' });
    } catch (error) {
        res.status(500).json({ message: `Error logging in: ${error.message}` });
    }
};


export const signupController = async (req, res) => {
    console.log("req.body = ", req.body);
    const { username, password, email } = req.body;
    console.log("username = ", username);
    console.log("password = ", password);
    console.log("email = ", email);
    
    if (!username || !password || !email) {
        console.log("somefield is missing");
        return res.status(400).json({ error: "All fields are required" });
    }
    try {
        const hashedPassword = bcrypt.hashSync(password, bcryptSalt)
        const createdUser = await User.create({
            username: username,
            password: hashedPassword,
            email: email,
        })
        //Jwt.sign -- is async function
        Jwt.sign({ userId: createdUser._id, username ,email, role:createdUser.role}, jwtSecret, {}, (err, token) => {
            if (err) throw err;
            console.log("signing a cookie")
            res.cookie('token', token).status(201).json({
                id: createdUser._id,
                success: true,
                username:username,
                email:email
            });

        })
    } catch (error) {
        if (error) console.log("error while signing up", error) ;
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

export const logout= async (req, res) => {
    res.cookie('token', '').json('ok');
}