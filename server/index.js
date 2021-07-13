
const express = require('express')
const { resolve } = require('path')
const { isNullOrUndefined } = require('util')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/testApi', (req, res) => {
  callPython("test.py", res, "");
})

app.get('/testApi2', (req, res) => {
  callPython("test2.py", res, "");
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

 function callPython(filename, res, param) {
  var spawn = require("child_process").spawn;

  console.log("Fichier : " + filename)
  console.log("Parametres : " + param)

  var process = spawn('python', ["./" + filename,
    param]);

  var dataToReturn;

  process.stdout.on('data', function (data) {
    console.log("retour : " + data.toString());
    dataToReturn = data.toString();
  })

  process.on("close", (code) =>{
    console.log("close");
    res.send(dataToReturn);
  })
}