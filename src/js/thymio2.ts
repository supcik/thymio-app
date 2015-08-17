///<reference path="thymio2.d.ts" />

var thymio2 = angular.module('thymio2', []);

thymio2.factory('ThymioService', ['$rootScope', '$log', '$q', function($rootScope, $log, $q) {
	var self = this;
	var devices;

	function refreshDevices() {
		chrome.serial.getDevices(function(ports) {
			$rootScope.$apply(function() {
				devices = ports;
			});
		});
	}

	chrome.usb.onDeviceAdded.addListener(function(device) {
		refreshDevices();
	});

	chrome.usb.onDeviceRemoved.addListener(function(device) {
		refreshDevices();
	});

	refreshDevices();

	return {
		portList: function() {
			return devices;
		},
		connect: function(port) {
			$log.debug("Connect to " + port);

			chrome.serial.onReceive.addListener(function(info) {
				$log.debug("Message received : " + info.data.byteLength + " bytes");
				var x = new Uint8Array(info.data);
				$log.debug(">" + x[0]);
			});

			return $q(function(resolve, reject) {
				chrome.serial.connect(port, { 'bitrate': 115200 }, function(connectionInfo) {
					if (chrome.runtime.lastError !== undefined) {
						reject(chrome.runtime.lastError.message)
					} else if (connectionInfo !== undefined) {
						$log.debug("Connected to " + JSON.stringify(connectionInfo));
						resolve(connectionInfo)
					} else {
						reject("undefined error")
					}
				})	
			});
		},

		getDescription: function(connection) {
			var buffer = new ArrayBuffer(8);
			var dv = new DataView(buffer);
			dv.setInt16(0, 2, true); // len
			dv.setInt16(2, 0, true); // source
			dv.setInt16(4, 0xA000, true); // type
			dv.setInt16(6, 4, true); // version
			console.debug("Sending message")
			return connection.then(
				function(connection) {
					return $q(function(resolve, reject) {
						chrome.serial.send(connection.connectionId, buffer, function(sendInfo) {
							if (chrome.runtime.lastError !== undefined) {
								reject(chrome.runtime.lastError.message)
							} else if (sendInfo !== undefined) {
								$log.debug("Message sent");
								resolve(sendInfo);
							} else {
								reject("undefined error")
							}
						});
					});
				},
				function(reason) { 
					return $q.reject(reason);
				}
			);
		}
	}
}]);

thymio2.filter('devname', [function() {
	return function(input) {
		if (input.displayName) {
			return input.displayName + ' (' + input.path + ')';
		} else {
			return input.path;
		}
	}
}]);
