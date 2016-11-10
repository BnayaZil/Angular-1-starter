import 'angular';
import uiRouter from 'angular-ui-router';
import angularGoogleAnalytics from 'angular-google-analytics';
import angularLocalStorage from 'angular-local-storage';
import ngMaterial from 'angular-material';
import ngAria from 'angular-aria';
import ngAnimate from 'angular-animate';
import shared from  './shared/shared';
import components from  './components/components';
import config from './app.config';

import './app.less';


const app = angular.module('app', [uiRouter, angularGoogleAnalytics.name, angularLocalStorage, ngMaterial, ngAria, ngAnimate, config.name, shared.name, components.name]);
const template = require('./app.tpl.html');

class AppController {
    constructor() {
        'ngInject';
    }
}

const appConfig = {
    restrict: 'E',
    controller: AppController,
    controllerAs: 'vm',
    template
};

app.component('app', appConfig);

angular.bootstrap(document, ['app'], {
    strictDi: true
});
