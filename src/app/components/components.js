import footer from './footer/footer.drv';
import header from './header/header.drv';

const sharedModule = angular.module('app.components', [
    footer.name,
    header.name
]);

export default sharedModule;