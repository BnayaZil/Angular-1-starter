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

class headerController {
    constructor() {
        console.log(`I'm header :]`);
        this.tabs = [
            {
                title: 'home',
                state: 'home'
            },
            {
                title: '404',
                state: '404'
            }
        ]
    }
}

const template = require('./header.tpl.html');

const headerConfig = {
    restrict: 'E',
    bindings: {},
    template,
    controller: headerController,
    controllerAs: 'vm'
};

export default angular.module('app.header', [headerTab.name])
    .component('header', headerConfig);