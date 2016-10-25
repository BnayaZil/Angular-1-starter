/*
 Created by bnaya on 23/10/16,
 @Component Name: header.drv
 @Description:
 @Params: 
 @Return: 
 @Methods: 
*/

import './header-tab.less';

export default angular.module('app.components.header.headerTab', [])
    .component('footer', footerConfig);

const template = require('./header-tab.tpl.html');

function footerConfig() {
    return {
        restrict: 'E',
        bindings: {
            data: '='
        },
        template,
        controller: footerController,
        controllerAs: 'vm'
    }
}

class footerController {
    constructor() {
        console.log(`I'm footer :]`);
    }
}