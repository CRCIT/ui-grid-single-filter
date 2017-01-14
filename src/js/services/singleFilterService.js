(function () {
  'use strict';

  angular.module('ui.grid.single.filter')
    .service('uiGridSingleFilterService',['$log', 'uiGridFilterValueService', 'uiGridRenderService', 'uiGridCommonUtilsService', 'removeDiacritics',
      function($log, uiGridFilterValueService, uiGridRenderService, uiGridCommonUtilsService, removeDiacritics) {
      //service body

      var defaultOptions = {
        caseInsensitive: true,
        removeDiacritics: true
      };

      return {
        singleFilter:singleFilter
      };

      function singleFilter( renderableRows, options ) {

        var settings = angular.extend({}, defaultOptions, options);

        if (!uiGridFilterValueService.filterValue) {
          return renderableRows;
        }

        var filterValue = uiGridFilterValueService.filterValue;
        filterValue = settings.removeDiacritics ? removeDiacritics.replace(filterValue) : filterValue;
        var matcher = _createFilterRegex(filterValue, settings.caseInsensitive);

        var filterData;
        renderableRows.forEach( function( row ) {
          filterData = row.singleFilterRowFilterData;

          if (!filterData) {
            filterData = _concatCellValues(row);
            filterData = settings.removeDiacritics ? removeDiacritics.replace(filterData) : filterData;
            row.singleFilterRowFilterData = filterData;
          }

          var match = filterData.match(matcher);
          if ( !match ){
            row.visible = false;
          }
        });

        filterData = null;
        return renderableRows;

        function _concatCellValues(row) {
          var cellValues = [];

          function addFilterProperty(renderedValue) {
            renderedValue = uiGridCommonUtilsService.removeHtmlTags(renderedValue);
            cellValues.push(renderedValue);
          }

          var renderedValue;
          var additionalValue;
          if (row.grid.columns) {
            row.grid.columns.forEach(function (col, idx) {
              renderedValue = null;

              if (!col.colDef || col.colDef.singleFilterSearchable !== false) {

                if (col.colDef && col.colDef.singleFilterValue) {
                  renderedValue = uiGridRenderService.getRenderStringValue(row, col, col.colDef.singleFilterValue);
                }
                else {
                  if (col.colDef && col.colDef.singleFilterRenderCellTemplate === true) {
                    renderedValue = uiGridRenderService.getRenderedCellValue(row, col);
                  }
                  else {
                    renderedValue = row.grid.getCellDisplayValue(row, col);
                  }
                }
                addFilterProperty(renderedValue);

                if (col.colDef && col.colDef.singleFilterAdditionalValue) {
                  additionalValue = uiGridRenderService.getRenderStringValue(row, col, col.colDef.singleFilterAdditionalValue);
                  addFilterProperty(additionalValue);
                }

              }

            });
          }

          renderedValue = null;
          additionalValue = null;
          return cellValues.join('  ');
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

})();
