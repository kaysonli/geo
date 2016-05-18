var express = require('express');
var router = express.Router();
var request = require('request-json');
var path = require('path');

var serverUrl = 'http://120.25.76.30:80/';
var appId = 'Exper';
var appSecret = 'AFDFFDHKDDFJOFFDKLFKFKACMVKKFDFF';
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/devices', function(req, res, next) {
    var client = request.createClient(serverUrl);
    var data = {
        "actionName": "QueryDev",
        "appId": appId,
        "appSecret": appSecret,
        "paramsSet": [{ "name": "userId", "value": "1307" }, { "name": "page", "value": "0" }, { "name": "id", "value": "33" }],
        "status": 0,
        "timeStamp": 183727132
    };
    client.post('WebAPI.ashx/?=', data,
        function(error, response, body) {
            console.log(error);
            res.send(body);
        }
    );
});

router.get('/gps', function(req, res, next) {
    var client = request.createClient(serverUrl);
    var data = {
        "actionName": "GPS",
        "appId": appId,
        "appSecret": appSecret,
        "paramsSet": [{ "name": "devId", "value": "33" }, { "name": "devId", "value": "245" }, { "name": "devId", "value": "246" }, { "name": "devId", "value": "247" }],
        "status": 0,
        "timeStamp": 183727132
    }
});


module.exports = router;
