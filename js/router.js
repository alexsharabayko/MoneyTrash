require(['js/proto.js', 'js/common/common.js', 'js/main/main.js', 'js/crud/crud.js', 'js/account/account.js'],

function () {
    var router = angular.module('router', ['ngRoute', 'main', 'crud']),
        routes = ['main', 'account', 'crud', 'history'];

    router.config(function ($routeProvider) {
        routes.forEach(function (route) {
            $routeProvider.when('/' + route, {
                templateUrl: 'partials/' + route + '.html'
            });
        });

        $routeProvider.otherwise({ redirectTo: '/main' })
    });

    $('#app').attr('ng-app', 'router');
    angular.bootstrap(document, ['router']);
});