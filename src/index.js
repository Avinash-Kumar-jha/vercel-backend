const express = require('express')
const app = express();
require('dotenv').config();
const main =  require('./config/db')
const cookieParser =  require('cookie-parser');
const authRouter = require("./routes/userAuth");
const redisClient = require('./config/redis');
const problemRouter = require("./routes/problemCreator");
const submitRouter = require("./routes/submit")
const aiRouter = require("./routes/aiChatting")
const videoRouter = require("./routes/videoCreator");
const cors = require('cors')

// console.log("Hello")
// app.get("/", (req, res) => {
//     res.send("🚀 Backend is running successfully! Available routes: /user, /problem, /submission, /ai, /video");
// });

app.use(cors({
 origin: [
        "https://vercel-frontend-1-one.vercel.app", // tera frontend ka sahi domain
        "https://astounding-daifuku-93e8ba.netlify.app/signup",
  "https://majestic-cassata-614c30.netlify.app"
  // dev ke liye
    ],    credentials: true 
}))


app.use(express.json());
app.use(cookieParser());

app.use('/user',authRouter);
app.use('/problem',problemRouter);
app.use('/submission',submitRouter);
app.use('/ai',aiRouter);
app.use("/video",videoRouter);


const InitalizeConnection = async ()=>{
    try{

        await Promise.all([main(),redisClient.connect()]);
        console.log("DB Connected");
        
        app.listen(process.env.PORT, ()=>{
            console.log("Server listening at port number: "+ process.env.PORT);
        })

    }
    catch(err){
        console.log("Error: "+err);
    }
}


InitalizeConnection();

