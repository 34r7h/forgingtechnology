"use strict";angular.module("numetal",["ngAnimate","ngAria","ngResource","ngSanitize","ngTouch","ui.router","ngFabForm","firebase","w11k.angular-seo-header"]),angular.module("numetal").directive("admin",function(){return{templateUrl:"scripts/admin/admin-d.html",restrict:"EA",controller:["$scope","$attrs",function(e,t){e.$parent.admin.s.type=t.type,e.$parent.admin.s.section=t.section}]}}),angular.module("numetal").directive("connect",function(){return{templateUrl:"scripts/connect/connect-d.html",restrict:"EA",link:function(e,t,n){},controller:["$scope",function(e){}]}}),angular.module("numetal").directive("content",["State",function(e){return{templateUrl:"scripts/content/content-d.html",restrict:"EA",controller:["$scope","$attrs",function(t,n){e.type=n.type}]}}]),angular.module("numetal").directive("contentSingle",["$state",function(e){return{templateUrl:"scripts/content-single/content-single-d.html",restrict:"EA",controller:["$scope","$attrs",function(t,n){t.$parent.metal.s.type=n.type,t.$parent.metal.s.params=e.params[t.$parent.metal.s.type]}]}}]),angular.module("numetal").directive("gallery",function(){return{templateUrl:"scripts/gallery/gallery-d.html",restrict:"EA",link:function(e,t,n){},controller:["$scope",function(e){}]}}),angular.module("numetal").directive("layout",function(){return{templateUrl:"scripts/layout/layout-d.html",restrict:"EA",link:function(e,t,n){},controller:["$scope",function(e){}]}}),angular.module("numetal").factory("Api",["$http","$state","Data","$firebaseObject","$firebaseAuth","$firebaseArray","$timeout","State","$rootScope","$anchorScroll","$location",function(e,t,n,o,a,i,s,c,r,l,u){r.debug=!0;var d={anchor:function(e){u.hash(e),l()},email:function(e,t,o){var s=new Firebase("https://sizzling-fire-2548.firebaseio.com/messages");i(s).$loaded().then(function(i){i.$add({subject:e,text:t,from:o}).then(function(e){console.log(e);var t=a(n.refs.fb);t.$resetPassword({email:"masukmetaldesign+forgingtechnology@gmail.com"}).then(function(){console.log("Password reset email sent successfully!")})["catch"](function(e){console.error("Error: ",e)})})})},login:function(e,t){var o=a(n.refs.fb);o.$authWithPassword({email:e,password:t}).then(function(e){console.log("Logged in as:",e.uid),c.auth=e})["catch"](function(e){console.error("Authentication failed:",e)})},logout:function(){var e=new Firebase("https://sizzling-fire-2548.firebaseio.com");c.auth=a(e),c.auth.$unauth(),c.auth=null},log:function(e,t){return r.debug?"object"==typeof e?angular.forEach(e,function(e,n){console.log("%c"+n+": "+e,"background:#aaaaaa; color:#fefefe, padding:10px",t)}):console.log("%c"+e,"background:#aaaaaa; color:#fefefe, padding:10px",t):null},copy:function(e){return angular.copy(e)},get:function(t){var n={};return e.get(t).then(function(e){n.data=e}),n},go:function(e,n){t.go(e,n),t.reload(e)},add:function(e,t){function o(){t.updated=Date.now(),t.publish=t.publish?t.publish:!0,n.object[e]?null:n.object[e]={},n.array[e].$add(t).then(function(o){function a(){angular.forEach(t.tags,function(e){-1===i.indexOf(e)?i.push(e):null,n.object.index.tags?null:n.object.index.tags={},n.object.index.tags[e]?n.object.index.tags[e][o.key()]=!0:(n.object.index.tags[e]={},n.object.index.tags[e][o.key()]=!0)}),t.tags=i}n.object.index?null:n.object.index={},n.object.posts?null:n.object.posts={},n.object.index[e]?null:n.object.index[e]={},t.section?n.object.index.sections?null:n.object.index.sections={}:null,t.section?n.object.index.sections[t.section]?n.object.index.sections[t.section][o.key()]=!0:(n.object.index.sections[t.section]={},n.object.index.sections[t.section][o.key()]=!0):null,n.object.index[e][o.key()]=!0;var i=["metal"];t.tags=t.tags?a():i,n.object.posts[o.key()]=e,n.object.$save()})}function a(){console.error("New entries must have a name")}t.name?o():a()},rm:function(e,t){function a(){var a={bucket:"forgingtechnologies.com",access_key:"AKIAIYGVTJVFY77MNYCQ",secret_key:"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"};AWS.config.update({accessKeyId:a.access_key,secretAccessKey:a.secret_key}),AWS.config.region="us-west-2";var i=new AWS.S3,s={Bucket:a.bucket,Key:n.object[e][t].name};i.deleteObject(s,function(e,t){t||console.log("Check if you have sufficient permissions : "+e)}),n.media=o(n.refs.media).$loaded().then(function(o){n.object.media[t].tags?angular.forEach(n.object.media[t].tags,function(e){n.object.index.tags[e][t]=null}):null,o[n.object[e][t].name.replace(".","`")]=null,n.object[e][t]=null,n.object.posts[t]=null,n.object.index.media[t]=null,n.object.$save(),o.$save()})}function i(){angular.forEach(n.object.content[t].tags,function(e){n.object.index.tags[e][t]=null}),n.object.index.sections[n.object.content[t].section][t]=null,n.object[e][t]=null,n.object.index[e][t]=null,n.object.posts[t]=null,n.object.$save()}"media"===e?a():null,"media"!==e?i():null},saveSite:function(e){var t=o(n.refs.fb.child("site"));angular.forEach(e,function(e,n){t[n]=e}),t.$save().then(function(e){e.key()===t.$id},function(e){console.log("Error:",e)})},save:function(e,t,a,i){function c(){o(n.refs.fb.child(e)).$loaded().then(function(e){e[t]=a,e.$save().then(function(n){return e[t]},function(e){console.log("Error:",e)})})}function r(){d.tags&&d.sections?c():s(function(){r()},1e3)}function l(){return a.section!==i.section?(n.object.index.sections[i.section][t]=null,n.object.index.sections[a.section][t]=!0):null,d.sections=!0}function u(){console.log("checking tags",i.tags,a.tags);var e=[];return angular.forEach(a.tags,function(o){n.object.index.tags?null:n.object.index.tags={},-1===e.indexOf(o)?e.push(o):null,n.object.index.tags[o]?null:n.object.index.tags[o]={},n.object.index.tags[o][t]=!0}),angular.forEach(e,function(e){angular.forEach(i.tags,function(o){console.log(e,o),a.tags.indexOf(o)<0?n.object.index.tags[o][t]=null:null})}),a.tags=e,n.object.$save(),d.tags=!0}var d={};return a?null:a=n.object[e][t],i?null:i=a,JSON.stringify(i.tags)!==JSON.stringify(a.tags)?u():d.tags=!0,JSON.stringify(i.section)!==JSON.stringify(a.section)?l():d.sections=!0,r(),a},msg:function(e){var t=performance.now();console.log(performance.now()-t,e)}};return d}]),angular.module("numetal").factory("Data",["$firebaseObject","$firebaseArray","$firebaseAuth","State",function(e,t,n,o){var a="https://sizzling-fire-2548.firebaseio.com/data",i="https://sizzling-fire-2548.firebaseio.com/media",s=new Firebase(a),c=new Firebase("https://sizzling-fire-2548.firebaseio.com"),r=n(c);o.auth=r.$getAuth();for(var l=new Firebase(a).child("content"),u=new Firebase(i),d=e(s),f=["content","site","media","posts","index"],m={},g=f.length-1;g>=0;g--)m[f[g]]=t(s.child(f[g]));var p={index:{},object:{},array:[],refs:{media:u,fb:s,content:l}};return d.$loaded().then(function(e){p.object=e,p.array=m}),p}]),angular.module("numetal").factory("Facts",["Api","Data","State","Ux",function(e,t,n,o){for(;!(e&&t&&n&&o);)console.log("Awaiting DI");var a={api:e,data:t,state:n,ux:o};return a}]),angular.module("numetal").factory("State",["$state",function(e){var t={state:e,params:e.params,current:e.current,data:{},show:{}};return t}]),angular.module("numetal").factory("Ux",["$window","$rootScope",function(e,t){function n(){o.xy=[e.innerWidth,e.innerHeight]}var o={xy:[e.innerWidth,e.innerHeight],share:[{name:"facebook",color:"#3b5998"},{name:"google",color:"#f15b44"},{name:"twitter",color:"#00aced"},{name:"pinterest",color:"#c92228"},{name:"instagram",color:"#833ab4"}]};return angular.element(e).bind("resize",function(){n(),t.$apply(o.xy)}),o}]),angular.module("numetal").directive("posts",function(){return{templateUrl:"scripts/posts/posts-d.html",restrict:"EA",link:function(e,t,n){},controller:["$scope",function(e){}]}}),angular.module("numetal").directive("postsSingle",function(){return{templateUrl:"scripts/posts-single/posts-single-d.html",restrict:"EA",link:function(e,t,n){},controller:["$scope",function(e){}]}}),angular.module("numetal").config(["$stateProvider","$urlRouterProvider","$locationProvider",function(e,t,n){n.html5Mode(!0),n.hashPrefix("!"),t.otherwise("/"),e.state("metal",{url:"",template:"<layout></layout>","abstract":!0,controller:["Facts",function(e){var t=this;t.a=e.api,t.d=e.data,t.s=e.state,t.u=e.ux}],controllerAs:"metal"}).state("metal.home",{url:"/",template:"<posts></posts>",data:{head:{title:"Page title for this View",keywords:["Array","of","Keywords"],description:"your meta description",robots:"index,follow",canonical:"http://www.mySite.tld/home"}}}).state("metal.about",{url:"/about",template:'<content section="about" type="about"></content>',animation:{enter:"slide-in-right-fade",leave:"slide-out-left-fade",ease:"sine",speed:600}}).state("metal.about.about",{url:"/:about",template:'<content-single type="about" section="about"></content-single>'}).state("metal.services",{url:"/services",template:'<content type="services" section="services"></content>'}).state("metal.services.services",{url:"/:services",template:'<content-single type="services" section="services"></content-single>'}).state("metal.clients",{url:"/clients",template:'<content type="clients" section="clients"></content>'}).state("metal.clients.clients",{url:"/:clients",template:'<content-single type="clients" section="clients"></content-single>'}).state("metal.posts",{url:"/posts",template:'<content section="posts" type="posts"></content>'}).state("metal.posts.posts",{url:"/:posts",template:'<content-single section="posts" type="posts"></content-single>'}).state("metal.gallery",{url:"/gallery",template:'<content section="gallery" type="gallery"></content>'}).state("metal.gallery.gallery",{url:"/:gallery",template:'<content-single section="gallery" type="gallery"></content-single>'}).state("admin",{url:"/admin",template:"<ui-view></ui-view>",controller:["Facts",function(e){var t=this;t.a=e.api,t.d=e.data,t.s=e.state,t.u=e.ux}],controllerAs:"admin"}).state("admin.site",{url:"/site",template:'<admin type="site"></admin>',onEnter:["State",function(e){e.show.editSite=!0}],onExit:["State",function(e){e.show.editSite=!1}]}).state("admin.services",{url:"/services",template:'<admin type="services"></admin>'}).state("admin.clients",{url:"/clients",template:'<admin type="clients"></admin>'}).state("admin.media",{url:"/media",template:'<admin type="media"></admin>',onEnter:["State",function(e){e.show.showMedia=!0}],onExit:["State",function(e){e.show.showMedia=!1}]}).state("admin.messages",{url:"/messages",template:"<admin></admin>",onEnter:["State",function(e){e.show.messages=!0}],onExit:["State",function(e){e.show.messages=!1}]}).state("admin.posts",{url:"/posts",template:'<admin type="posts"></admin>',onEnter:["State",function(e){e.show.editPosts=!0}],onExit:["State",function(e){e.show.editPosts=!1}]})}]);var AWS=AWS;angular.module("numetal").directive("uploader",function(){return{restrict:"AE",templateUrl:"scripts/uploader/uploader-d.html",scope:{file:"@"},controller:["$scope","Api","$firebaseObject","Data","$timeout",function(e,t,n,o,a){e.uploadS3=function(){var i;console.info("Begin Uploading to S3",i=performance.now()),AWS.config.update({accessKeyId:e.creds.access_key,secretAccessKey:e.creds.secret_key}),AWS.config.region="us-west-2";var s=new AWS.S3({params:{Bucket:e.creds.bucket}}),c=Date.now(),r=[],l=n(o.refs.media);if(e.files.length)for(var u=[],d=[],f=[],m=e.files.length-1;m>=0;m--){d[m]=c+"-"+e.files[m].name,u[m]=e.files[m].type;var g={Key:d[m],ContentType:u[m],Body:e.files[m],ServerSideEncryption:"AES256"};s.putObject(g,function(t,n){return t?(console.error(t.message,t.code),!1):void setTimeout(function(){e.uploadProgress=0,e.$digest()},4e3)}).on("httpUploadProgress",function(t){e.uploadProgress=Math.round(t.loaded/t.total*100),e.$digest()}),f[m]=new FileReader,f[m].onload=function(e,t){return f[t].readAsDataURL(e),function(e){!function(n){var o=document.createElement("canvas"),i=o.getContext("2d"),s=n,c=new Image;c.src=s;var u=160,f=c.width/u;return o.width=u,o.height=c.height/f,i.drawImage(c,0,0,o.width,o.height),r[t]=o.toDataURL("image/jpeg",.75),l.$loaded().then(function(e){e[d[t].replace(".","`")]=r[t],a(e.$save(),5e3)}),e.target.result}(e.target.result)}}(e.files[m],m),t.add("media",{src:"https://s3-us-west-2.amazonaws.com/forgingtechnologies.com/"+d[m],type:u[m],name:d[m]})}else console.error("Please select a file to upload");console.info("End Upload to S3",performance.now()-i)}}],link:function(e,t,n){e.creds={bucket:"forgingtechnologies.com",access_key:"AKIAIYGVTJVFY77MNYCQ",secret_key:"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"},t.bind("change",function(t){var n=t.target.files,o=n[0];e.files=n,e.file=o,e.$parent.file=o,e.$apply()})}}});