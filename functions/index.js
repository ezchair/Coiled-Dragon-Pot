const functions = require("firebase-functions")
const { server } = require("./server")

const fireServer = functions.https.onRequest(server);

module.exports={
  fireServer
}   
