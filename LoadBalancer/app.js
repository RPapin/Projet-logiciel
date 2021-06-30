const express = require('express');
const axios = require('axios');
const cors  = require('cors')
const port = 3000
const servers = [];

const getTargetServer = () => {
    // Higher health mean lowest performance
    if(servers.length > 0)
    {
        let targetServer = servers.map(v => v).sort((a, b) => a.health - b.health)[0]
        console.log(`[TARGET] ${targetServer.serviceName}`)

        return targetServer;
    }
    return undefined
}

const handlerGET = async (req, res) => {
    try {
        // Higher health mean lowest performance
        const targetServer = getTargetServer()

        let config = {
          headers: {
              authorization: req.headers.authorization
          }
        }

        const resp = await axios.get(`http://${targetServer.serviceName}:${targetServer.servicePort}${req.url}`, config)
        res.json(resp.data)
    } catch (e){
        console.log("[ERROR] GET :"+e)
    }
};

const handlerPOST = async (req, res) => {
    try {
        // Higher health mean lowest performance
        const targetServer = getTargetServer()
        authorization=""
        if(req.headers.authorization !== undefined)
        {
            authorization = req.headers.authorization
        }

        let config = {
          headers: {
              authorization: authorization
          }
        }

        const resp = await axios.post(`http://${targetServer.serviceName}:${targetServer.servicePort}${req.url}`, req.body, config)
        res.json(resp.data)
    } catch (e){
        console.log("[ERROR] POST :"+e)
    }
};

const handlerDELETE = async (req, res) => {
    try {
        // Higher health mean lowest performance
        const targetServer = getTargetServer()

        let config = {
          headers: {
              authorization: req.headers.authorization
          }
        }

        const resp = await axios.delete(`http://${targetServer.serviceName}:${targetServer.servicePort}${req.url}`, req.body, config)
        res.json(resp.data)
    } catch (e){
        console.log("[ERROR] DELETE :"+e)
    }
};

const register = (req, res) => {
    servers.push(req.body)
    console.log("[Register] "+req.body.serviceName+":"+req.body.servicePort)
    res.end()
}

const server = express()
server.use(cors())
server.use(express.json()).get(/^\/api\/.+$/, handlerGET).post(/^\/api\/.+$/, handlerPOST).delete(/^\/api\/.+$/, handlerDELETE).post('/register', register);
server.listen(port)

setInterval(async () => {
    try{
        servers.forEach( (service, index) => {
            sendTimestamp=Date.now()
            axios.get(service.healthPoint, {proxy: { host: service.serviceName, port: service.servicePort}}).then(({data}) => {
                receptionTimestamp=Date.now()
                servers[index].health = data.health+(receptionTimestamp-sendTimestamp)
                // console.log(`${service.serviceName}: ${data.health} health`)
            }).catch(error => {
                if(servers.length > 0 && typeof servers[index] !== 'undefined')
                {
                    console.log(`[REMOVE] server : ${servers[index].serviceName}:${servers[index].servicePort}`)
                    servers.splice(index,1)
                }
            })
        })
    } catch(e) {
        console.log("[ERROR] "+e)
    }
}, 5000)
