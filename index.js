import  express  from "express";

const app = express();

app.use(express.json());

const PORT = 5000;

const students = [];

app.get('/health', (req, res) => {
    res.json({ status: 'All good!, All set'});
});

app.get('/students', (req, res) => {

  res.json({
    success:true,
    data: students,
    message: 'Successfully fetched all students',
  })
});

app.post('/student', (req, res) => {
  const {name,age,moblie,email} = req.body;
  const id = Math.floor(Math.random() * 100000) + 1;

  const newStudent = {
    'id': id,
    'name': name,
    'age': age,
    'moblie': moblie,
    'email': email,
  }

  students.push(newStudent);

  res.json({
    success: true,
    data: newStudent,
    message: 'Successfully added new student',
  })
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});