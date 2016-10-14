/**
 * Created by rvalero on 13/09/16.
 */
/**
 * Created by rvalero on 13/09/16.
 */
(function () {
  'use strict';

  angular.module('ui.grid.single.filter')
    .service('uiGridSingleFilterService',['uiGridFilterValueService' , 'Grid', 'uiGridConstants', '$compile', '$rootScope', '$parse', '$interpolate', function(uiGridFilterValueService, Grid, uiGridConstants, $compile, $scope, $parse, $interpolate) {
      //service body

      return {
        singleFilter:singleFilter
      };

      function singleFilter( renderableRows ) {
        if (!uiGridFilterValueService.filterValue) {
          return renderableRows;
        }

        var matcher = _createFilterRegex(uiGridFilterValueService.filterValue, true);

        renderableRows.forEach( function( row ) {
          var filterData = _concatCellValues(row);

          var match = filterData.match(matcher);
          if ( !match ){
            row.visible = false;
          }
        });

        return renderableRows;

        function _concatCellValues(row) {
          var concatedProperties = '';

          if (row.grid.columns) {
            row.grid.preCompileCellTemplates();
            row.grid.columns.forEach(function (col, idx) {
              var cellValue = _getRenderedCellValue(row, col);
              var cellValueWithoutHTML = _removeHTML(cellValue);
              concatedProperties = concatedProperties.concat(cellValueWithoutHTML);
            });
          }

          return concatedProperties;
        }

        function _getRenderedCellValue(row, col) {
          $scope.grid = row.grid;
          $scope.row = row;
          $scope.col = col;

          var cellTemplate = col.compiledElementFn($scope);
          var cellValue = $interpolate(cellTemplate.html())($scope);
          return cellValue;
        }

        function _removeHTML (text) {
          return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
        }

        function _createFilterRegex (search, caseInsensitive) {
          search = _fnEscapeRegex( search );
          var a = $.map( search.match( /"[^"]+"|[^ ]+/g ) || [''], function ( word ) {
            if ( word.charAt(0) === '"' ) {
              var m = word.match( /^"(.*)"$/ );
              word = m ? m[1] : word;
            }

            return word.replace('"', '');
          } );

          search = '^(?=.*?'+a.join( ')(?=.*?' )+').*$';
          return new RegExp( search, caseInsensitive ? 'i' : '' );

          /**
           * Escape a string such that it can be used in a regular expression
           *  @param {string} sVal string to escape
           *  @returns {string} escaped string
           *  @memberof DataTable#oApi
           */
          function _fnEscapeRegex ( sVal ) {
            // Escape regular expression special characters
            var _re_escape_regex = new RegExp( '(\\' + [ '/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\', '$', '^', '-' ].join('|\\') + ')', 'g' );
            return sVal.replace( _re_escape_regex, '\\$1' );
          }
        }
      }
    }]);

  /**
   * @ngdoc factory
   * @name ui
   */

})();
