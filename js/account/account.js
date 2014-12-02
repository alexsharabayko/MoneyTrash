(function () {
    var account = angular.module('account', []);

    account.service('UserService', function ($http) {
        var urls = {
            register: 'http://localhost:3111/signup',
            login: 'http://localhost:3111/login'
        };

        this.send = function (action, data, callback) {
            var url = urls[action];

            $http.post(url, data).success(callback);
        };
    });

    account.directive('dd', function ($location, UserService) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'js/account/accountTpl.html',

            link: function (scope, element) {

                element.on('submit', 'form', function (event) {
                    event.preventDefault();

                    UserService.send(this.dataset.action, this.data, function (response) {
                        $location.path('#/main');
                    });
                });

                element.find('form').on('change', '[name]', function (event) {
                    event.delegateTarget.data = event.delegateTarget.data || {};

                    event.delegateTarget.data[event.target.name] = event.target.value;
                });
            }
        }
    });

    //account.controller('AccountCtrl', function ($scope, $element, $location, UserService) {
    //    $element.on('submit', 'form', function (event) {
    //        event.preventDefault();
    //
    //        UserService.send(this.dataset.action, this.data, function (response) {
    //            $location.path('#/main');
    //        });
    //    });
    //
    //    $element.find('form').on('change', '[name]', function (event) {
    //        event.delegateTarget.data = event.delegateTarget.data || {};
    //
    //        event.delegateTarget.data[event.target.name] = event.target.value;
    //    });
    //});
})();