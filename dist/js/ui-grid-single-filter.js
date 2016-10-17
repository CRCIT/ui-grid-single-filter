/*!
 * ui-grid-single-filter
 * https://github.com/CRCIT/ui-grid-single-filter
 * @license Apache-2.0
 * v0.3.0
 * 2016-10-17T09:55:48.114Z
 */
(function () {
  'use strict';

  /**
   * @ngdoc module
   * @name ui.grid.single.filter
   * @description Main plugin module
   */
  angular.module('ui.grid.single.filter', ['ui.grid']);

})();

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
            uiGridFilterValueService.filterValue = null;
            element.bind("keyup", function (event) {
              uiGridFilterValueService.filterValue = attrs.$$element.val();
              uiGridFilterValueService.grid.refresh();
              event.preventDefault();
            });
          }
        };
      }]);

})();

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
    .factory('uiGridFilterValueService', function() {
      var filterValue = null;
      var grid = null;

      return {
        filterValue:filterValue,
        grid:grid
      }
    });

})();

/**
 * Created by rvalero on 13/09/16.
 */
/**
 * Created by rvalero on 13/09/16.
 */
(function () {
  'use strict';

  angular.module('ui.grid.single.filter')
    .service('uiGridSingleFilterService',['uiGridFilterValueService' , 'Grid', 'uiGridConstants', 'gridUtil', '$compile', '$rootScope', '$parse', '$interpolate', function(uiGridFilterValueService, Grid, uiGridConstants, gridUtil, $compile, $scope, $parse, $interpolate) {
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

          function addFilterProperty(renderedValue) {
            renderedValue = _removeHTML(renderedValue);
            concatedProperties = concatedProperties.concat(renderedValue).concat('  ');
          }

          if (row.grid.columns) {
            row.grid.columns.forEach(function (col, idx) {
              var renderedValue;

              if (!col.colDef || col.colDef.singleFilterSearchable !== false) {
                if (col.colDef && col.colDef.singleFilterValue) {
                  renderedValue = getRenderStringValue(row, col, (col.colDef.singleFilterValue));
                }
                else {
                  renderedValue = getRenderedCellValue(row, col);
                }
                addFilterProperty(renderedValue);

                if (col.colDef && col.colDef.singleFilterAdditionalValue) {
                  var additionalValue = getRenderStringValue(row, col, (col.colDef.singleFilterAdditionalValue));
                  addFilterProperty(additionalValue);
                }

              }

            });
          }

          return concatedProperties;
        }

        function getRenderedCellValue(row, col) {
          $scope.grid = row.grid;
          $scope.row = row;
          $scope.col = col;

          var html = _replaceFieldWithExpression($scope, $scope.col.cellTemplate);
          var cellTemplate = $compile(html)($scope);
          var cellValue = $interpolate(cellTemplate.html())($scope);
          return cellValue;
        }

        function getRenderStringValue(row, col, string) {
          $scope.grid = row.grid;
          $scope.row = row;
          $scope.col = col;

          var expressionString = _replaceFieldWithExpression($scope, string);
          var renderedValue = $interpolate(expressionString)($scope);
          return renderedValue;
        }

        function _replaceFieldWithExpression($scope, input) {
          var replacedInput = input
            .replace(uiGridConstants.MODEL_COL_FIELD, 'row.entity.' + gridUtil.preEval($scope.col.field))
            .replace(uiGridConstants.COL_FIELD, 'grid.getCellValue(row, col)');
          return replacedInput;
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
