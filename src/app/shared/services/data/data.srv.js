/**
 * User service
 */
class Data {
    constructor($http, localStorageService, $rootScope) {
        'ngInject';
        this.$http = $http;
        this.$rootScope = $rootScope;
        this.localStorageService = localStorageService;
        const limit = 50;
        const wikiReq = `https://en.wikipedia.org/w/api.php?action=query&origin=*&list=random&format=json&rnnamespace=0&rnlimit=${limit}`;
        this.init(wikiReq);
        this.favorites = [];
    }

    /**
     * init
     * initiating the Service - update user's account balance before doing any action
     * @param user - user details object
     */
    init(wiki) {
        this.asyncData = this.$http.get(wiki).then(res => res.data.query.random).then((res) => {
            this.syncData = res.map((val) => ({id: val.id, title: val.title, description: val.description}));
            return this.syncData;
        });
    }

    getFavorites() {
        const localStorageFavorites = this.localStorageService.get('favorites');
        if(_.isEmpty(this.favorites)) {
            if(!_.isNull(localStorageFavorites))
                this.favorites = localStorageFavorites;
        }
        return this.favorites;
    }

    addFavorite(item){
        this.favorites.push(item);
        this.$rootScope.$broadcast('favoritesUpdated');
        this.localStorageService.set('favorites', this.favorites);
    }

    updateFavorite(item, index){
        this.favorites[index] = item;
        this.$rootScope.$broadcast('favoritesUpdated');
        this.localStorageService.set('favorites', this.favorites);
    }

    removeFavorite(item, index) {
        this.favorites.splice(index, 1);
        this.localStorageService.set('favorites', this.favorites);
        this.$rootScope.$broadcast('favoritesUpdated');

    }
}

const dataModule = angular.module(`app.shared.data`, [])
    .service(`dataService`, Data);

export default dataModule;
