/*
 Created by bnaya on 23/10/16,
 @Component Name: optinos-list.drv
 @Description:
 @Params: 
 @Return: 
 @Methods: 
*/

import './favorites-list.less';

class favoritesListController {
    constructor($scope, dataService) {
        'ngInject';
        this.dataService = dataService;
        this.$scope = $scope;
        this.init();
    }

    init() {
        this.$scope.$on('favoritesUpdated', () => {
            this.data = this.dataService.getFavorites();
        });
    }

    removeItem(item, index) {
        this.dataService.removeFavorite(item, index);
    }

    updateItem(item, index) {
        this.dataService.updateFavorite(item, index);
    }
}

const template = require('./favorites-list.tpl.html');

const favoritesListConfig = {
    restrict: 'E',
    bindings: {
        data: '='
    },
    template,
    controller: favoritesListController,
    controllerAs: 'vm'
};

export default angular.module('app.components.favoritesList', [])
    .component('favoritesList', favoritesListConfig);