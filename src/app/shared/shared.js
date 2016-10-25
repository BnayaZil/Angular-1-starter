import {user} from './services/user/user.srv';

const sharedModule = angular.module('app.shared', [
    user.name
]);

export default sharedModule;