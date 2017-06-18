const
    staticFileServer = require("node-static"),
    express = require("express"),

    fileHandler = new staticFileServer.Server("./static"),
    app = express();

app.set('view engine', 'ejs');

app.get("/", function(req, res) {
    res.render("home");
});

app.get("*", function(req, res) {
    fileHandler.serve(req, res);
});

app.listen(3000);
console.log("Application running on 3000");