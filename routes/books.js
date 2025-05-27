import express from 'express';
import dotenv from 'dotenv';
import pgclient from '../db.js';


//Initialization
const bookRouter= express.Router();
dotenv.config();

//Endpoints || Routes || Request URLs:
//Book Object Prototype: {"id": 1, "title": "Book Title", "author": "Author Name", "year": 2024}
bookRouter.get('',async (req,res)=>{
    try{
        const result = await pgclient.query("SELECT * FROM books;");
        res.json(result.rows);
    }catch (err){
        return res.status(500).json({"error":"internal server error.", "Error":err});
    }
});

bookRouter.get('/:id',async (req,res)=>{
    try{    
        const result = await pgclient.query("SELECT * FROM books WHERE id=$1;",[req.params.id]);
        if(result.rows.length === 0){
            return res.status(404).json({"message":"Book not found."});
        }
        return res.json(result.rows);
    }catch (err){
        return res.status(500).json({"error":"internal server error.", "Error":err});
    }
});

bookRouter.post('',async (req,res)=>{
    try{
        const {title, author, year}=req.body;
        const result = await pgclient.query("INSERT into books (title, author, year) VALUES ($1,$2,$3) RETURNING *;", [title, author, year]);
        return res.status(201).json(result.rows);
    }catch (err){
        return res.status(500).json({"error":"internal server error.", "Error":err});
    }
});

bookRouter.put('/:id', async (req,res)=>{
    try{
        const {title, author, year} = req.body;
        const result = await pgclient.query("UPDATE books SET title=$2, author=$3, year=$4 WHERE id=$1 RETURNING *;",[req.params.id, title, author, year]);
        if(result.rows.length === 0)
            return res.status(404).json({"message":"Book not found."});
        return res.json(result.rows);
    }catch (err){
        return res.status(500).json({"error":"internal server error.", "Error":err});
    }
});

bookRouter.delete('/:id', async (req, res)=>{
    try{
        const result = await pgclient.query("DELETE FROM books WHERE id=$1 RETURNING *;", [req.params.id]);
        result.rows.length===0?
        res.json({"message":"no rows where deleted"}) :
        res.json({"message":`${result.rows.length} row(s) were deleted`, "rows":result.rows})
    }catch (err){
        return res.status(500).json({"error":"internal server error.", "Error":err});
    }
})


export default bookRouter;