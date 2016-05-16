/**
 * @ngdoc service
 * @name numetal.Api
 * @description
 * # Api
 * Factory in the numetal.
 */

angular.module('numetal')
	.factory('Api', function ($http, $state, Data, $firebaseObject, $timeout, State) {
		'use strict';

		var api = {
			
			get: function (url) {
				console.log(url);
				var returnData = {};
				$http.get(url).then(function (data) {
					returnData.data = data;
				});
				return returnData;
			},
			go: function (state, params) {
				$state.go(state, params);
				$state.reload(state);
			},
			add: function (type, obj) {
				var returnData = {};
				obj.updated = Date.now(); // adds timestamp to each added object.
				!Data.object[type] ? Data.object[type] = {} : null; // TODO put in data factory. For a fresh app, creates post and index keys.

				/* Add object to database */
				Data.array[type].$add(obj).then(function (ref) {
					// TODO put in data factory. For a fresh app, creates post and index keys.
					!Data.object.index ? Data.object.index = {} : null;
					!Data.object.posts ? Data.object.posts = {} : null;
					!Data.object.index[type] ? Data.object.index[type] = {} : null;

					obj.section ? !Data.object.index.sections ? Data.object.index.sections = {}: null : null;
					obj.section ? !Data.object.index.sections[obj.section] ? (Data.object.index.sections[obj.section] = {}, Data.object.index.sections[obj.section][ref.key()] = true) : Data.object.index.sections[obj.section][ref.key()] = true : null;

					Data.object.index[type][ref.key()] = true;

					obj.tags ? angular.forEach(obj.tags, function (tag) {
						!Data.object.index.tags ? Data.object.index.tags = {}: null;
						!Data.object.index.tags[tag] ? (Data.object.index.tags[tag] = {}, Data.object.index.tags[tag][ref.key()] = true) : Data.object.index.tags[tag][ref.key()] = true;
					}) : null;

					Data.object.posts[ref.key()] = type;
					Data.object.$save();
				});
			},
			rm: function (type, id) {
				/**/
				function deleteFile() {
					var creds = {
						// TODO: Get process VARS from Heroku
						bucket: 'forgingtechnologies.com',
						access_key: 'AKIAIYGVT' + 'JVFY77MNYCQ',
						secret_key: 'VNNKgEXYvSVS21oj5X' + 'cCem3cBzNkIzXZEW5q1Rwm'
					};

					AWS.config.update({accessKeyId: creds.access_key, secretAccessKey: creds.secret_key});
					AWS.config.region = 'us-west-2';

					var bucketInstance = new AWS.S3();
					var params = {
						Bucket: creds.bucket,
						Key: Data.object[type][id].name
					};
					bucketInstance.deleteObject(params, function (err, data) {
						if (data) {
							// console.log("File deleted successfully");
						}
						else {
							console.log("Check if you have sufficient permissions : "+err);
						}
					});
					Data.media = $firebaseObject(Data.refs.media).$loaded().then(function (data) {
						data[Data.object[type][id].name.replace('.','`')] = null;
						Data.object[type][id] = null;
						Data.object.posts[id] = null;
						Data.object.index.media[id] = null;
						Data.object.$save();
						data.$save();
					});
				}
				type === 'media' ? deleteFile() : null;

				type !== 'media' ?
					(Data.object[type][id] = null, Data.object.index[type][id] = null, Data.object.posts[id] = null, Data.object.$save() )
					: null;
			},
			save: function (type, id) {
				api.msg(arguments);
				Data.object[type].$save();
			},
			msg: function (msg) {
				var timeStart = performance.now();
				console.log(performance.now() - timeStart, msg);
			}
		};
		return api;
	});