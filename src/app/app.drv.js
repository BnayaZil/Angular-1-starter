import 'angular';
import uiRouter from 'angular-ui-router';
import angularGoogleAnalytics from 'angular-google-analytics';
import angularLocalStorage from 'angular-local-storage';
import shared from  './shared/shared';
import components from  './components/components';
import config from './app.config';

import './app.less';
// import '../assets/less/general.less';


const app = angular.module('app', [uiRouter, angularGoogleAnalytics.name, angularLocalStorage, config.name, shared.name, components.name]);
const template = require('./app.tpl.html');

class AppController {
    constructor() {
        'ngInject';
        console.log('Im in app!');
    }
}

const appConfig = {
    restrict: 'E',
    controller: AppController,
    controllerAs: 'vm',
    template
};

app.component('app', appConfig);


// app.service('logsHandlerService', LogsHandler);
// app.factory('domFactory', () => new DomGenerator());


angular.bootstrap(document, ['app'], {
    strictDi: true
});
