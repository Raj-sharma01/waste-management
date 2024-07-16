import express from 'express';
import cors from 'cors';
import  userRoute from './routes/user.router.js'
import { connetDB } from './config/db.js';
import authRoute from './routes/auth.router.js'
import cookieParser from 'cookie-parser';
import adminRoute from './routes/admin.router.js'
import officerRoute from './routes/officer.router.js'

let app = express();
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
    credentials: true
}

app.use(cors(corsOptions))
app.use(express.json());
app.use(cookieParser())
connetDB();


app.use('/api/user',userRoute);
app.use('/api/auth',authRoute);
app.use('/api/admin',adminRoute)
app.use('/api/officer',officerRoute)


app.listen(3000, () => {
    console.log("server listening on 3000");
})