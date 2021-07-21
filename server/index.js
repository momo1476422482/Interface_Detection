// dependencies
const cors = require("cors");
const express = require("express");
const { PythonShell } = require("python-shell");
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const path = require("path");

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
  res.send("Interface Detection API works !");
});

app.get("/video-output.mp4", function (req, res) {
  res.sendFile(path.join(__dirname, "output.mp4"));
});

app.post("/startDetection", upload.single("file"), (req, res) => {
  var file = req.file;
  var isVideo = req.query.isVideo === "true";

  if (file.size != 0) {
    let options = {
      mode: "text",
      pythonOptions: ["-u"],
      scriptPath: "",
      args: [file.filename],
    };

    const script = isVideo
      ? "efficientdet_test_videos.py"
      : "efficientdet_test.py";

    PythonShell.run(
      `../../Yet-Another-EfficientDet-Pytorch/${script}`,
      options,
      function (err, result) {
        console.log("The script work has been finished");
        if (err) {
          console.log(err);
          res.status(500).send({ error: err });
          return;
        }
        res.status(200).send({
          path: isVideo ? "video-output.mp4" : `public/${file.filename}.jpg`,
          result: (result && result[0]) || "{}",
        });
      }
    );
  }
});

// start server
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
