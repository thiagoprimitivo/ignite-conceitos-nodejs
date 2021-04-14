const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

const users = [];

function checkExistsUserAccount(request, response, next) {
    
}

app.use(cors());
app.use(express.json());

app.post('/users', (request, response) => {
    const { name, username } = request.body;

    const userAlreadyExists = users.some((user) => user.username === username);

    if (userAlreadyExists) {
        return response.status(400).json({ error: 'User already exists!' });
    }

    users.push({
        id: uuidv4(),
        name,
        username,
        todos: []
    });

    return response.status(201).send();
});

app.get('/todos', checkExistsUserAccount, (request, response) => {

});

app.post('/todos', checkExistsUserAccount, (request, response) => {

});

app.put('/todos/:id', checkExistsUserAccount, (request, response) => {

});

app.listen(3333);