const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

const users = [];

function checkExistsUserAccount(request, response, next) {
    const { username } = request.headers;

    const user = users.find((user) => user.username === username);

    if (!user) {
        return response.status(400).json({ error: 'User not found' });
    }

    request.user = user;

    return next();
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
    const { user } = request;

    return response.json(user.todos);
});

app.post('/todos', checkExistsUserAccount, (request, response) => {
    const { title, deadline } = request.body;
    const { user } = request;

    const todo = {
        id: uuidv4(),
        title,
        done: false,
        deadline: new Date(deadline),
        created_at: new Date()
    }

    user.todos.push(todo);

    return response.status(201).send();
});

app.put('/todos/:id', checkExistsUserAccount, (request, response) => {

});

app.listen(3333);