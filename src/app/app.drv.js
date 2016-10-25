import 'angular';
import 'angular-ui-router';
import 'angular-google-analytics';
import { shared } from  './shared/shared';
import { components } from  './components/components';
import { config } from './app.config';

import './app.less';
// import '../assets/less/general.less';


const app = angular.module('app', ['ui.router', 'app.providers', 'angular-google-analytics', config.name, shared.name, components.name]);
const template = require('./app.tpl.html');

app.component('app', appConfig);

function appConfig() {
    return {
        bindings: {},
        controller: AppController,
        controllerAs: 'vm',
        template
    }
}

class AppController {
    constructor() {
        'ngInject';
    }
}

// app.service('logsHandlerService', LogsHandler);
// app.factory('domFactory', () => new DomGenerator());


angular.bootstrap(document, ['app'], {
    strictDi: true
});
