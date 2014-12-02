var main = angular.module('main', []);

main.factory('mainSliderData', function ($http) {
	return {
		getData: function (callback) {
			$http.get('json/mainSliderData.json').success(function (response) {
				typeof callback === 'function' && callback(response.data);
			});
		}
	}
});

main.directive('mainSlider', function (mainSliderData, $interval) {
	return {
		restrict: 'E',
		templateUrl: 'js/main/mainSliderTpl.html',
		replace: true,

		link: function (scope, element) {
			mainSliderData.getData(function (data) {
				scope.data = data;
			});
		},

		controller: function ($element) {
			var iter = 1,
				interval = null,
				items = null;

			var nextStep = function () {
				items = $element.find('.item');
				items.removeClass('active').eq(iter).addClass('active');

				items = $element.find('.switcher');
				items.removeClass('active').eq(iter).addClass('active');

				iter = (iter + 1) % items.length;
			};

			var installInterval = function (cancel) {
				cancel && $interval.cancel(interval);

				interval = $interval(nextStep, 10000);
			};

			$element.on('click', '.switcher', function (event) {
				iter = $(event.currentTarget).index();

				nextStep();

				installInterval(true);
			});

			installInterval(false);
		}
	}
});