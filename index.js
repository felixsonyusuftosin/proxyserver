// index.js

/**
 * Required External Modules
 */

require('dotenv').config()
const express = require("express")
const path = require("path")
const fetch = require("node-fetch")
const cors = require('cors')
const umsUrl = process.env.UMSURL
const bksUrl = process.env.BKSURL

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000"
const getAuth = (req) => req.headers["x-access-token"] || req.headers["Authorization"] || req.headers["authorization"]

/**
 *  App Configuration
 */
app.use(cors())

/**
 * Routes Definitions
 */
app.get("/users", (req, res) => {
  const Authorization = getAuth(req)
  try { 
    fetch(`${umsUrl}/users`, { headers: { Authorization}})
    .then((resp) => {
        const { status } = resp
        resp.json()
          .then(data => res.status(status).json(data))
          .catch(err => {
            res.status(status).json(err)
          })
    }).catch(err => {
          res.status(500).json(err)
    })

  } catch(err) { 
    res.status(500).json(err)
  }
});
/**
 * Server Activation
 */
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`)
});