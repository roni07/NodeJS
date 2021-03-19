const course = require('./routes/course');
const logger = require("./logger");
const express = require("express");
const app = express();

app.use(express.json());

app.use('/api/course', course);

// Custom Middleware Function
app.use(logger);

app.use((req, res, next) => {
   console.log("Authenticating.....");
   next();
});

app.get("/", (req, res) => {
    res.send("hello world");
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));