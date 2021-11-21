const express=require("express");

const books=require("./db.json");

const app=express();

app.use(express.json());
const logger=(req,res,next) => {
    req.name={api_requested_by:"Dhaval Chheda"};
    next();
}

app.use(logger);
app.get("/",(req,res)=>{
    let x= req.name;
    res.send({x,books});
});
//for geeting all books as format and add another
app.post("/books",(req,res)=>{
    const new_data=[...books.data,req.body];
    console.log(req.body)
    let x=req.name;
    res.send({x,new_data});
});
//for getting particular book by using id
app.get("/books/:id",(req,res)=>{
    console.log(req.params.id);
    let a=req.name;
    const id=books.data.filter((a)=>a.id==req.params.id);
    res.send({a,id});

});
//updating data by patch request
app.patch("/books/:id",(req,res)=>{
    
console.log(req.params.id);
const newusers=books.data.map(book=>{
    if(req.params.id==book.id){
        if(req?.body?.id)book.id=req.body.id
        if(req?.body?.book_name)book.book_name=req.body.book_name
        if(req?.body?.author_name)book.author_name=req.body.author_name
        if(req?.body?.publish_year)book.publish_year=req.body.publish_year
        if(req?.body?.pages)book.pages=req.body.pages

       // book=req.body;
    }
    return book;
});
res.send(newusers);

                
});
//for delete data
app.delete("/books/:id",(req,res)=>{
    const d=books.data.filter((book)=>book.id !== +req.params.id);
    res.send(d)
})

app.listen(3200,function(){
    console.log("listening on port 3200")
})
