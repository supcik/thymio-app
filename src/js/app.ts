///<reference path="app.d.ts" />

var thymioApp = angular.module('thymioApp', ['thymio2']);

thymioApp.controller('ThymioCtrl', ['$rootScope', '$log', 'ThymioService', function($rootScope, $log, ThymioService) {
	var self = this
	self.port = null;
	
	self.devices = function() {
		return ThymioService.portList();
	}

	self.getdesc = function() {
		var c = ThymioService.connect(self.port);
		ThymioService.getDescription(c);
		ThymioService.getDescription(c);

	}
	
}]);

