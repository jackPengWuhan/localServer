const http = require('http')
const url = require('url')
const fs = require('fs');
const port = 3000

const router = {
    update: function (req, res) {
        let postData = ''
        req.on('data', (chunk) => {
            postData += chunk;
        })
        req.on('end', () => {
            fs.writeFile('./file.txt', postData, (err) => {
                if (err) {
                    throw err;
                }
                let json = { status: true, msg: 'update success' }
                res.write(JSON.stringify(json));
                res.end()

            })

        })


    },
    test: function (req, res) {
        res.write('test');
        res.end()
    }
};

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain;charset=utf-8')
    if (req.url !== '/favicon.ico') {
        var pathName = url.parse(req.url).pathname.replace(/\//, '')
        console.log(pathName);
        try {
            router[pathName](req, res)
        } catch (err) {
            router['test'](req, res)
        }
    }



})

server.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}/`)
})