/**
 * User service
 */
class User {
    constructor() {
        'ngInject';
        User = {
            name: `bnaya`
        };
        this.init(user);
    }

    /**
     * init
     * initiating the Service - update user's account balance before doing any action
     * @param user - user details object
     */
    init(user) {
        console.log(`User: ${user}`);
    }
}

const userModule = angular.module(`app.shared.user`, [])
    .factory(`userService`, User);

export default userModule;
