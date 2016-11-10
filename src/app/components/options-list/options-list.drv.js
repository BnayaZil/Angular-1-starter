/*
 Created by bnaya on 23/10/16,
 @Component Name: optinos-list.drv
 @Description:
 @Params: 
 @Return: 
 @Methods: 
*/

import './options-list.less';

class optionsController {
    constructor(dataService) {
        'ngInject';
        this.dataService = dataService;
    }

    checking(item, index) {
        if(item.checked)
            this.dataService.addFavorite(item);
        else
            this.dataService.removeFavorite(item);
    }
}

const template = require('./options-list.tpl.html');

const optionsListConfig = {
    restrict: 'E',
    bindings: {
        data: '='
    },
    template,
    controller: optionsController,
    controllerAs: 'vm'
};

export default angular.module('app.components.optionsList', [])
    .component('optionsList', optionsListConfig);