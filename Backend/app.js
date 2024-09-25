const express = require("express");
const path = require("path");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4 } = require('uuid');
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();
app.use(express.json())

const dbPath = path.join(__dirname, "todos.db");
let db = null;

const SECRET_KEY = "JWT_TOKEN";

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

const authenticateToken = (request, response, next) => {
  const authHeader = request.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return response.status(401).send('Invalid JWT Token')

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return response.status(401).send('Invalid JWT Token')
    request.user = user
    next()
  })
}

// Sign in route
app.post('/users/signin/', async (request, response) => {  // Updated path from '/signin/' to '/users/signin/'
  const {username, password} = request.body

  const userExistsQuery = 'SELECT * FROM users WHERE username = ?'
  const userExists = await db.get(userExistsQuery, [username])

  if (userExists) {
    return response.status(400).send('User already exists')
  }

  if (password.length < 6) {
    return response.status(400).send('Password is too short')
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const createUserQuery = `
    INSERT INTO users (id, username, password) 
    VALUES (?, ?, ?)`
  await db.run(createUserQuery, [v4(), username, hashedPassword])

  response.send('User created successfully')
})

// Login route
app.post('/users/login/', async (request, response) => {  // Updated path from '/login/' to '/users/login/'
  const {username, password} = request.body

  const userQuery = 'SELECT * FROM users WHERE username = ?'
  const user = await db.get(userQuery, [username])

  if (!user) {
    return response.status(400).send('Invalid user')
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    return response.status(400).send('Invalid password')
  }

  const token = jwt.sign({id: user.id}, SECRET_KEY)
  response.send({jwtToken: token})
})

app.get('/todos/:id', authenticateToken, async (request, response) => {  // Updated path from '/todos/:id' to '/tasks/:id'
  const {id} = request.params
  const todoQuery = `
    SELECT * 
    FROM tasks 
    JOIN users ON tasks.user_id = users.id
    WHERE tasks.user_id = ?`
  
  const resData = await db.all(todoQuery, [id])
  response.send(resData)
})

app.post('/todos/:id', authenticateToken, async (request, response) => {  // Updated path from '/todos/add-todo/:id' to '/tasks/add/:id'
  const {id,title, description, date} = request.body
  const userId = request.user.id

  const todoQuery = `
    INSERT INTO tasks (id, user_id, title, description, due_date)
    VALUES (?, ?, ?, ?, ?)`
  await db.run(todoQuery, [id, userId, title, description, date])

  response.send("Todo Added Successfully")
})


app.delete('/todos/:id/', authenticateToken, async (request, response) => {  // Updated path from '/todos/:id/' to '/tasks/:id/'
  const {id} = request.params
  const userId = request.user.id

  const todoQuery = `
    SELECT * FROM tasks WHERE id = ? AND user_id = ?`
  
  const redData = await db.get(todoQuery, [id, userId])

  if (!redData) {
    return response.status(401).send('Invalid Request')
  }

  const deleteTaskQuery = `
    DELETE FROM tasks WHERE id = ?`
  
  await db.run(deleteTaskQuery, [id])
  response.send('Todo Removed')
})


app.put('/todos/:id', authenticateToken, async (request, response) => {  // Updated path from '/todos/:id' to '/tasks/:id'
  const { title, description, date } = request.body; 
  const userId = request.user.id
  const {id} = request.params

  const sql = `
    UPDATE tasks 
    SET title = ?, description = ?, due_date = ? 
    WHERE id = ? AND user_id = ?`
  
  await db.run(sql, [title, description, date, id, userId])
  response.send("Updated Successfully")
});

app.put('/users/:id', authenticateToken, async (request, response) => {
  const { name, email, password } = request.body;
  const { id } = request.params;

  const hashedPassword = await bcrypt.hash(password, 10)

  const sql = `
    UPDATE users 
    SET name = ?, email = ?, password = ? 
    WHERE id = ?`
  
  await db.run(sql, [name, email, hashedPassword, id])
  response.send("User Updated Successfully")
});