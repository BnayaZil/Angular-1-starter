/*
 Created by bnaya on 23/10/16,
 @Component Name: header.drv
 @Description:
 @Params: 
 @Return: 
 @Methods: 
*/

import './header-tab.less';

class HeaderTabController {
    constructor() {
        console.log(`I'm headerTab :]`);
    }
}

const template = require('./header-tab.tpl.html');

const headerTabConfig = {
    restrict: 'E',
    bindings: {
        data: '='
    },
    template,
    controller: HeaderTabController,
    controllerAs: 'vm'
};

export default angular.module('app.components.header.headerTab', [])
    .component('headerTab', headerTabConfig);