/**
 * Created by rvalero on 12/09/16.
 */
(function () {
  'use strict';

  angular.module('ui.grid.single.filter',[])

  angular
    .module('ui.grid.single.filter')
    .factory('uiGridFilterValueService', function() {

      var filterValue = null;
      var grid = null;

      return {
        filterValue:filterValue,
        grid:grid
      }

    })
    .service('uiGridSingleFilterService',['uiGridFilterValueService', function(uiGridFilterValueService) {
      //service body

      return {
        singleFilter:singleFilter
      };

      function singleFilter( renderableRows ) {
        if (!uiGridFilterValueService.filterValue) {
          return renderableRows;
        }
        var matcher = createFilterRegex(uiGridFilterValueService.filterValue, true);
        renderableRows.forEach( function( row ) {
          var filterData = concatEntityFPropertiesSelectedAsField(row);

          var match = filterData.match(matcher);

          if ( !match ){
            row.visible = false;
          }
        });
        return renderableRows;


        function concatEntityFPropertiesSelectedAsField(row) {

          var concatedProperties = '';
          var fields = [];
          var columnDefs = row.grid.options ? row.grid.options.columnDefs : [];
          columnDefs = columnDefs || [];

          if(columnDefs.length > 0) {
            for(var i=0; i < columnDefs.length; i++) {
              if(columnDefs[i].field && row.entity[columnDefs[i].field] ){
                concatedProperties = concatedProperties.concat(row.entity[columnDefs[i].field]);
              }
            }
          } else {
            for(var prop in row.entity) {
              if( typeof prop === "string") {
                concatedProperties = concatedProperties.concat(prop);
              }
            }
          }

          return concatedProperties;
        }


        function createFilterRegex (search, caseInsensitive) {
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
    }])
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
    }])
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
      }])

})();

