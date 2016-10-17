(function () {
  'use strict';

  angular.module('ui.grid.single.filter')

  /**
   * @ngdoc factory
   * @name ui
   */
    .factory('uiGridFilterValueService', function() {
      var filterValue = null;
      var grid = null;

      return {
        filterValue:filterValue,
        grid:grid
      }
    });

})();
