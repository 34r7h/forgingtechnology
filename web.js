/**
 * Created by i on 2016-05-24.
 */
var gzippo = require('gzippo');
var express = require('express');
var app = express();
app.use(require('prerender-node').set('prerenderToken', 'ipMxPbev4DV5j1W9P7Mq'));
app.use(express.logger('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/www"));
app.use(function(req, res) {
	res.sendfile(__dirname + '/www/index.html');
});
app.listen(process.env.PORT || 5000);