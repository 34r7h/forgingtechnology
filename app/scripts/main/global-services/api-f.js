/**
 * @ngdoc service
 * @name numetal.Api
 * @description
 * # Api
 * Factory in the numetal.
 */

angular.module('numetal')
	.factory('Api', function ($http, $state, Data, $firebaseObject) {
		'use strict';

		// INITIALIZATION


		// ACTUAL DEFINITION
		var api = {
			get: function (url) {
				var returnData = {};
				$http.get(url).then(function (data) {
					// console.log('Fetched data from '+url, data);
					returnData.data = data;
				});
				// console.log(returnData);
				return returnData;
			},
			go: function (state, params) {
				$state.go(state, params);
				$state.reload(state);
			},
			add: function (type, obj) {
				console.info('Adding object to Firebase', arguments);
				var returnData = {};
				obj.updated = Date.now(); // adds timestamp to each added object.
				!Data.object[type] ? Data.object[type] = {} : null; // TODO put in data factory. For a fresh app, creates post and index keys.

				/* Add object to database */
				Data.array[type].$add(obj).then(function (ref) {
					// TODO put in data factory. For a fresh app, creates post and index keys.
					!Data.object.index ? Data.object.index = {} : null;
					!Data.object.posts ? Data.object.posts = {} : null;
					!Data.object.index[type] ? Data.object.index[type] = {} : null;
					Data.object.index[type][ref.key()] = true;
					Data.object.posts[ref.key()] = type;
					Data.object.$save();
					// Data.key = ref.key();
					// State.data[ref.key()] = ref.key();
					// returnData.ref = ref.key();
				});
				// console.log(returnData.ref);
				// return returnData;
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
							console.log("File deleted successfully");
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
					// Data.media[Data.object[type][id].name.replace('.','`')] = null;
					// return Data.media;
				}
				type === 'media' ? deleteFile() : null;

				// console.log(Data.object,[type],[id]);
				type !== 'media' ?
					(Data.object[type][id] = null, Data.object.index[type][id] = null, Data.object.posts[id] = null, Data.object.$save() )
					: null;
				// console.log(Data.object.index[type]);
				// Data.object.index[type][id] = null;
				// Data.object.posts[id] = null;

				/* Delete file from AWS S3 */
			},
			save: function (type, id) {
				api.msg(arguments);
				// Data.object[type][id].updated = Date.now();
				Data.object[type].$save();
			},
			msg: function (msg) {
				var timeStart = performance.now();
				console.log(performance.now() - timeStart, msg);
			}
		};
		return api;
	});