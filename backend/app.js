const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

const users = []

app.post("/users", (req, res) => {
  const { name, email } = req.body

  if (!name || !email) {
    message = "Campos obrigatórios não foram preenchidos."
    console.log(message)
    return res.status(400).json({ message })
  }

  if (users.find(user => user.email.toLowerCase() === email.toLowerCase())) {
    message = "E-mail já cadastrado."
    console.log(message)
    return res.status(409).json({ message: "E-mail já cadastrado." })
  }

  const user = {
    name,
    email
  }

  users.push(user)

  res.status(201).json({
    message: 'Usuário cadastrado com sucesso!',
    usuario: user
  });
})

app.get("/users", (req, res) => {
  res.status(200).json(users)
})

app.listen(3000, () => {
  console.log("server up")
})