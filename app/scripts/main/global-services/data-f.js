/**
 * @ngdoc service
 * @name numetal.Data
 * @description
 * # Data
 * Factory in the numetal.
 */
angular.module('numetal')
	.factory('Data', function ($firebaseObject, $firebaseArray, $firebaseAuth) {
		'use strict';

		// INITIALIZATION
		var fbRef = 'https://sizzling-fire-2548.firebaseio.com/data';
		var fbMediaRef = 'https://sizzling-fire-2548.firebaseio.com/media';
		var fb = new Firebase(fbRef);
		var fbMedia = new Firebase(fbMediaRef);
		var obj = $firebaseObject(fb);
		// var media = $firebaseObject(fbMedia);
		var types = ['content', 'site', 'media'];
		var arrObj = {};
		for (var typeNumber = types.length-1; typeNumber >= 0; typeNumber--) {
			arrObj[types[typeNumber]] = $firebaseArray(fb.child(types[typeNumber]));
			// arrObj['index'] = $firebaseArray(fb.child('index'));
		}
		// ACTUAL DEFINITION
		var data = {
			// index: {},
			object: {},
			array: [],
			refs: {media: fbMedia, fb: fb}
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