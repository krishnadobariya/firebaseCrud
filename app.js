var express = require('express');
var app = express();
const PORT = process.env.PORT || 5050
const bodyParser = require('body-parser')
const { stud,addData, viewById, deleteById, updateById } = require('./src/controller/stud.ctrl')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/stud', stud);
app.post('/add',addData);
app.get('/view/:id',viewById);
app.delete('/delete/:id',deleteById)
app.put("/update/:id",updateById)
app.get('/', (req, res) => {
res.send('This is my demo project')
})
app.listen(PORT, function () {
console.log(`Demo project at: ${PORT}!`); });