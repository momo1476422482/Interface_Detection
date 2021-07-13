
const express = require('express')

//Import PythonShell module.
const {PythonShell} =require('python-shell');

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/testApi', (req, res) => {
  let options = {
    mode: 'text',
    pythonOptions: ['-u'], // get print results in real-time
      scriptPath: '', //If you are having python_test.py script in same folder, then it's optional.
    args: [''] //An argument which can be accessed in the script using sys.argv[1]
  };
  
  PythonShell.run('test.py', options, function (err, result){
      if (err) throw err;
      // result is an array consisting of messages collected 
      //during execution of script.
      console.log('result: ', result.toString());
      res.send(result.toString())
  });
  
})

app.get('/testApi2', (req, res) => {

//Here are the option object in which arguments can be passed for the python_test.js.
let options = {
  mode: 'text',
  pythonOptions: ['-u'], // get print results in real-time
    scriptPath: '', //If you are having python_test.py script in same folder, then it's optional.
  args: [''] //An argument which can be accessed in the script using sys.argv[1]
};

PythonShell.run('test2.py', options, function (err, result){
    if (err) throw err;
    // result is an array consisting of messages collected 
    //during execution of script.
    console.log('result: ', result.toString());
    res.send(result.toString())
});

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