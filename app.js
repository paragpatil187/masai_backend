const { application } = require("express");
const express=require("express");
const mongoose =require("mongoose");




const authorSchema = new mongoose.Schema(
    {
    first_name:{type:String, required:true},
    last_name:{type:String, required:false}
    },
    {versionKey:false,
    timestamp:true,
}
);
const Author=mongoose.model("author",authorSchema);
//console.log(Authour)

const bookSchema= new mongoose.Schema(
    {
      title:{
          type:String,
          required:true,
      } ,
      body:{type:String,required:false},
      author_id:[
      {
          type:mongoose.Schema.Types.ObjectId,
          ref:"author",
          required:true,
      },],
      section_id:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"section",
          required:false,
      },
      checkout_id:{
          type:mongoose.Schema.Types.ObjectId,
          "ref":"checkout",
      }
    },
    {
        versionKey: false,
        timestamps: true,
      }
);
const Booke=mongoose.model("booke",bookSchema);

const sectionSchema=new mongoose.Schema(
    {
        title:{type:String,required:true},
        booke_id:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"booke",
            required:true,
        },],
        
    },
    {
        versionKey: false,
        timestamps: true,
      }
);
const Section=mongoose.model("section",sectionSchema);


const checkoutSchema = new mongoose.Schema(
    {
    body: { type: String, required: true },
    // book_id:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"booke",
    //     required:true,
    // },
    user_id:
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"user",
                required:true,
            },

    

}
);
const Checkout=mongoose.model("checkout",checkoutSchema);

const userSchema = new mongoose.Schema(
    {
      first_name: { type: String, required: true },
      last_name: { type: String, required: false },
      email: { type: String, required: true, unique: true },
      gender: { type: String, required: false, default: "male" },
      age: { type: Number, required: true },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );
  
  const User = mongoose.model("user", userSchema); // users
  
const app=express();
app.use(express.json());




  app.post("/users",async(req,res)=>{
    try {
        const user = await User.create(req.body);
    
        return res.status(201).send(user);
      } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
      }
});
app.get("/users",async(re,res)=>{
    const users=await User.find().lean().exec();
    res.send({users})
});
///posting author
app.post("/author",async(req,res)=>{
    try{
        const author=await Author.create(req.body);
        return res.status(201).send(author)
    }
    catch(e){
        return res.status(500).json({message:e.message,status:"Failed"}
        )
    }
});
/////getting authours
app.get("/author",async(req,res)=>{
    try{
        const author=await Author.find().lean().exec();
        return res.status(200).send(author)
    }
    catch(e){
        return res.status(500).json({message:e.message,status:"Failed"}
        )
    }
});
///getting one aauthour
// app.get("/author/:id",async(req,res)=>{
//     try{
//         const author=await Author.findById(req.params.id).lean().exec();
//         return res.status(200).send(author)
//     }
//     catch(e){
//         return res.status(500).json({message:e.message,status:"Failed"}
//         )
//     }
// });
///updating  one author
app.patch("/author/:id",async(req,res)=>{
    try{
        const author=await Author.findById(req.params.id,req.body,{new:true});
        return res.status(200).send(author)
    }
    catch(e){
        return res.status(500).json({message:e.message,status:"Failed"}
        )
    }
});
///delating authour
app.delete("/author/:id",async(req,res)=>{
    try{
        const author=await Author.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send(author)
    }
    catch(e){
        return res.status(500).json({message:e.message,status:"Failed"}
        )
    }
});
///posting book
app.post("/booke",async(req,res)=>{
    try{
        const booke=await Booke.create(req.body);
        return res.status(201).send(booke)
    }
    catch(e){
        return res.status(500).json({message:e.message,status:"Failed"}
        )
    }
});

//posting books into section
app.post("/section",async(req,res)=>{
    try{
        const section =await Section.create(req.body);
        return res.status(201).send(section)
    }
    catch(e){
        return res.status(500).json({message:e.message,status:"Failed"}
        )
    }
});








app.post("/section",async (req, res) => {
    try {
        const section= await Section.create(req.body);
        return res.status(201).send(section);
    } catch (e) {
        return res.status(500).json({message:e.message});
    }
})
app.post("/checkout",async (req, res) => {
    try {
        const section= await Checkout.create(req.body);
        return res.status(201).send(checkout);
    } catch (e) {
        return res.status(500).json({message:e.message});
    }
})
////////books written by author
app.get("/:id/books",async(req,res)=>{
    try{
        const authors=await Author.findById(req.params.id).lean().exec();
        const bookes =await Booke.find({author_id:authors._id}).populate("author_id").lean().exec();
        return res.status(200).send(bookes)
    }
    catch(e){
        return res.status(500).json({message:e.message,status:"Failed"}
        )
    }
});
///ok but reataning full object


///// find book in section
app.get("/sections/:id/booke",async(req,res)=>{
    try{
        const sections =await Section.findById(req.params.id).lean().exec();
        const booke=await Booke.find({sections_id:sections._id}).populate("section_id").lean().exec();
        
        //console.log(bookes)
        return res.status(200).send({booke,sections})
    }
    catch(e){
        return res.status(500).json({message:e.message,status:"Failed"}
        )
    }
});
////book in section not checkout
app.get("/sections/:id/bookes",async(req,res)=>{
    try{
        const sections =await Section.findById(req.params.id).lean().exec();
        const booke=await Booke.find({sections_id:sections._id}).lean().exec();
        const checkout= await Checkout.find({checkout})
        //console.log(bookes)
        return res.status(200).send({booke,sections})
    }
    catch(e){
        return res.status(500).json({message:e.message,status:"Failed"}
        )
    }
});
///book of one authour
app.get("/oneauthor",async(req,res)=>{
    try{
        
        const bookes =await Booke.find({author_id:{$size:1}}).lean().exec();
        return res.status(200).send(bookes)
    }
    catch(e){
        return res.status(500).json({message:e.message,status:"Failed"}
        )
    }
});





const connect =()=>{
    return mongoose.connect(" mongodb://127.0.0.1:27017/book")
}
app.listen(2400,async function(){
    await connect();
    console.log("listening on port 2400")
});



