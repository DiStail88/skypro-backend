const http = require('http');
const url = require('url');
const getUsers = require('./modules/users');

const PORT = 3003;

const server = http.createServer((request, response) => {
    const parsedUrl = url.parse(request.url, true);
    const query = parsedUrl.query;
    

    if (Object.keys(query).length === 0) {
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.end('Hello, World!');
        return;
    }

    if ('hello' in query) {
        const name = query.hello;
        
        if (!name || name.trim() === '') {
            response.writeHead(400, { 'Content-Type': 'text/plain' });
            response.end('Enter a name');
            return;
        }

        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.end(`Hello, ${name}.`);
        return;
    }
 
    if ('users' in query) {
        try {
            const usersData = getUsers();
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(usersData);
            return;
        } catch (error) {
            response.writeHead(500);
            response.end();
            return;
        }
    }

    response.writeHead(500);
    response.end();
});

server.listen(PORT, () => {
    console.log(`Сервер запущен по адресу http://127.0.0.1:${PORT}`);
});