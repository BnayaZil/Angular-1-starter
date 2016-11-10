const config = angular.module('app.config', [])
    .config(['$compileProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider', 'localStorageServiceProvider', '$provide', 'AnalyticsProvider', ($compileProvider, $stateProvider, $urlRouterProvider, $locationProvider, localStorageServiceProvider, $provide, AnalyticsProvider) => {

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

        localStorageServiceProvider.setPrefix('favorite');

        // if url does not match any of the states, go to homepage
        $urlRouterProvider.otherwise('options');

        // Set html5mode only for not localhost servers.
        if (window.location.host !== 'localhost:8080' && window.history && history.pushState)
            $locationProvider.html5Mode(true);


        $stateProvider
            .state('options', {
                url: "/options",
                template: `<md-content><options-list data="vm.optionsData"></options-list></md-content>`,
                controller: function(optionsData) {
                    this.optionsData = optionsData;
                },
                resolve: {
                    optionsData: (dataService) => dataService.asyncData
                },
                controllerAs: "vm"
            })
            .state('favorites', {
                url: "/favorites",
                template: `<md-content><favorites-list data="vm.favoritesData"></favorites-list></md-content>`,
                controller: function(favoritesData) {
                    this.favoritesData = favoritesData;
                },
                resolve: {
                    favoritesData: (dataService) => dataService.getFavorites()
                },
                controllerAs: "vm"
            })
    }]);

export default config;