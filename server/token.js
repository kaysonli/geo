var serverUrl = 'http://120.25.76.30:80/';
var appId = '';
var appSecret = '';
var request = require('request');

function getToken(callback) {
	var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=appId&secret=appSecret';
	var url = url.replace(/appId/, appId).replace(/appSecret/, appSecret);
	console.log(url);
	request(url, function(error, response, body) {
		console.log(body);
		callback(body);
	});
}

module.exports = {
    getToken: getToken
}