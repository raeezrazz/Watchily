import express from 'express'
import cors from 'cors'
import dotenv from "dotenv";
import { connectDB } from './config/connectDB';
import router from './routes/userRoutes';
dotenv.config();

const app = express();
app.use(express.json());


connectDB()

app.use(cors({
    origin:'https://watchily.vercel.app/',
    credentials:true
  }))

app.use('/',router)
  
const PORT=process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});