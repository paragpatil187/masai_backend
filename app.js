
const users=require('./users.json');
const express = require ('express');
const app = express();

app.use(express.json());
app.get("/", ( req,res)=>{
    
    res.send("Welcome to Home page");
    

});
app.get("/users",(req,res)=>{
    res.send(users)

});
app.post("/",(req,res)=>{
   // console.log(req.body);
   const newUsers=[...users,req.body];
    res.send(newUsers);
});
app.patch("/:id",(req,res)=>{
    //console.log(req.params)
   // res.send("Patch");

});
app.delete("/:email",(req,res)=>{
    const newUsers=users.filter ((user) => user.email !==
req.params.email)
res.send(newUsers)
})
app.listen(2346,function(){
    console.log("listening on port 2346")
});
