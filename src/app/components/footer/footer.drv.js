/*
 Created by bnaya on 28/01/16, 
 @Component Name: page.drv
 @Description:
 @Params: 
 @Return: 
 @Methods: 
*/
import logo from '../../../components/logo/logo.drv';
import menu from '../../../components/menu/menu.drv';
import creditCards from '../../../components/credit-cards/credit-cards.drv';
import socials from '../../../components/socials/socials.drv';

import config from './footer.json';

import './footer.less';

export default angular.module('app.footer', [logo.name, menu.name, creditCards.name, socials.name])
    .directive('footer', footerConfig);

function footerConfig() {
    return {
        restrict: 'E',
        replace: true,
        scope: {

        },
        template: require('./footer.tpl.html'),
        controller: footerController,
        controllerAs: 'footer'
    }
}

class footerController {
    constructor() {
        this.footerData = config.footer;
        this.html = "";
        angular.forEach(config.footer.body, (value, key)=> {
            this.html += "<"+key+" data=\"footer.footerData.body['"+key+"']\"></"+key+">";
        });
    }
}