(function () {
	var crud = angular.module('crud', []);

	crud.service('StoreService', function ($http) {
		this.addStore = function (name, date, products, callback) {
			$http.post('http://localhost:3111/addStore', { name: name, date: date, products: products }).success(callback);
		};
	});

	crud.directive('store', function (StoreService) {

		var addItem = function (scope) {
			scope.items.push({ name: null, price: null, category: 'house' });
			scope.$apply();
			console.log(scope.items);
		};

		var startStore = function (scope, element) {
			element.addClass('named').find('header h2').slideUp();
			addItem(scope);
		};

		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'js/crud/storeTpl.html',

			link: function (scope, element) {

				element.on('change', 'header input', function () {
					Array.prototype.every.call(element.find('header input'), function (input) {
						return input.value;
					}) 
					&& !scope.items.length && startStore(scope, element);
				});

				element.on('change', '.storeItem', function (event) {
					Array.prototype.every.call($(this).find('input, select'), function (input) {
						return input.value;
					}) 
					&& addItem(scope);
				});

				element.on('click', '.createStore', function () {
					StoreService.addStore(scope.name, scope.date, scope.items);
				});

				scope.items = [];
			}
		}
	});
})();