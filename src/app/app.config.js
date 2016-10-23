angular.module('app.config', [])
    .config(['$compileProvider', '$resourceProvider', '$httpProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider', 'resolutionCheckerProvider', 'localStorageServiceProvider', '$provide', 'AnalyticsProvider', 'vcRecaptchaServiceProvider', ($compileProvider, $resourceProvider, $httpProvider, $stateProvider, $urlRouterProvider, $locationProvider, resolutionCheckerProvider, localStorageServiceProvider, $provide, AnalyticsProvider, vcRecaptchaServiceProvider) => {

        // Analytics Configuration.
        AnalyticsProvider.setAccount('UA-79218130-1');
        AnalyticsProvider.ignoreFirstPageLoad(true);
        AnalyticsProvider.setPageEvent('$stateChangeSuccess');

        // Enabled debug info classes as "ng-scope".
        $compileProvider.debugInfoEnabled(false);

        // Set for all headers "withCredentials" param.
        $httpProvider.defaults.withCredentials = true;

        // adding property 'next' to $state object for changing states dynamically by their name
        $provide.decorator('$state', function ($delegate, $rootScope) {
            $rootScope.$on('$stateChangeStart', function (event, state, params) {
                $delegate.next = state;
                $delegate.toParams = params;
            });
            return $delegate;
        });

        // Set prefix for localstorage.
        localStorageServiceProvider.setPrefix('hgs');

        // if url does not match any of the states, go to homepage
        $urlRouterProvider.otherwise('404');

        // configuration initialization for the app's different resolution changes
        resolutionCheckerProvider.init({mobile: 720, tabletSmall: 770, tablet: 1024, desktop: 1200});

        // google recaptcha config
        // account details under google account dev@hedgestonegroup.com
        vcRecaptchaServiceProvider.setDefaults({
            key: '6Lch2ScTAAAAABmdXiDw8w2fw8_nJuyj20tm2GV5'
            // theme: '---- light or dark ----',
            // stoken: '6Lch2ScTAAAAAAHdMnPPezAGXK97_sA0THWHQOQD',
            // size: '---- compact or normal ----',
            // type: '---- audio or image ----'
        });

        // The url for the directory that holds the pages' jsons
        var pagesUrl = (window.location.host !== 'localhost:8080') ? '/pages/' : '../app/components/page/jsons/';

        // The url for the Hedgestone mobile application in Google's play store
        var mobileAppUrl = 'https://play.google.com/store/apps/details?id=com.spotoption.android.hedgestonegroup';

        // Set html5mode only for not localhost servers.
        if (window.location.host !== 'localhost:8080' && window.history && history.pushState)
            $locationProvider.html5Mode(true);

        // Set share controller to every page that take the page json and insert him to page component.
        let controllerRef = (pageResolver, $scope) => {
            $scope.stateData = pageResolver;
        };

        // Set Block Country logic for every status we get.
        let blockCountryLogic = (status, popupsService, $state, $q) => {
            if (window.location.host !== 'localhost:8080') {
                let fullBlockStatus = 0;
                // let freeBlockStatus = 1;
                let semiBlockStatus = 2;
                if (status === fullBlockStatus) {
                    popupsService.popItUp({
                        type: 'popup',
                        settemplate: 'simple',
                        cancel: function () {
                            this.popupsService.popItDown();
                            this.$state.go('about');
                        }
                    });
                    return false;
                } else if (status === semiBlockStatus && $state.next.name === "create_account") {
                    popupsService.popItUp({
                        type: 'popup',
                        settemplate: 'custom',
                        headline: 'We\'re Sorry',
                        content: 'Unfortunately, due to our regulations your location is banned from doing the requested action',
                        cancel: function () {
                            this.popupsService.popItDown();
                            this.$state.go('about');
                        }
                    });
                    return $q.reject();
                }
                return true;
            }
        };

        // Launch block country logic
        let blockCountry = (userService, popupsService, $state, $q) => {
            userService.isUserCountryBlocked().then((response) => {
                blockCountryLogic(Number(response), popupsService, $state, $q);
            });
        };

        // Resolving each page - getting the matching json
        let pageResolver = ($http, $state, loadingFrameService, contentDataService) => {
            // TODO: get json matching the resolution
            loadingFrameService.startLoading();
            return contentDataService.getPage(pagesUrl).then((response) => {
                if ($state.next.name !== 'trade')
                    loadingFrameService.stopLoading();
                return response;
            });
        };

        // verify stateParams for article and video states so no empty view  l be presented.
        // TODO: maybe route the url containing the category to latest_news state with the active tab of that category
        let verifyStateParams = ($stateParams, $state, $timeout) => {
            $timeout(() => {
                if (!($stateParams.name || $stateParams.id)) {
                    $state.go('home')
                }
            }, 0);
        };


        $stateProvider
        // =========== IMPORTANT: pages files should have the same name as the state's name =========== //
            .state('home', {
                url: "/",
                template: "<page data='stateData'></page>",
                resolve: {
                    pageResolver,
                    blockCountry
                },
                controller: controllerRef,
                controllerAs: "state"
            })
            .state('financials', {
                url: "/financials",
                template: "<page data='stateData'></page>",
                resolve: {
                    pageResolver,
                    blockCountry
                },
                controller: controllerRef,
                controllerAs: "state"
            })
            .state('login', {
                url: "/login?email&password&extRedir",
                template: "<page data='stateData'></page>",
                resolve: {
                    pageResolver: (resolutionChecker, loadingFrameService) => {
                        loadingFrameService.stopLoading();
                        if (resolutionChecker.isMobile()) {
                            return require('./components/page/jsons/login-mobile.json')
                        } else return require('./components/page/jsons/login.json');
                    },
                    blockCountry
                },
                controller: controllerRef,
                controllerAs: "state"
            })
            .state('trade', {
                url: "/trade",
                template: "<page data='stateData'></page>",
                resolve: {
                    checkMobile: (resolutionChecker, $state, $q, loadingFrameService, $timeout) => {
                        if (resolutionChecker.isMobile()) {
                            $timeout(()=> {
                                $state.go('tools')
                            }, 0);
                            if ($state.current.name === 'tools') {
                                $timeout(()=> {
                                    loadingFrameService.stopLoading()
                                }, 0);
                                $state.go('tools');
                            }
                            return $q.reject();
                        }
                    },
                    pageResolver: (resolutionChecker, loadingFrameService) => {
                        loadingFrameService.startLoading();
                        if (resolutionChecker.checkResolution() === 'tablet' || resolutionChecker.checkResolution() === 'tabletSmall' ) {
                            return require('./components/page/jsons/trade-tablet.json')
                        } else {
                            return require('./components/page/jsons/trade.json');
                        }
                    },
                    loggedinPage: (userService, authService, $q, $state, popupsService, loadingFrameService) => {
                        return authService.isUserLogging()
                            .then(() => true)
                            .catch(() => {
                                loadingFrameService.stopLoading();
                                $state.go('home');
                            });
                    },
                    blockCountry
                },
                controller: controllerRef,
                controllerAs: "state"
            })
            .state('deposit', {
                url: "/deposit/:deposit",
                template: "<page data='stateData'></page>",
                resolve: {
                    pageResolver: (authService, userService, $http, $state, loadingFrameService, $location, localStorageService) => {

                        loadingFrameService.startLoading();
                        return authService.isUserLogging()
                            .then(() => {
                                if(!_.isUndefined($location.$$search.promoCode)) {
                                    localStorageService.set('promoCode', $location.$$search.promoCode);
                                    if(!_.isUndefined($location.$$search.amount))
                                        localStorageService.set('amount', $location.$$search.amount);
                                }

                                if (!userService.userData.userSession.ftd) {
                                //if (true) {
                                    return $http.get(`${pagesUrl}deposit.json`).then((response) => {
                                        loadingFrameService.stopLoading();
                                        return response.data;
                                    });
                                } else {
                                    return $http.get(`${pagesUrl}depositThreeD.json`).then((response) => {
                                        loadingFrameService.stopLoading();
                                        return response.data;
                                    });
                                }
                            })
                            .catch(() => {
                                if(!_.isUndefined($location.$$search.promoCode)) {
                                    localStorageService.set('promoCode', $location.$$search.promoCode);
                                    if(!_.isUndefined($location.$$search.amount))
                                        localStorageService.set('amount', $location.$$search.amount);
                                    $state.go('login');
                                } else {
                                    $state.go('home');
                                }
                            });
                    },
                    loggedinPage: (userService, authService, $q, $state, loadingFrameService) => {
                        if (!userService.userData.loginTried) {
                            loadingFrameService.stopLoading();
                            return authService.isUserLogging().then(() => true).catch(() => $state.go('home'));
                        } else {
                            return authService.isUserLogging().then(() => true).catch(() => $q.reject());
                        }
                    },
                    blockCountry
                },
                controller: controllerRef,
                controllerAs: "state"
            })
            .state('forgot_password', {
                url: "/forgot_password",
                template: "<page data='stateData'></page>",
                resolve: {
                    pageResolver,
                    blockCountry
                },
                controller: controllerRef,
                controllerAs: "state"
            })
            .state('verify_token', {
                url: "/verify_token",
                template: "<page data='stateData'></page>",
                resolve: {
                    // TODO: Fix page auth for this state
                    //pageAuth: (userService, $state, $timeout, $q) => {
                    //    if (typeof userService.userData.resetPassword.email === 'undefined') {
                    //        $timeout(()=> {
                    //            $state.go('forgot_password');
                    //        }, 0);
                    //        return $q.reject();
                    //    }
                    //},
                    pageResolver,
                    blockCountry
                },
                controller: controllerRef,
                controllerAs: "state"
            })
            .state('reset_password', {
                url: "/reset_password",
                template: "<page data='stateData'></page>",
                resolve: {
                    pageAuth: (userService, $state, $timeout, $q) => {
                        if (typeof userService.userData.resetPassword.token === 'undefined') {
                            if (typeof userService.userData.resetPassword.email === 'undefined') {
                                $timeout(()=> {
                                    $state.go('forgot_password');
                                }, 0);
                                return $q.reject();
                            }
                            $timeout(()=> {
                                $state.go('verify_token');
                            }, 0);
                            return $q.reject();
                        }
                    },
                    pageResolver,
                    blockCountry
                },
                controller: controllerRef,
                controllerAs: "state"
            })
            .state('create_account', {
                url: "/create_account",
                template: "<page data='stateData'></page>",
                resolve: {
                    pageResolver: (localStorageService, $location, loadingFrameService) => {
                        if (typeof $location.$$search.utm_campaign !== 'undefined') {
                            localStorageService.set('utm_campaign', $location.$$search.utm_campaign);
                        }
                        loadingFrameService.stopLoading();
                        return require('./components/page/jsons/create_account.json');
                    },
                    blockCountry
                },
                controller: controllerRef,
                controllerAs: "state"
            })
            .state('about', {
                url: "/about",
                template: "<page data='stateData'></page>",
                resolve: {
                    pageResolver
                },
                controller: controllerRef,
                controllerAs: "state"
            })
            .state('education', {
                url: "/education",
                template: "<page data='stateData'></page>",
                resolve: {
                    pageResolver,
                    blockCountry
                },
                controller: controllerRef,
                controllerAs: "state"
            })
            .state('faq', {
                url: "/faq/:faq",
                template: "<page data='stateData'></page>",
                resolve: {
                    pageResolver,
                    blockCountry
                },
                controller: controllerRef,
                controllerAs: "state"
            })
            .state('account', {
                url: "/account/:account/:accountActivity",
                params: {
                    account: "Account Settings",
                    accountSettings: "Trading Activity"
                },
                template: "<page data='stateData'></page>",
                resolve: {
                    loggedinPage: (userService, authService, $q, $state, loadingFrameService) => {
                        if (!userService.userData.loginTried) {
                            loadingFrameService.stopLoading();
                            return authService.isUserLogging().then(() => true).catch(() => $state.go('home'));
                        } else {
                            return authService.isUserLogging().then(() => true).catch(() => $q.reject());
                        }
                    },
                    pageResolver: (resolutionChecker) => {
                        if(resolutionChecker.isMobile())
                            return require('./components/page/jsons/account-mobile.json');
                        else if(resolutionChecker.isTablet() || resolutionChecker.isSmallTablet())
                            return require('./components/page/jsons/account-tablet.json');
                        else return require('./components/page/jsons/account.json');
                    },
                    blockCountry
                },
                controller: controllerRef,
                controllerAs: "state"
            })
            .state('logout', {
                //template: "<page data='stateData'></page>",
                url: "/logout",
                resolve: {
                    pageResolver: (authService, $state, $location, $q, loadingFrameService) => {
                        loadingFrameService.startLoading();
                        // TODO: add the option to logout to login page with stage go.
                        authService.isUserLogging().then(() => {
                            authService.loggingOut().then(() => {
                                if (typeof $location.$$search.login !== 'undefined') {
                                    $state.go('login');
                                } else {
                                    $state.go('home');
                                }
                            });
                        }).catch(() => {
                            if (typeof $location.$$search.login !== 'undefined') {
                                $state.go('login');
                            } else {
                                $state.go('home');
                            }
                        });
                        //$state.go('home');
                        //return $q.reject();
                    },
                    blockCountry
                },
                controller: controllerRef,
                controllerAs: "state"
            })
            .state('latest_news', {
                url: "/latest_news/:latest_news",
                template: "<page data='stateData'></page>",
                resolve: {
                    pageResolver,
                    blockCountry
                },
                controller: controllerRef,
                controllerAs: "state"

            })
            .state('legal', {
            url: "/legal",
            template: "<page data='stateData'></page>",
            resolve: {
                pageResolver: (resolutionChecker) => {
                    if(resolutionChecker.isMobile()) {
                        return require('./components/page/jsons/legal-mobile.json');
                    }
                    else return require('./components/page/jsons/legal.json');
                },
                blockCountry
            },
            controller: controllerRef,
            controllerAs: "state"
            })
            .state('verification_guide', {
                url: "/verification_guide",
                resolve: {
                    pageResolver: ($window, $q) => {
                        $window.open('https://www.hedgestonegroup.com/assets/guides/Verification_Guide.pdf', '_blank');
                        return $q.reject()
                    },
                    blockCountry
                },
                controller: controllerRef,
                controllerAs: "state"
            })
            .state('article', {
                url: "/article/:category/:name",
                params: {
                    id: null,
                    category: null,
                    action: null,
                    name: null
                },
                template: "<page data='stateData'></page>",
                resolve: {
                    pageResolver,
                    blockCountry,
                    verifyStateParams
                },
                controller: controllerRef,
                controllerAs: "state"
            })
            .state('video', {
                url: "/video/:category/:name",
                params: {
                    id: null,
                    category: null,
                    action: null,
                    name: null
                },
                template: "<page data='stateData'></page>",
                resolve: {
                    pageResolver,
                    blockCountry,
                    verifyStateParams
                },
                controller: controllerRef,
                controllerAs: "state"
            })
            .state('tools', {
                url: "/tools:section",
                template: "<page data='stateData'></page>",
                resolve: {
                    pageResolver,
                    blockCountry
                },
                params: {
                    section: ""
                },
                controller: controllerRef,
                controllerAs: "state"
            })
            .state('guides', {
                url: "/guides",
                template: "<page data='stateData'></page>",
                resolve: {
                    pageResolver,
                    blockCountry
                },
                controller: controllerRef,
                controllerAs: "state"
            })
            .state('download', {
                template: "<page data='stateData'></page>",
                resolve: {
                    pageResolver: ($q, $window, popupsService, loadingFrameService) => {
                        if ($window.navigator.platform === 'iPhone' || $window.navigator.platform === 'iPad') {
                            popupsService.popItUp({
                                type: 'popup',
                                settemplate: 'custom',
                                headline: 'We\'re Sorry',
                                content: "The iOS mobile application is not available.<br/> <b>Coming Soon!</b>"
                            });
                        } else {
                            $window.open(mobileAppUrl);
                        }
                        loadingFrameService.stopLoading();
                        return $q.reject();
                    }
                },
                controller: controllerRef,
                controllerAs: "state"
            })
            .state('404', {
                url: "/404",
                template: "<page data='stateData'></page>",
                resolve: {
                    pageResolver: ($q, userService, $state, $timeout) => {
                        $timeout(() => {
                            if (userService.userData.isUserLogin) {
                                $state.go('trade');
                            } else {
                                $state.go('login');
                            }
                        }, 0);
                        return $q.reject();
                    }
                },
                controller: controllerRef,
                controllerAs: "state"
            })
            .state('bonus_policy', {
                url: "/bonus_policy",
                template: "<page data='stateData'></page>",
                resolve: {
                    pageResolver,
                    blockCountry
                },
                controller: controllerRef,
                controllerAs: "state"
            })
            // .state('promotion', {
            //     url: "/promotion",
            //     template: "<page data='stateData'></page>",
            //     resolve: {
            //         pageResolver,
            //         blockCountry
            //     },
            //     controller: controllerRef,
            //     controllerAs: "state"
            // })
            .state('withdrawal', {
                url: "/withdrawal",
                template: "<page data='stateData'></page>",
                resolve: {
                    pageResolver,
                    blockCountry,
                    loggedinPage: (userService, authService, $q, $state, loadingFrameService) => {
                        if (!userService.userData.loginTried) {
                            loadingFrameService.stopLoading();
                            return authService.isUserLogging().then(() => true).catch(() => $state.go('home'));
                        } else {
                            return authService.isUserLogging().then(() => true).catch(() => $q.reject());
                        }
                    }
                },
                controller: controllerRef,
                controllerAs: "state"
            });
    }]);
