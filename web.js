/**
 * Created by i on 2016-05-24.
 */
var gzippo = require('gzippo');
var express = require('express');
var app = express();

app.all('/*', function(req, res, next) {
	// Just send the index.html for other files to support HTML5Mode
	res.sendFile('index.html', { root: __dirname+ "/www" });
});

app.use(require('prerender-node').set('prerenderToken', 'ipMxPbev4DV5j1W9P7Mq'));

app.use(express.logger('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/www"));

app.listen(process.env.PORT || 5000);