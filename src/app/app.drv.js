import '../assets/less/general.less';
import './app.less';
import 'angular';
import 'angular-ui-router';
import 'angular-google-analytics';
import { Bonus } from  './shared/services/bonus/bonus.srv';
import './shared/providers/resolution/resolution.pvdr.js';

import './app.less';
import './app.config';

const app = angular.module('app', ['ui.router', 'app.providers', 'angular-google-analytics', 'app.config']);
const template = require('./app.tpl.html');

app.directive('app', appConfig);

function appConfig() {
    return {
        controller: AppController,
        controllerAs: 'app',
        template,
        replace: true
    }
}

class AppController {
    constructor() {
        'ngInject';
    }
}

app.service('logsHandlerService', LogsHandler);
app.factory('domFactory', () => new DomGenerator());


angular.bootstrap(document, ['app'], {
    strictDi: true
});
