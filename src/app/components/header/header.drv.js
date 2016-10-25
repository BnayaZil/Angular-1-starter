/*
 Created by bnaya on 23/10/16,
 @Component Name: header.drv
 @Description:
 @Params: 
 @Return: 
 @Methods: 
*/
import headerTab from './header-tab/header-tab.drv';
import './header.less';

export default angular.module('app.header', [headerTab.name])
    .component('header', headerConfig);

const template = require('./header.tpl.html');

function headerConfig() {
    return {
        restrict: 'E',
        bindings: {},
        template,
        controller: headerController,
        controllerAs: 'vm'
    }
}

class headerController {
    constructor() {
        console.log(`I'm header :]`)
    }

}