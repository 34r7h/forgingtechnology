/**
 * @ngdoc overview
 * @name numetal.routes
 * @description
 * # numetal.routes
 *
 * Routes module. All app states are defined here.
 */
angular.module('numetal')
	.config(function ($stateProvider, $urlRouterProvider, $locationProvider, ngMetaProvider) {
		'use strict';

		function appendMetaTags(metaArray){
			var metaString = ', ';
			angular.forEach(metaArray, function (meta) {
				metaString = metaString + meta + ', ';
			});
			return metaString + 'Vancouver, BC';
		}

		$locationProvider.html5Mode(true);
		$locationProvider.hashPrefix('!');

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('metal', {
				url: '',
				title: 'Forging Technology',
				template: '<layout></layout>',
				abstract: true,
				controller: function (Facts) {
					var vm = this;
					vm.a = Facts.api;
					vm.d = Facts.data;
					vm.s = Facts.state;
					vm.u = Facts.ux;
				},
				controllerAs: 'metal'
			})
			.state('metal.home', {
				url: '/',
				template: '<posts></posts>',
				meta: {
					title: 'Forging Technology Posts',
					description: 'Forging Technology is a metalwork company serving the greater Vancouver BC area.',
					tags: appendMetaTags(['posts','metal work','driveway gates', 'railings', 'spiral staircase', 'forge', 'iron', 'steel', 'home automation'])
				}
			})
			.state('metal.about', {
				url: '/about',
				template: '<content section="about" type="about"></content>',
				meta: {
					title: 'Forging Technology - About',
					description: 'Forging Technology is a metalwork company serving the greater Vancouver BC area.',
					tags: appendMetaTags(['about','driveway gates', 'railings', 'spiral staircase', 'forge', 'iron', 'steel', 'home automation', 'Vancouver', 'BC'])
				}
			})
			.state('metal.about.about', {
				url: '/:about',
				template: '<content-single type="about" section="about"></content-single>',
				meta: {
					title: 'Forging Technology About',
					description: 'Forging Technology is a metalwork company serving the greater Vancouver BC area.',
					tags: appendMetaTags(['about','driveway gates', 'railings', 'spiral staircase', 'forge', 'iron', 'steel', 'home automation', 'Vancouver', 'BC'])
				}
			})
			.state('metal.services', {
				url: '/services',
				template: '<content type="services" section="services"></content>',
				meta: {
					title: 'Forging Technology Services',
					description: 'Forging Technology is a metalwork company creating unique, beautiful driveway gates, ',
					tags: appendMetaTags(['services','driveway gates', 'railings', 'spiral staircase', 'home automation'])
				}
			})
			.state('metal.services.services', {
				url: '/:services',
				template: '<content-single type="services" section="services"></content-single>',
				meta: {
					title: 'Forging Technology Services',
					description: 'Forging Technology is a metalwork company creating unique, beautiful driveway gates, railings, and custom metal products',
					tags: appendMetaTags(['services','driveway gates', 'railings', 'spiral staircase', 'home automation'])
				}
			})
			.state('metal.clients', {
				url: '/clients',
				template: '<content type="clients" section="clients"></content>',
				meta: {
					title: 'Forging Technology Clients',
					description: 'Forging Technology is a metalwork company creating unique, beautiful driveway gates, ',
					tags: appendMetaTags(['driveway gates', 'railings', 'spiral staircase', 'home automation'])
				}
			})
			.state('metal.clients.clients', {
				url: '/:clients',
				template: '<content-single type="clients" section="clients"></content-single>',
				meta: {
					title: 'Forging Technology Clients',
					description: 'Forging Technology is a metalwork company creating unique, beautiful driveway gates, ',
					tags: appendMetaTags(['driveway gates', 'railings', 'spiral staircase', 'home automation'])
				}
			})
			.state('metal.posts', {
				url: '/posts',
				template: '<content section="posts" type="posts"></content>',
				meta: {
					title: 'Forging Technology Clients',
					description: 'Forging Technology is a metalwork company creating unique, beautiful driveway gates, ',
					tags: appendMetaTags(['driveway gates', 'railings', 'spiral staircase', 'home automation'])
				}
			})
			.state('metal.posts.posts', {
				url: '/:posts',
				template: '<content-single section="posts" type="posts"></content-single>'
			})
			.state('metal.gallery', {
				url: '/gallery',
				template: '<content section="gallery" type="gallery"></content>'
			})
			.state('metal.gallery.gallery', {
				url: '/:gallery',
				template: '<content-single section="gallery" type="gallery"></content-single>'
			})
			.state('admin', {
				url: '/admin',
				template: '<ui-view></ui-view>',
				controller: function (Facts) {
					var vm = this;
					vm.a = Facts.api;
					vm.d = Facts.data;
					vm.s = Facts.state;
					vm.u = Facts.ux;
				},
				controllerAs: 'admin'
			})
			.state('admin.site', {
				url: '/site',
				template: '<admin type="site"></admin>',
				onEnter: function (State) {
					State.show.editSite = true;
				},
				onExit: function (State) {
					State.show.editSite = false;
				}
			})
			.state('admin.services', {
				url: '/services',
				template: '<admin type="services"></admin>'
			})
			.state('admin.clients', {
				url: '/clients',
				template: '<admin type="clients"></admin>'
			})
			.state('admin.media', {
				url: '/media',
				template: '<admin type="media"></admin>',
				onEnter: function (State) {
					State.show.showMedia = true;
				},
				onExit: function (State) {
					State.show.showMedia = false;
				}
			})
			.state('admin.messages', {
				url: '/messages',
				template: '<admin></admin>',
				onEnter: function (State) {
					State.show.messages = true;
				},
				onExit: function (State) {
					State.show.messages = false;
				}
			})
			.state('admin.posts', {
				url: '/posts',
				template: '<admin type="posts"></admin>',
				onEnter: function (State) {
					State.show.editPosts = true;
				},
				onExit: function (State) {
					State.show.editPosts = false;
				}
			})
		/* STATES-NEEDLE - DO NOT REMOVE THIS */;

	});