/**
 * @ngdoc service
 * @name numetal.Data
 * @description
 * # Data
 * Factory in the numetal.
 */
var Firebase = Firebase;
angular.module('numetal')
	.factory('Data', function ($firebaseObject, $firebaseArray, $firebaseAuth, State) {
		'use strict';

		// INITIALIZATION
		var fbRef = 'https://sizzling-fire-2548.firebaseio.com/data';
		var fbMediaRef = 'https://sizzling-fire-2548.firebaseio.com/media';
		var fb = new Firebase(fbRef);
		var fbAuthRef = new Firebase('https://sizzling-fire-2548.firebaseio.com');
		var authData = $firebaseAuth(fbAuthRef);
		State.auth = authData.$getAuth();
		var fbContent = new Firebase(fbRef).child('content');
		var fbMedia = new Firebase(fbMediaRef);
		var obj = $firebaseObject(fb);
		var types = ['content', 'site', 'media', 'posts', 'index'];
		var arrObj = {};
		for (var typeNumber = types.length-1; typeNumber >= 0; typeNumber--) {
			arrObj[types[typeNumber]] = $firebaseArray(fb.child(types[typeNumber]));
			// arrObj['index'] = $firebaseArray(fb.child('index'));
		}
		// ACTUAL DEFINITION
		var data = {
			index: {},
			object: {},
			array: [],
			refs: {media: fbMedia, fb: fb, content: fbContent}
		};
		obj.$loaded().then(function (fbReady) {
			data.object = fbReady;
			data.array = arrObj;
			// data.index = fbReady.index;
			// data.media = media;
		});
		// console.log(data);
		return data;
	});