const port = 8000;
const fs = require('fs');
let ejs = require('ejs');

const changeDataInFile = (filename, dataArray) => {
    let obj = {};
    fs.readFile(path.join(__dirname + '/init/'+ filename), 'utf8', function (err, data) {
        if (err) { throw err; }
        // данные получены в виде объекта JSON
        obj = JSON.parse(data.toString().trim());
        // Можно менять любое свойство 
        
        console.log(dataArray);

        Object.keys(dataArray).forEach(function(key,index) {
            obj.SyncResponse[key] = dataArray[key];
        });
        
        // Сохраняем в файл
        fs.writeFileSync(path.join(__dirname + '/dist/rules-fixed.conf'), JSON.stringify(obj));
        });
}

const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

router.get('/',function(req,res){
  const filename = 'rules.conf';
  fs.readFile(path.join(__dirname + '/init/'+ filename), 'utf8', function (err, data) {
    if (err) { throw err; }
    // данные получены в виде объекта JSON
    res.render(path.join(__dirname + '/public/index.ejs'), JSON.parse(data.toString().trim()) );
  });
  
  //__dirname : It will resolve to your project folder.
});

router.post('/',function(req,res){
  console.log('[got data]', req.body.status);
  changeDataInFile('rules.conf', req.body)
  res.send('fine');
    //__dirname : It will resolve to your project folder.
});

//add the router
app.use('/', router);
app.listen(process.env.port || port);

console.log('Running at Port ' + port);