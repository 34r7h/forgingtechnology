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
			copy: function (obj) {
				return angular.copy(obj);
			},
			get: function (url) {
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
				obj.name ? addFn() : addError();
				function addFn() {
					var returnData = {};
					obj.updated = Date.now(); // adds timestamp to each added object.
					obj.publish = obj.publish ? obj.publish : true;
					!Data.object[type] ? Data.object[type] = {} : null; // TODO put in data factory. For a fresh app, creates post and index keys.

					/* Add object to database */
					Data.array[type].$add(obj).then(function (ref) {

						// TODO put in data factory. For a fresh app, creates post and index keys.

						!Data.object.index ? Data.object.index = {} : null;
						!Data.object.posts ? Data.object.posts = {} : null;
						!Data.object.index[type] ? Data.object.index[type] = {} : null;

						obj.section ? !Data.object.index.sections ? Data.object.index.sections = {} : null : null;
						obj.section ? !Data.object.index.sections[obj.section] ? (Data.object.index.sections[obj.section] = {}, Data.object.index.sections[obj.section][ref.key()] = true) : Data.object.index.sections[obj.section][ref.key()] = true : null;

						Data.object.index[type][ref.key()] = true;

						var uniqueTags = [];
						obj.tags ? angular.forEach(obj.tags, function (tag) {
							uniqueTags.indexOf(tag) === -1 ? uniqueTags.push(tag) : null;
							!Data.object.index.tags ? Data.object.index.tags = {} : null;
							!Data.object.index.tags[tag] ? (Data.object.index.tags[tag] = {}, Data.object.index.tags[tag][ref.key()] = true) : Data.object.index.tags[tag][ref.key()] = true;
						}) : null;
						obj.tags = uniqueTags;

						Data.object.posts[ref.key()] = type;
						Data.object.$save();
					});
				}

				function addError() {
					console.error('New entries must have a name');
				}
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
							console.log("Check if you have sufficient permissions : " + err);
						}
					});
					Data.media = $firebaseObject(Data.refs.media).$loaded().then(function (data) {
						data[Data.object[type][id].name.replace('.', '`')] = null;
						Data.object[type][id] = null;
						Data.object.posts[id] = null;
						Data.object.index.media[id] = null;
						Data.object.$save();
						data.$save();
					});
				}

				type === 'media' ? deleteFile() : null;

				type !== 'media' ? removeContent() : null;

				function removeContent(){
					angular.forEach(Data.object.content[id].tags, function (tag) {
						Data.object.index.tags[tag][id]=null;
					});
					Data.object.index.sections[Data.object.content[id].section][id]=null;
					Data.object[type][id] = null;
					Data.object.index[type][id] = null;
					Data.object.posts[id] = null;
					Data.object.$save()
				}
			},
			saveSite: function (siteObj) {
				var obj = $firebaseObject(Data.refs.fb);
				obj.site = siteObj;
				obj.$save().then(function(ref) {
					ref.key() === obj.$id; // true
				}, function(error) {
					console.log("Error:", error);
				});


				/*!Data.array.site ? Data.array.site = {} : null;
				// var fbSite = $firebaseObject(Data.refs.fb);
				/!*angular.forEach(siteObj, function (siteVal, siteKey) {
					console.log(siteKey, siteVal);
					Data.object.site[siteKey] = siteVal;
				});*!/
				$timeout(function () {
					console.log('saving site info', Data.object.site);
					Data.array.$add({site:siteObj});
				}, 4000);*/
			},
			save: function (type, id, newObj, oldObj) {

				oldObj ? (tagCheck(), sectionCheck()): null;

				Data.object[type][id] = newObj;

				$timeout(function () {
					Data.object.$save();
				}, 4000);

				function sectionCheck(){
					newObj.section !== oldObj.section ? (Data.object.index.sections[oldObj.section][id] = null, Data.object.index.sections[newObj.section][id] = true) : null;
				}
				function tagCheck() {
					console.log('checking tags', oldObj.tags, newObj.tags);
					var uniqueTags = [];
					angular.forEach(newObj.tags, function (newTag) {
						uniqueTags.indexOf(newTag) === -1 ? uniqueTags.push(newTag) : null;
						!Data.object.index.tags[newTag] ? Data.object.index.tags[newTag] = {} : null;
						Data.object.index.tags[newTag][id] = true;
						angular.forEach(oldObj.tags, function (oldTag) {
							console.log(newTag, oldTag);
							newObj.tags.indexOf(oldTag) < 0 ? Data.object.index.tags[oldTag][id] = null : null;
						});
					});
					newObj.tags = uniqueTags;
				}
				/*function siteCheck() {
					angular.forEach(newObj, function (siteVal, siteKey) {
						Data.object.site[siteKey] = siteVal;
					});
					Data.object.$save();
				}*/
			}
			,
			msg: function (msg) {
				var timeStart = performance.now();
				console.log(performance.now() - timeStart, msg);
			}
		};
		return api;
	});