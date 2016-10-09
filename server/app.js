var http = require("http");
var server = http.createServer();
var url = require("url");
var querystring = require("querystring");
server.on('request', function (req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  var urlOption = url.parse(req.url);
  var pathName = urlOption.pathname;
  switch (pathName) {
    case '/api/themes':
      var request = http.request('http://news-at.zhihu.com/api/4/themes');
      request.on('response', function (response) {
        var c = "";
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
          c += chunk;
        });
        response.on('end', function () {
          res.writeHead(200, response.headers);
          res.write(c);
          res.end();
        })
      });
      request.on('error', function (err) {
        res.writeHead(200, {
          "Content-Type": "application/json"
        });
        res.end({
          "error": err
        });
      });
      request.end();
      break;
    case '/api/news/latest':
      var request = http.request('http://news-at.zhihu.com/api/4/news/latest');
      request.on('response', function (response) {
        var c = "";
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
          c += chunk;
        });
        response.on('end', function () {
          res.writeHead(200, response.headers);
          res.write(c);
          res.end();
        })
      });
      request.on('error', function (err) {
        res.writeHead(200, {
          "Content-Type": "application/json"
        });
        res.end({
          "error": err
        });
      });
      request.end();
      break;
    case '/api/news':
      var query = querystring.parse(urlOption.query);
      var id = query.id;
      var request = http.request('http://news-at.zhihu.com/api/4/news/' + id);
      request.on('response', function (response) {
        var c = "";
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
          c += chunk;
        });
        response.on('end', function () {
          res.writeHead(200, response.headers);
          res.write(c);
          res.end();
        })
      });
      request.on('error', function (err) {
        res.writeHead(200, {
          "Content-Type": "application/json"
        });
        res.end({
          "error": err
        });
      });
      request.end();
      break;
    case '/api/before':
      var query = querystring.parse(urlOption.query);
      var time = query.time;
      var request = http.request('http://news.at.zhihu.com/api/4/news/before/' + time);
      request.on('response', function (response) {
        var c = "";
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
          c += chunk;
        });
        response.on('end', function () {
          res.writeHead(200, response.headers);
          res.write(c);
          res.end();
        })
      });
      request.on('error', function (err) {
        res.writeHead(200, {
          "Content-Type": "application/json"
        });
        res.end({
          "error": err
        });
      });
      request.end();
      break;
    case '/api/extra':
      var query = querystring.parse(urlOption.query);
      var id = query.id;
      var request = http.request('http://news-at.zhihu.com/api/4/story-extra/' + id);
      request.on('response', function (response) {
        var c = "";
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
          c += chunk;
        });
        response.on('end', function () {
          res.writeHead(200, response.headers);
          res.write(c);
          res.end();
        })
      });
      request.on('error', function (err) {
        res.writeHead(200, {
          "Content-Type": "application/json"
        });
        res.end({
          "error": err
        });
      });
      request.end();
      break;
    case '/api/comments':
      var query = querystring.parse(urlOption.query);
      var id = query.id;
      var request = http.request('http://news-at.zhihu.com/api/4/story/' + id + '/long-comments');
      request.on('response', function (response) {
        var c = "";
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
          c += chunk;
        });
        response.on('end', function () {
          res.writeHead(200, response.headers);
          res.write(c);
          res.end();
        })
      });
      request.on('error', function (err) {
        res.writeHead(200, {
          "Content-Type": "application/json"
        });
        res.end({
          "error": err
        });
      });
      request.end();
      break;
    case '/api/theme':
      var query = querystring.parse(urlOption.query);
      var id = query.id;
      var request = http.request('http://news-at.zhihu.com/api/4/theme/' + id);
      request.on('response', function (response) {
        var c = "";
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
          c += chunk;
        });
        response.on('end', function () {
          res.writeHead(200, response.headers);
          res.write(c);
          res.end();
        })
      });
      request.on('error', function (err) {
        res.writeHead(200, {
          "Content-Type": "application/json"
        });
        res.end({
          "error": err
        });
      });
      request.end();
      break;
    case '/api/pic':
      var query = querystring.parse(urlOption.query);
      var img = query.img;
      var imgUrl = url.parse(img);
      imgUrl.headers = {
        "Referer": "https://daily.zhihu.com/"
      };
      var opt = {
        hostname: imgUrl.hostname,
        port: '80',
        path: imgUrl.path,
        headers: imgUrl.headers
      }
      var request = http.request(opt);
      request.on('response', function (response) {
        var c = "";
        response.setEncoding('binary');
        response.on('data', function (chunk) {
          c += chunk;
        });
        response.on('end', function () {
          res.writeHead(200, response.headers);
          res.write(c, "binary");
          // require("fs").writeFile('./tmp/'+)
          res.end();
        })
      });
      request.end();
      break;
    default:
      res.writeHead(404);
      res.write("404: Not Found");
      res.end();
      break;
  }
});
server.listen(8088, function () {
  console.log("listen on 8088");
});
