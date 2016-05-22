var express = require('express');
var router = express.Router();
var request = require('request-json');
var path = require('path');
var passport = require('passport');

var serverUrl = 'http://120.25.76.30:80/';
var appId = 'Exper';
var appSecret = 'AFDFFDHKDDFJOFFDKLFKFKACMVKKFDFF';
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/login', passport.authenticate('local'), function(req, res, next) {
	res.send({
		status: 1
	});
});

router.get('/devices', function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
    	res.send({
    		status: -1,
    		message: '用户未登录'
    	});
    }
}, function(req, res, next) {
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
    var paramsSet = [];
    req.query.devIds.forEach(function(id) {
        paramsSet.push({
            name: 'devId',
            value: id
        });
    });
    var data = {
        "actionName": "GPS",
        "appId": appId,
        "appSecret": appSecret,
        "paramsSet": paramsSet,
        "status": 0,
        "timeStamp": 183727132
    }
    client.post('WebAPI.ashx/?=', data,
        function(error, response, body) {
            console.log(error);
            res.send(body);
        }
    );
});

router.get('/warnings', function(req, res, next) {
    var client = request.createClient(serverUrl);
    var data = {
        "actionName":"QueryHistoryAlarm",
        "appId": appId,
        "appSecret": appSecret,
        "paramsSet":[{"name":"userId","value":"1307"},{"compare":"%3E%3D","name":"dt_alarm","value":"2016-05-14 00:00:00"}],
        "status":0,
        "timeStamp":183727132
    };
    client.post('WebAPI.ashx/?=', data,
        function(error, response, body) {
            console.log(error);
            res.send(body);
        }
    );
})

router.post('/settings', function(req, res, next) {
    var client = request.createClient(serverUrl);
    var devId = req.params.devId;
    var option = req.params.option;
    var cmd = {
        uploadFreq: '309',//60s
        geoMode: '310',//0:GPS, 1: station,2:GPS+station
        timeZone: '313',//timezone, (direction:0=east|1=west, hour, minute)
        led: '303',//0=off, 1=on
        alarm: '307',//value=10000010,0000;value=11000010,0000;value=11000010,0000;value=11000000,0000
        waken: '620',//0,value,0000
    }
    var data = {
        "actionName": "DevCMD",
        "appId": appId,
        "appSecret": appSecret,
        "paramsSet": [{
            "name": "devId",
            "value": devId
        }, {
            "name": "cmd",
            "value": "309"
        }, {
            "name": "param",
            "value": "90,0000"
        }],
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


module.exports = router;
