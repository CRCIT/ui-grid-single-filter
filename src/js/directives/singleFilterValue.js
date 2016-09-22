/**
 * Created by rvalero on 13/09/16.
 */
(function () {
  'use strict';

  angular.module('ui.grid.single.filter')

  /**
   * @ngdoc factory
   * @name ui
   */
    .directive('uiGridSingleFilterValue', ['uiGridFilterValueService',
      function (uiGridFilterValueService) {
        return {
          restrict: 'A',
          scope:false,
          link: function (scope, element, attrs) {
            element.bind("keyup", function (event) {
              uiGridFilterValueService.filterValue = attrs.$$element.val();
              uiGridFilterValueService.grid.refresh();
              event.preventDefault();
            });
          }
        };
      }]);

})();
