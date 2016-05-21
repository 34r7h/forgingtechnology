/**
 * @ngdoc service
 * @name numetal.Api
 * @description
 * # Api
 * Factory in the numetal.
 */

angular.module('numetal')
	.factory('Api', function ($http, $state, Data, $firebaseObject, $firebaseAuth, $firebaseArray, $timeout, State, $rootScope) {
		'use strict';
		$rootScope.debug = true;
		var api = {
			email: function(subject, text, from) {
				var msgRef = new Firebase('https://sizzling-fire-2548.firebaseio.com/messages');
				var msg = $firebaseArray(msgRef).$loaded().then(function (data) {
					data.$add({subject:subject, text:text, from: from}).then(function (ref) {
						console.log(ref);
						var getMsg = $firebaseAuth(Data.refs.fb);
						getMsg.$resetPassword({
							email: "masukmetaldesign+forgingtechnology@gmail.com"
						}).then(function() {
							console.log("Password reset email sent successfully!");
						}).catch(function(error) {
							console.error("Error: ", error);
						});
					})
				});

		},
			login: function (email, pass) {
				var fbAuth = $firebaseAuth(Data.refs.fb);
				fbAuth.$authWithPassword({email:email, password:pass}).then(function(authData) {
					console.log("Logged in as:", authData.uid);
					State.auth = authData;
				}).catch(function(error) {
					console.error("Authentication failed:", error);
				});
			},
			logout: function () {
				var userRef = new Firebase('https://sizzling-fire-2548.firebaseio.com');
				State.auth = $firebaseAuth(userRef);
				State.auth.$unauth();
				State.auth = null;
			},
			log: function(msg, description){
					return $rootScope.debug ? typeof msg === 'object' ? angular.forEach(msg, function(ms, msKey){
						console.log('%c'+msKey+': '+ms, 'background:#aaaaaa; color:#fefefe, padding:10px', description)
					}) : console.log('%c'+msg, 'background:#aaaaaa; color:#fefefe, padding:10px', description) : null;
			},
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

						var uniqueTags = ['metal'];
						function setTags(){
							angular.forEach(obj.tags, function (tag) {
								uniqueTags.indexOf(tag) === -1 ? uniqueTags.push(tag) : null;
								!Data.object.index.tags ? Data.object.index.tags = {} : null;
								!Data.object.index.tags[tag] ? (Data.object.index.tags[tag] = {}, Data.object.index.tags[tag][ref.key()] = true) : Data.object.index.tags[tag][ref.key()] = true;
							});
							obj.tags = uniqueTags;
						}

						obj.tags = obj.tags ? setTags() : uniqueTags;


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

				type === 'media' ? deleteFile() : null;

				type !== 'media' ? removeContent() : null;

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
						Data.object.media[id].tags ? angular.forEach(Data.object.media[id].tags, function (tag) {
							Data.object.index.tags[tag][id]=null;
						}) : null;
						data[Data.object[type][id].name.replace('.', '`')] = null;
						Data.object[type][id] = null;
						Data.object.posts[id] = null;
						Data.object.index.media[id] = null;
						Data.object.$save();
						data.$save();
					});
				}

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
				var obj = $firebaseObject(Data.refs.fb.child('site'));
				angular.forEach(siteObj, function (siteVal, siteKey) {
					obj[siteKey] = siteVal;
				});
				obj.$save().then(function(ref) {
					ref.key() === obj.$id; // true
				}, function(error) {
					console.log("Error:", error);
				});
			},
			save: function (type, id, newObj, oldObj) {

				var check = {};
				!newObj ? newObj = Data.object[type][id] : null;
				!oldObj ? oldObj = newObj : null;

				JSON.stringify(oldObj.tags) !== JSON.stringify(newObj.tags) ? tagCheck(): check.tags = true;
				JSON.stringify(oldObj.section) !== JSON.stringify(newObj.section) ? sectionCheck(): check.sections = true;

				function saveAfterChecks(){
					var saveObj = $firebaseObject(Data.refs.fb.child(type)).$loaded().then(function (data) {
							data[id] = newObj;
							data.$save().then(function(ref) {
								return data[id];
							}, function(error) {
								console.log("Error:", error);
							});

					});
				}
				function checksReady(){
					check.tags && check.sections ? saveAfterChecks() : $timeout(function () {
					checksReady();
				},1000);}

				function sectionCheck(){
					newObj.section !== oldObj.section ? (Data.object.index.sections[oldObj.section][id] = null, Data.object.index.sections[newObj.section][id] = true) : null;
					return check.sections = true;
				}

				function tagCheck() {
					console.log('checking tags', oldObj.tags, newObj.tags);
					var uniqueTags = [];
					angular.forEach(newObj.tags, function (newTag) {
						!Data.object.index.tags ? Data.object.index.tags = {}: null;
						uniqueTags.indexOf(newTag) === -1 ? uniqueTags.push(newTag) : null;
						!Data.object.index.tags[newTag] ? Data.object.index.tags[newTag] = {} : null;
						Data.object.index.tags[newTag][id] = true;
					});
					angular.forEach(uniqueTags, function (newTag) {
						angular.forEach(oldObj.tags, function (oldTag) {
							console.log(newTag, oldTag);
							newObj.tags.indexOf(oldTag) < 0 ? Data.object.index.tags[oldTag][id] = null : null;
						});
					});
					newObj.tags = uniqueTags;
					Data.object.$save();
					return check.tags = true;
				}
				checksReady();
				return newObj;

			},
			msg: function (msg) {
				var timeStart = performance.now();
				console.log(performance.now() - timeStart, msg);
			}
		};
		return api;
	});