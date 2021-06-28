const express = require('express');
const axios = require('axios');
const port = 3000
const servers = [];

const handler = async (req, res) => {
    try {
        // Higher health mean lowest performance
        const targetServer = servers.map(v => v).sort((a, b) => a.health - b.health)[0]
        console.log(`[TARGET] ${targetServer.serviceName}`)
        const resp = await axios.get(req.url.split('/api')[1], { proxy: { host: targetServer.serviceName, port: targetServer.servicePort }})
        res.json(resp.data)
    } catch (e){
        console.log(e)
    }
};

const register = (req, res) => {
    servers.push(req.body)
    console.log("[Register] "+req.body.serviceName+":"+req.body.servicePort)
    res.end()
}

const server = express().use(express.json()).get(/^\/api\/.+$/, handler).post(/^\/api\/.+$/, handler).post('/register', register);
server.listen(port)

setInterval(async () => {
    try{
        servers.forEach( (service, index) => {
            sendTimestamp=Date.now()
            axios.get(service.healthPoint, {proxy: { host: service.serviceName, port: service.servicePort}}).then(({data}) => {
                receptionTimestamp=Date.now()
                servers[index].health = data.health+(receptionTimestamp-sendTimestamp)
                console.log(`${service.serviceName}: ${data.health} health`)
            }).catch(error => {
                if(servers.length > 0 && typeof servers[index] === 'undefined')
                {
                    console.log(`Remove server : ${servers[index].serviceName}:${servers[index].servicePort}`)
                    servers.remove(index)
                }
            })
        })
    } catch(e) {
        console.log("[ERROR] "+e)
    }
}, 5000)