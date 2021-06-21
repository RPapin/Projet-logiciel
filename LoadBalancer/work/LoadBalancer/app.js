const express = require('express');
const axios = require('axios');
const port = 3000
const servers = [];

const handler = async (req, res) => {
    try {
        const targetServer = servers.map(v => v).sort((a, b) => a.nbReq - b.nbReq)[0].serviceName
        console.log(`[TARGET] ${targetServer}`)
        const resp = await axios.get(req.url.split('/api')[1], { proxy: { host: targetServer, port }})
        res.json(resp.data)
    } catch (e){
        console.log(e)
    }
};

const register = (req, res) => {
    servers.push(req.body)
    res.end()
}

const server = express().use(express.json()).get(/^\/api\/.+$/, handler).post(/^\/api\/.+$/, handler).post('/register', register);
server.listen(port)

setInterval(async () => {
    servers.forEach( (service, index) => {
        axios.get(service.healthPoint, {proxy: { host: service.serviceName, port}}).then(({data}) => {
            servers[index].nbReq = data.nbReq
            console.log(`${service.serviceName}: ${data.nbReq} nbReq`)
        })
    })
}, 5000)