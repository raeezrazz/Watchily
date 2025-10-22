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
    origin:'https://watchily-2je98t8gm-rahees-projects-cbd8887d.vercel.app',
    credentials:true
  }))

app.use('/',router)
  
const PORT=process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});