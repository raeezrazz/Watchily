import express from 'express'
import cors from 'cors'
import dotenv from "dotenv";
import { connectDB } from './config/connectDB';
dotenv.config();

const app = express();
app.use(express.json());


connectDB()

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
  }))

  
const PORT=process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});