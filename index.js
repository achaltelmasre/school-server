import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Student from './src/models/student.js';

const app = express();

app.use(express.json());

const PORT = 5000;

const connectMongoDB = async () =>{
   const conn = await mongoose.connect(process.env.MONGODB_URI)
    if (conn) {
       console.log('MongoDB connected successfully');   
    }
};
connectMongoDB();

app.get('/health', (req,res) =>{
    res.json({status: 'All good , All set'});
});

app.get('/students', async (req, res) =>{

    const students = await Student.find()

    res.json({
       success: true,
       data: students,
       massage: 'successfully fetched all students',
    })
});

app.post('/student', async (req, res) =>{
    const {name, age, mobile,email} = req.body;

    if (!name) {
      return res.json({
            success:false,
            message: 'Name is required',
        })
    }

    if (!name) {
        return res.json({
              success:false,
              message: 'Name is required',
          })
      }

      if (!age) {
        return res.json({
              success:false,
              message: 'Age is required',
          })
      }

      if (!mobile) {
        return res.json({
              success:false,
              message: 'Mobile is required',
          })
      }

      if (!email) {
        return res.json({
              success:false,
              message: 'Email is required',
          })
      }

   const stud = new Student({
     name:name,
     age:age,
     mobile: mobile,
     email:email,
   });

   const savedStudent = await stud.save();

    res.json({
        success: true,
        data:savedStudent,
        message: 'Successfully added new student',
    })
});

//Get Student
app.get('/student', async (req, res) => {
   const {email} = req.query;
   
   const student = await Student.findOne({email:email});

   res.json({
    success:true,
    data:student,
    message: 'Successfully fetched student',
   })
});


app.listen(PORT, () =>{
    console.log(` Server running on port ${PORT}`);
});
