/*
 Created by bnaya on 23/10/16,
 @Component Name: footer.drv
 @Description:
 @Params: 
 @Return: 
 @Methods: 
*/

import './footer.less';

class footerController {
    constructor() {
        console.log(`I'm footer :]`);
    }
}

const template = require('./footer.tpl.html');

const footerConfig = {
    restrict: 'E',
    bindings: {},
    template,
    controller: footerController,
    controllerAs: 'vm'
};

export default angular.module('app.components.footer', [])
    .component('footer', footerConfig);