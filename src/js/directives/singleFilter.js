(function () {
  'use strict';

  angular.module('ui.grid.single.filter')

  /**
   * @ngdoc factory
   * @name ui
   */
    .directive('uiGridSingleFilter', ['uiGridSingleFilterService','uiGridFilterValueService',
      function (uiGridSingleFilterService, uiGridFilterValueService) {
        return {
          restrict:'A',
          replace: true,
          priority: 10,
          require: '^uiGrid',
          scope: false,
          compile: function () {
            return {
              pre: function ($scope, $elm, $attrs, uiGridCtrl) {
                uiGridCtrl.grid.registerRowsProcessor( uiGridSingleFilterService.singleFilter, 200 );
                uiGridFilterValueService.grid = uiGridCtrl.grid;
              }
            };
          }
        };
      }]);

})();
