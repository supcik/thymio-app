///<reference path="app.d.ts" />
var thymioApp = angular.module('thymioApp', []);

thymioApp.controller('ThymioCtrl', ['$scope', function($scope) {
	$scope.status = "Not Connected";
	$scope.devices = [{ 'displayName': 'not connected' }];

	chrome.serial.getDevices(function(ports){
		var scope = angular.element($("#bodyController")).scope();
 		scope.$apply(function() {
			scope.devices = ports;
		});
	})
	// $scope.connectd = function() {
	// 	console.debug("Button pressed");
	// 	chrome.usb.getUserSelectedDevices(
	// 		{
	// 			'multiple': false,
	// 			// 'filters': [{ 'vendorId': 0x0617 }]
	// 		},
	// 		function(selected_devices) {
	// 			console.debug("In function");
	// 			console.debug(selected_devices.length)
	// 			var scope = angular.element($("#bodyController")).scope();
	// 			scope.$apply(function() {
	// 				scope.devices = selected_devices;
	// 				scope.status = "Connected";
	// 			});
	// 		}
	// 	);
	//	console.debug("End of process");
	//};
}]);

thymioApp.filter('devname', function() {
	return function(input) {
		if (input.displayName) {
			return input.displayName + '(' + input.path + ')';
		} else {
			return input.path;
		}
	}
});