// dependencies
const cors = require("cors");
const express = require("express");
const { PythonShell } = require("python-shell");
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// config
const app = express();
const port = 3000;
app.use(cors());
app.options("*", cors());

app.use(
  "/public",
  express.static("../../Yet-Another-EfficientDet-Pytorch/test")
);

// routes

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/startDetectionImage", upload.single("file"), (req, res) => {
  var file = req.file;
  if (file.size != 0) {
    let options = {
      mode: "text",
      pythonOptions: ["-u"], // get print results in real-time
      scriptPath: "", //If you are having python_test.py script in same folder, then it's optional.
      args: [file.path], //An argument which can be accessed in the script using sys.argv[1]
    };

    PythonShell.run(
      "../../Yet-Another-EfficientDet-Pytorch/efficientdet_test.py",
      options,
      function (err, result) {
        console.log("The script work has been finished");
        if (err) {
          res.status(500).send({
            error: err,
          });
          console.log(err);
          return;
        }
        // let obj = fs.readFileSync("Path/to/file", "utf8");
        // console.log(obj); // (**)
        res.status(200).send({
          path: "public/result.jpg",
        });
      }
    );
  }
});

app.post("/testUploadFiles", upload.array("files"), function (req, res, next) {
  // req.files is array of files
  // req.body will contain the text fields, if there were any
  // req.file == file
  var files = req.files;
  console.log("Nombres de fichier : " + files.length);

  files.forEach((file) => {
    if (file.size != 0) {
      try {
        console.log(`Size : ${file.size}`);
        console.log(`Filename : ${file.filename}`);
        console.log(`Path : ${file.path}`);

        let options = {
          mode: "text",
          pythonOptions: ["-u"], // get print results in real-time
          scriptPath: "", //If you are having python_test.py script in same folder, then it's optional.
          args: [file.path], //An argument which can be accessed in the script using sys.argv[1]
        };

        PythonShell.run("testFile.py", options, function (err, result) {
          if (err) throw err;
          // result is an array consisting of messages collected
          //during execution of script.
          if (result != null) {
            console.log("result: ", result.toString());
            //res.send(result.toString())
          }
        });
      } catch (err) {
        console.error(err);
      } finally {
        // On supprime le fichier uploadé
        //fs.unlinkSync(file.path);
      }
    }
  });

  res.sendStatus(202);
});

app.get("/testApi", (req, res) => {
  let options = {
    mode: "text",
    pythonOptions: ["-u"], // get print results in real-time
    scriptPath: "", //If you are having python_test.py script in same folder, then it's optional.
    args: [""], //An argument which can be accessed in the script using sys.argv[1]
  };

  PythonShell.run("test.py", options, function (err, result) {
    if (err) throw err;
    // result is an array consisting of messages collected
    //during execution of script.
    console.log("result: ", result.toString());
    res.send(result.toString());
  });
});

app.get("/testApiParam/:url", (req, res) => {
  let options = {
    mode: "text",
    pythonOptions: ["-u"], // get print results in real-time
    scriptPath: "", //If you are having python_test.py script in same folder, then it's optional.
    args: [""], //An argument which can be accessed in the script using sys.argv[1]
  };
  var url = req.params.url;
  try {
    if (fs.existsSync(url)) {
      PythonShell.run(url, options, function (err, result) {
        if (err) throw err;
        // result is an array consisting of messages collected
        //during execution of script.
        if (result != null) {
          console.log("result: ", result.toString());
          res.send(result.toString());
        }
        res.sendStatus(204);
      });
    } else {
      console.error(`file ${url} not exist`);
      res.status(400).send(`file ${url} not exist`);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get("/testApi3", (req, res) => {
  //Here are the option object in which arguments can be passed for the python_test.js.
  let options = {
    mode: "text",
    pythonOptions: ["-u"], // get print results in real-time
    scriptPath: "", //If you are having python_test.py script in same folder, then it's optional.
    args: [""], //An argument which can be accessed in the script using sys.argv[1]
  };

  PythonShell.run(
    "Yet-Another-EfficientDet-Pytorch-master/efficientdet_test.py",
    options,
    function (err, result) {
      if (err) throw err;
      // result is an array consisting of messages collected
      //during execution of script.
      console.log("result: ", result.toString());
      res.send(result.toString());
    }
  );
});

app.get("/testApi2", (req, res) => {
  //Here are the option object in which arguments can be passed for the python_test.js.
  let options = {
    mode: "text",
    pythonOptions: ["-u"], // get print results in real-time
    scriptPath: "", //If you are having python_test.py script in same folder, then it's optional.
    args: [""], //An argument which can be accessed in the script using sys.argv[1]
  };

  PythonShell.run("test2.py", options, function (err, result) {
    if (err) throw err;
    // result is an array consisting of messages collected
    //during execution of script.
    console.log("result: ", result.toString());
    res.send(result.toString());
  });
});

// start server
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
