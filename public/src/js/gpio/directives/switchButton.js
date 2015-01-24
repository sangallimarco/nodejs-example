angular.module('app.gpio')
.directive('switchButton', ['gpioService',
	function (gpioService) {
		return {
			template: '<div><div class="btn-group" role="group"> <button type="button" ng-class="{active: !status, \'btn-danger\':!status}" class="btn" ng-click="toggle(false)">Off</button> <button type="button" class="btn" ng-class="{active: status, \'btn-success\': status}" ng-click="toggle(true)">On</button></div> <span>{{label}}</span> </div>',
			replace: true,
			restrict: 'E',
			scope: {
				label: '@',
				pin: '@',
				status: '='
			},
			link: function (scope, element, attrs) {

				scope.toggle = function (status) {
					var ostatus = status;
					scope.status = status;

					gpioService.set(scope.pin, scope.status)
					.then(
						function(obj) {
							scope.error = null;
						},
						function(err) {
							scope.error = err.data.error;
							scope.status = ostatus;
						}
					);
				};

			}
		};
	}
]);