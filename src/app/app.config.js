const config = angular.module('app.config', [])
    .config(['$compileProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider', 'localStorageServiceProvider', '$provide', 'AnalyticsProvider', ($compileProvider, $stateProvider, $urlRouterProvider, $locationProvider, localStorageServiceProvider, $provide, AnalyticsProvider) => {

        // Analytics Configuration.
        AnalyticsProvider.setAccount('UA-44441111-2');
        AnalyticsProvider.ignoreFirstPageLoad(true);
        AnalyticsProvider.setPageEvent('$stateChangeSuccess');

        // Enabled debug info classes as "ng-scope".
        $compileProvider.debugInfoEnabled(false);

        // adding property 'next' to $state object for changing states dynamically by their name
        $provide.decorator('$state', function ($delegate, $rootScope) {
            $rootScope.$on('$stateChangeStart', function (event, state, params) {
                $delegate.next = state;
                $delegate.toParams = params;
            });
            return $delegate;
        });

        // Set prefix for localstorage. * replace the 'ProjectName' *
        localStorageServiceProvider.setPrefix('ProjectName');

        // if url does not match any of the states, go to homepage
        $urlRouterProvider.otherwise('404');

        // Set html5mode only for not localhost servers.
        if (window.location.host !== 'localhost:8080' && window.history && history.pushState)
            $locationProvider.html5Mode(true);


        $stateProvider
            .state('home', {
                url: "/",
                template: "<div>Home page</div>",
                controller: () => {
                    console.log(`I'm home.`);
                },
                controllerAs: "vm"
            })
            .state('404', {
                url: "/",
                template: "<div>Opss.. 404 Page</div>",
                controller: () => {
                    console.log(`I'm 404.`);
                },
                controllerAs: "vm"
            })
    }]);

export default config;