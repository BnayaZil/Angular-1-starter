import data from './services/data/data.srv';

const sharedModule = angular.module('app.shared', [
    data.name
]);

export default sharedModule;