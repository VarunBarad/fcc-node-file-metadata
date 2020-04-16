const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({optionSuccessStatus: 200})); // some legacy browsers choke on 204

app.use(bodyParser.urlencoded({extended: true}));

const upload = multer({storage: multer.memoryStorage()});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

app.post('/api/fileanalyse', upload.single('upfile'), function (request, response) {
    response.json({
        name: request.file.originalname,
        type: request.file.mimetype,
        size: request.file.size
    });
});

const listener = app.listen(process.env.PORT || 5000, () => {
    console.log(`Your app is listening on port ${listener.address().port}`);
});
