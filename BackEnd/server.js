const express  = require('express');
const path = require('path');

const PORT = 8888;
const app = express();

app.use(express.static(path.join(__dirname, '../FrontEnd')));

app.get("/", (req, res) => {
   res.sendFile(path.join(__dirname, "../FrontEnd", 'index.html'));
});

app.get("/future", (req, res) => {
    res.sendFile(path.join(__dirname, "../FrontEnd", "FuturePage.html"))
});

app.get((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "..FrontEnd", "404Page.html"));
})

app.listen(PORT, () => {
    console.log(`Server Listining on ${PORT}`);
    
})

