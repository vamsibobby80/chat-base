
const express=require('express');
const app=express();

// get|post|put|delete

//i want to read the id in route i.e : /app/course/:id

app.get('/courses/ap/:id', (req,res)=>{
    res.send(req.params.id);
});

//in browser if its like /courses/ap/1  then output will be 1 
