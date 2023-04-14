const express = require("express");
const app = express();
const cors = require("cors")
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const URL = "mongodb://localhost:3000";

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000"
}))

let students = []

app.get("/students", async function(req, res){

    try {
        const connection = await mongoClient.connect(URL)
        const db = connection.db("students");
        let student = await db.collection("student").find().toArray()
        await connection.close()
        res.json(student)
    } catch (error) {
        console.log(error)
    }

    // res.json(students);
});

// app.get("/teachers", function(req, res){
//     res.json([
//         {
//             name : "John",
//             age : "30",
//         }
//     ])
// })

app.post("/student", async function (req, res){

    try {
        const connection = await mongoClient.connect(URL)
   const db = connection.db("students");
   await db.collection("student").insertOne(req.body);
    await connection.close();
    res.json({
        message: "Student Added Successfully"
    })
    } catch (error) {
       console.log(error) 
    }
   

//    req.body.id = students.length + 1;
//     students.push(req.body);
//     res.json({
//         message: "Student Added Successfully",
//     });
})

app.get("/student/:id",async function(req,res){

    try {
        const connection = await mongoClient.connect(URL)
        const db = connection.db("students");
       let student = await db.collection("student").findOne({_id:mongodb.ObjectId(req.params.id)})
       await connection.close()
       res.json(student)
    } catch (error) {
        console.log(error) 
    }

    // const id = req.params.id;
    // console.log(id)
    // const student = students.find((studend) => student.id == id);
    // console.log(student);
    // res.json(student);
})

app.put("/student/:id",async function(req,res){
    try {
        const connection = await mongoClient.connect(URL)
        const db = connection.db("students");
       let student = await db.collection("student").updateOne({_id:mongodb.ObjectId(req.params.id)},{$set:req.body})
       await connection.close()
       res.json({message : "Student updated successfully"})
    } catch (error) {
        console.log(error) 
    }

    // const id = req.params.id;
    // const studentindex = students.findIndex((studend) => student.id == id);
    // students[studentindex].email = req.body.email;
    // students[studentindex].password = req.body.password;
    // res.json({message : "updated successfully"})
})

app.delete("/student/:id", async function(req,res){

    try {
        const connection = await mongoClient.connect(URL)
        const db = connection.db("students");
       let student = await db.collection("student").deleteOne({_id:mongodb.ObjectId(req.params.id)})
       await connection.close()
       res.json({message : "deleted successfully"})
    } catch (error) {
        console.log(error) 
    }
    
    // const id = req.params.id;
    // const studentindex = students.findIndex((studend) => student.id == id);
    // students.splice(studentindex,1);
    // res.json({message : "deleted successfully"})
})

app.listen(3001);