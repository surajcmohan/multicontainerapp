const express = require('express');
const bodyParser = require('body-parser');
const cors =require('cors');
const app = new express();
module.exports = app;

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
//F63Vu3RtuN8PrBY7

app.get("/fileService/getFiles",(req, res, next) => {
  const test = [{
    "id": 2,
    "name": "God of small things",
    "documentID": "IUASDH98ASD",
    "category": "Electrical",
    "documentStatus": "Published",
    "parentSemsStandard": "askdjakdjsadsasdad",
    "relatedDocuments": "asdasdadadadad asdasdasdasdas",
    "revDate": "2020-03-29",
    "rev": "",
    "isDownloaded": "false",
    "docPath": ""
  }]
  res.status(200).json(test);
});