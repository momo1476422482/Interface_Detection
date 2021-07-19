const express = require('express')

//Import PythonShell module.
const {PythonShell} = require('python-shell');
const fs = require('fs')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


// Swagger for API (in construction)
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require("./swagger.json");

// For automatic documentation 
const swaggerJsdoc = require('swagger-jsdoc');
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Hello World',
            version: '1.0.0',
        },
    },
    apis: ['./index.js'], // files containing annotations as above
};
//const openapiSpecification = swaggerJsdoc(options);



const app = express()
const port = 3000

// Url to swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/testUploadFile', upload.single('file'), function(req,res,next)
{
  // req.file == file
  var file = req.file;
  if (file.size != 0)
  {
    try{
      console.log(`Size : ${file.size}`);
      console.log(`Filename : ${file.filename}`);
      console.log(`Path : ${file.path}`);

      let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: '', //If you are having python_test.py script in same folder, then it's optional.
        args: [file.path] //An argument which can be accessed in the script using sys.argv[1]
    };

    PythonShell.run('testFile.py', options, function(err, result) {
        if (err) throw err;
        // result is an array consisting of messages collected 
        //during execution of script.
        if (result != null)
        {
          console.log('result: ', result.toString());
          res.send(result.toString())
        }        
    });

    }
    catch(err)
    {
      console.error(err);
    }
    finally
    {
      // On supprime le fichier uploadé
     // fs.unlinkSync(file.path);
    }

  }

  res.sendStatus(202);
})

app.post('/testUploadFiles', upload.array('files'), function (req, res, next) {
  // req.files is array of files
  // req.body will contain the text fields, if there were any
// req.file == file
var files = req.files;
console.log("Nombres de fichier : " + files.length);

files.forEach(file => {
  if (file.size != 0)
  {
    try{
      console.log(`Size : ${file.size}`);
      console.log(`Filename : ${file.filename}`);
      console.log(`Path : ${file.path}`);

      let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: '', //If you are having python_test.py script in same folder, then it's optional.
        args: [file.path] //An argument which can be accessed in the script using sys.argv[1]
    };

    PythonShell.run('testFile.py', options, function(err, result) {
        if (err) throw err;
        // result is an array consisting of messages collected 
        //during execution of script.
        if (result != null)
        {
          console.log('result: ', result.toString());
          //res.send(result.toString())
        }        
    });
  }
    catch(err)
    {
      console.error(err);
    }
    finally
    {
      // On supprime le fichier uploadé
      //fs.unlinkSync(file.path);
    }
  
  }
})

res.sendStatus(202);

})

app.get('/testApi', (req, res) => {
    let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: '', //If you are having python_test.py script in same folder, then it's optional.
        args: [''] //An argument which can be accessed in the script using sys.argv[1]
    };

    PythonShell.run('test.py', options, function(err, result) {
        if (err) throw err;
        // result is an array consisting of messages collected 
        //during execution of script.
        console.log('result: ', result.toString());
        res.send(result.toString())
    });

})


app.get('/testApiParam/:url', (req, res) => {
    let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: '', //If you are having python_test.py script in same folder, then it's optional.
        args: [''] //An argument which can be accessed in the script using sys.argv[1]
    };
    var url = req.params.url;
    try {
        if (fs.existsSync(url)) {

            PythonShell.run(url, options, function(err, result) {
                if (err) throw err;
                // result is an array consisting of messages collected 
                //during execution of script.
                if (result != null) {
                    console.log('result: ', result.toString());
                    res.send(result.toString())
                }
                res.sendStatus(204);
            });
        } else {
            console.error(`file ${url} not exist`);
            res.status(400).send(`file ${url} not exist`)
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
})

app.get('/testApi3', (req, res) => {

  //Here are the option object in which arguments can be passed for the python_test.js.
  let options = {
    mode: 'text',
    pythonOptions: ['-u'], // get print results in real-time
      scriptPath: '', //If you are having python_test.py script in same folder, then it's optional.
    args: [''] //An argument which can be accessed in the script using sys.argv[1]
  };
  
  PythonShell.run('Yet-Another-EfficientDet-Pytorch-master/efficientdet_test.py', options, function (err, result){
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


app.get('/testApi2', (req, res) => {

    //Here are the option object in which arguments can be passed for the python_test.js.
    let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: '', //If you are having python_test.py script in same folder, then it's optional.
        args: [''] //An argument which can be accessed in the script using sys.argv[1]
    };

    PythonShell.run('test2.py', options, function(err, result) {
        if (err) throw err;
        // result is an array consisting of messages collected 
        //during execution of script.
        console.log('result: ', result.toString());
        res.send(result.toString())
    });

})