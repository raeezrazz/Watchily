import express from 'express'
import cors from 'cors'
import dotenv from "dotenv";
import { connectDB } from './config/connectDB';
import router from './routes/userRoutes';
dotenv.config();

const app = express();
app.use(express.json());


connectDB()

const allowedOrigins = [
  'https://watchily.vercel.app', // main domain
  'https://watchily-2je98t8gm-rahees-projects-cbd8887d.vercel.app', // preview
  'https://watchily-git-main-rahees-projects-cbd8887d.vercel.app'  // another preview
];
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); // allow Postman or server-to-server requests
    if(allowedOrigins.includes(origin)){
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use('/',router)
  
const PORT=process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});