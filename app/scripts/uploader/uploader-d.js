/**
 * @ngdoc directive
 * @name numetal.directive:uploader
 * @description
 * # uploader
 */

'use strict';
var AWS = AWS;
angular.module('numetal').directive('uploader', function (Api) {
	return {
		restrict: 'AE',
		templateUrl: 'scripts/uploader/uploader-d.html',
		scope: {
			file: '@'
		},
		controller: function ($scope, $firebaseObject, Data, $timeout) {
			$scope.uploadS3 = function () {
				var startTime;
				console.info('Begin Uploading to S3', startTime = performance.now());
				AWS.config.update({accessKeyId: $scope.creds.accessKey.data.data, secretAccessKey: $scope.creds.secretKey.data.data});
				AWS.config.region = 'us-west-2';
				var bucket = new AWS.S3({params: {Bucket: $scope.creds.bucket}});
				var time = Date.now();
				var smallMedias = [];
				var newMedia = $firebaseObject(Data.refs.media);
				if ($scope.files.length) {
					var fileTypes = [], uniqueFileNames = [], readers = [];
					for (var fileNum = $scope.files.length - 1; fileNum >= 0; fileNum--) {
						uniqueFileNames[fileNum] = time + '-' + $scope.files[fileNum].name;
						fileTypes[fileNum] = $scope.files[fileNum].type;
						var params = {
							Key: uniqueFileNames[fileNum],
							ContentType: fileTypes[fileNum],
							Body: $scope.files[fileNum],
							ServerSideEncryption: 'AES256'
						};
						bucket.putObject(params, function (err, data) {
								if (err) {
									console.error(err.message, err.code);
									return false;
								}
								else {
									setTimeout(function () {
										$scope.uploadProgress = 0;
										$scope.$digest();
									}, 4000);
									return data;
								}
							})
							.on('httpUploadProgress', function (progress) {
								$scope.uploadProgress = Math.round(progress.loaded / progress.total * 100);
								$scope.$digest();
							});
						readers[fileNum] = new FileReader();
						readers[fileNum].onload = (function (canvasFile, int) {
							readers[int].readAsDataURL(canvasFile);
							return function (e) {
								(function imageToDataUri(img) {
									var canvas = document.createElement('canvas'),
										ctx = canvas.getContext('2d'),
										encodedImageData = img;
									var dataImg = new Image();
									dataImg.src = encodedImageData;
									// set its dimension to target size
									var size = 160;
									var x = dataImg.width / size;
									canvas.width = size;
									canvas.height = dataImg.height / x;
									ctx.drawImage(dataImg, 0, 0, canvas.width, canvas.height);
									smallMedias[int] = canvas.toDataURL('image/jpeg', 0.75);
									newMedia.$loaded().then(function (data) {
										data[uniqueFileNames[int].replace('.', '`')] = smallMedias[int];
										$timeout(data.$save(), 5000);
									});
									return e.target.result;
								})(e.target.result);
							};
						})($scope.files[fileNum], fileNum);

						Api.add('media', {
							src: 'https://s3-us-west-2.amazonaws.com/forgingtechnologies.com/' + uniqueFileNames[fileNum],
							type: fileTypes[fileNum],
							name: uniqueFileNames[fileNum]
						});
					}
				}
				else {
					console.error('Please select a file to upload');
				}
				console.info('End Upload to S3', performance.now() - startTime);
			};
		},
		link: function (scope, el) {
			function getKeys(url){
				var getData = Api.get(url);
				var returnData = {};
				var dataFn = function () {
					while(!getData.data){
						$timeout(function () {
							returnData = getData.data ? getData : dataFn();
						},500);
					}
				};
				dataFn();
				return returnData;
			}
			scope.creds = {
				// TODO: Get process VARS from Heroku
				bucket: 'forgingtechnologies.com',
				accessKey: getKeys('https://sizzling-fire-2548.firebaseio.com/keys/access.json'),
				secretKey: getKeys('https://sizzling-fire-2548.firebaseio.com/keys/secret.json')
			};
			el.bind('change', function (event) {
				var files = event.target.files;
				var file = files[0];
				scope.files = files;
				scope.file = file;
				scope.$parent.file = file;
				scope.$apply();
			});
		}
	};
});