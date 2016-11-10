import header from './header/header.drv';
import optionsList from './options-list/options-list.drv';
import favoritesList from './favorites-list/favorites-list.drv';

const sharedModule = angular.module('app.components', [
    header.name,
    optionsList.name,
    favoritesList.name
]);

export default sharedModule;