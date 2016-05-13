/**
 * @ngdoc service
 * @name numetal.Api
 * @description
 * # Api
 * Factory in the numetal.
 */

angular.module('numetal')
	.factory('Api', function ($state, Data, $window) {
		'use strict';

		// INITIALIZATION


		// ACTUAL DEFINITIO
		var service = {
			
			go: function (state, params) {
				$state.go(state, params);
				$state.reload(state);
			},
			add: function (type, obj) {
				console.info('Adding object to Firebase');
				obj.updated = Date.now();
				!Data.object[type] ? Data.object[type] = {} : null;
				Data.array[type].$add(obj).then(function (ref) {
					!Data.object.index ? Data.object.index = {} : null;
					!Data.object.posts ? Data.object.posts = {} : null;
					!Data.object.index[type] ? Data.object.index[type] = {} : null;
					Data.object.index[type][ref.key()] = true;
					Data.object.posts[ref.key()] = type;
					Data.object.$save();
					Data.key = ref.key();
				});
			},
			rm: function (type, id) {
				type === 'media' ? (deleteFile()) : null;
				Data.media.$save();
				Data.object[type][id] = null;
				Data.object.index[type][id] = null;
				Data.object.posts[id] = null;
				Data.object.$save();

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
					Data.media[Data.object[type][id].name.replace('.','`')] = null;
					Data.media.$save();
				}
			},
			save: function (type, id) {
				console.log(arguments);
				// Data.object[type][id].updated = Date.now();
				Data.object[type].$save();
			},
			msg: function (msg) {
				var timeStart = performance.now();
				console.log(performance.now() - timeStart, msg);
			}
		};
		return service;
	});