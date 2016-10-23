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
import mobileMenu from '../../../components/menu/mobile-menu/mobile-menu.drv'
import accessMenu from '../../../components/access-menu/access-menu.drv';
//import config from './header.json';

import './header.less';

export default angular.module('app.header', [logo.name, menu.name, accessMenu.name, mobileMenu.name])
    .directive('header', headerConfig);

function headerConfig() {
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        template: require('./header.tpl.html'),
        controller: headerController,
        controllerAs: 'header'
    }
}

class headerController {
    constructor($window, $state, domFactory, resolutionChecker, $scope, $timeout, loadingFrameService) {
        this.resolutionChecker = resolutionChecker;
        this.$state = $state;
        this.$window = $window;
        this.domFactory = domFactory;
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.loadingFrameService = loadingFrameService;

        this.updateByResolution();
        this.headerData = this.resolutionHeader.header;
        this.html = "";
        this.html = domFactory.generateArray(this.headerData, 'header', 'headerData');

        this.updateOnResize();
    }

    updateOnResize() {
        let self = this
        this.currentViewPort = this.$window.innerWidth;

        angular.element(this.$window).bind('resize', function() {
            if(self.currentViewPort !== self.$window.innerWidth) {
                self.currentViewPort = self.$window.innerWidth;
                self.loadingFrameService.startLoading(1);
                self.$scope.$apply();
                self.$state.reload();
                self.updateByResolution();
                self.headerData = self.resolutionHeader.header;
                self.$timeout(() => {
                    self.html = "";
                    self.$scope.$digest();
                    self.html = self.domFactory.generateArray(self.headerData, 'header', 'headerData');
                    self.$scope.$digest();
                    self.$timeout(() => {
                        self.loadingFrameService.stopLoading(1);
                    }, 1500);
                });
            }
        });
    }

    updateByResolution() {
        let resolution = this.resolutionChecker.checkHeaderResolution();
        switch (resolution) {
            case 'desktop': this.resolutionHeader = require('./header.json');
                break;
            case 'tablet' : this.resolutionHeader = require('./header-mobile-1024.json');
                break;
            case 'mobile': this.resolutionHeader = require('./header-mobile-326.json');
                break;
        }
    }

    isTransparentHeader() {
        if(this.$state.includes('home'))
            return this.withHeader = false;
        if(this.$state.includes('promotion'))
            return this.withHeader = false;
        return this.withHeader = true;
    }

}