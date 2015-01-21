angular.module('app',
	[
		'ngStorage',
		'ui.router',
		'ui.bootstrap',
		'app.auth',
		'app.bootstrap',
		'app.navigation',
		'app.home',
		'app.test',
		'app.weather'
	]
)
.config(['$compileProvider', '$logProvider', '$stateProvider', '$urlRouterProvider',
	function ($compileProvider, $logProvider, $stateProvider, $urlRouterProvider) {

		// dev/production
		$compileProvider.debugInfoEnabled(true);
		$logProvider.debugEnabled(true);

		$urlRouterProvider.otherwise("/app");

		$stateProvider
		.state('app', {
			url:'/app',
			templateUrl: 'partials/app/index.html',
			controller: 'navigationController'
		});

	}
]);
