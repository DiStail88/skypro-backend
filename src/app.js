const http = require('http');
const url = require('url');
const getUsers = require('./modules/users')


const server = http.createServer((request, response) =>  {
    const parsedUrl = url.parse(request.url, true);
    const query = parsedUrl.query;
    
    if ('hello' in query) {
        const name = query.hello;
        
        if (!name || name.trim() === '') {
            response.statusCode = 400;
            response.setHeader('Content-Type', 'text/plain');
            response.end('Enter a name');
            return;
        }

        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/plain');
        response.end(`Hello, ${name}.`);
        return;
    }

    if ('users' in query) {
        try {
            const usersData = getUsers();
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.end(usersData);
            return;
        } catch (error) {
            response.statusCode = 500;
            response.end();
            return;
        }
    }

    if (Object.keys(query).length === 0) {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/plain');
        response.end('Hello, World!');
        return;
    }

    response.statusCode = 500;
    response.end();

});

server.listen(3000, () => {
    console.log("Сервер запущен по адресу http://127.0.0.1:3003");
})