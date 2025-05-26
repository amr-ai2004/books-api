import express from 'express';
import dotenv from 'dotenv';


//Initialization
const bookRouter= express.Router();
dotenv.config();

//Endpoints || Routes || Request URLs:

//Book Object Prototype: {"id": 1, "title": "Book Title", "author": "Author Name", "year": 2024}



export default bookRouter;