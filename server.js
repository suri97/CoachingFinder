/**
 * Created by suransh on 26/10/16.
 */

const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const database = require('./database');

app.use(bodyparser.urlencoded());
app.use(bodyparser.json());


app.use('/',express.static(__dirname + '/public'));

app.get('/show', function (req,res) {
    var type = req.query.type;
    console.log(req.query.type);
    database.show( type, (rows) => {
        console.log(rows.length);
    res.send(rows);
})
});

app.listen(3000, () => {
    console.log("http://localhost:3000");
});
