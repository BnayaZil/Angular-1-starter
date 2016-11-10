/*
 Created by bnaya on 23/10/16,
 @Component Name: header.drv
 @Description:
 @Params: 
 @Return: 
 @Methods: 
*/
import './header.less';

class headerController {
    constructor() {
        this.tabs = [
            {
                title: 'Favorites',
                state: 'favorites'
            },
            {
                title: 'Options',
                state: 'options'
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

export default angular.module('app.header', [])
    .component('header', headerConfig);