import {user} from './services/user';

const sharedModule = angular.module('app.shared', [
    user.name
]);

export default sharedModule;