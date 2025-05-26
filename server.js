import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
//Local imports:
import bookRouter from './routes/books.js';
import pgclient from './db.js';

//Initialization
const app = express();
dotenv.config();

const PORT = process.env.PORT || 3002;

//Middleware:
app.use(cors());
app.use(express.json());


//Endpoints || Routes || Request URLs:
app.use('/api/books', bookRouter);


app.use((req,res)=>{
    res.json({"message":"Page/Route not found"});
});

pgclient.connect()
    .then(()=>{
        app.listen(PORT, ()=>{
            console.log(`Listening on port ${PORT}`);
        });
    }).catch((error)=>{
        console.log("Error connection to pg server.");
        console.log(error);
    });