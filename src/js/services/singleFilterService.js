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
        singleFilter:singleFilter,
        getRenderedCellByColumnDef:getRenderedCellByColumnDef
      };


      function getRenderedCellByColumnDef(entity,columnDef, row) {

        if(!columnDef) return '';

        if(columnDef.cellTemplate) {

          var html = columnDef.cellTemplate.replace(uiGridConstants.MODEL_COL_FIELD, Grid.prototype.getQualifiedColField(columnDef));
          html = html.replace(uiGridConstants.COL_FIELD, 'grid.getCellValue(row, col)');

          $scope.grid = Grid;

          $scope.row = row;

          var compiledElementFn = $compile(html);

          var datos;
          // compiledElementFn(row.grid.appScope, function(clonedElement, scope) {
          //   console.log(clonedElement);
          //   datos = clonedElement;
          // });

          // console.log(datos);
          //
          // var par = $parse('row');
          // var afpar = par(row.grid.appScope);

          //console.log('Caso $parse:' + par);
          // console.log('Caso $parse:' + afpar);
          //console.log('Caso $eval:' + $scope.$eval('grid'));




          return datos;
        }

        var field =  columnDef.filterField || columnDef.field;

        if(_isFunction(field)) {
          return field(entity);
        }

        if(field.indexOf('.') < 0 ) return entity[field];

        var property = entity;
        var arrayOfLevels = field.split('.');

        for( var i=0; i < arrayOfLevels.length ; i++ ) {
          if(!property) return '';
          property = property[arrayOfLevels[i]];
        }

        return property;

        function _isFunction(functionToCheck) {
          var getType = {};
          return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
        }
      }

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

          if (row.grid.columns) {
            row.grid.columns.forEach(function (col, idx) {
              $scope.grid = row.grid;
              $scope.row = row;
              $scope.col = col;
              var res = col.compiledElementFn($scope);
              console.log(res);
              var colValue;

              var interpolate = $interpolate( res.html() );
              colValue = interpolate($scope);
              concatedProperties = concatedProperties.concat(colValue);
            })
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
    }]);

  /**
   * @ngdoc factory
   * @name ui
   */

})();
