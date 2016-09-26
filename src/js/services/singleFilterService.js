/**
 * Created by rvalero on 13/09/16.
 */
/**
 * Created by rvalero on 13/09/16.
 */
(function () {
  'use strict';

  angular.module('ui.grid.single.filter')
    .service('uiGridSingleFilterService',['uiGridFilterValueService', function(uiGridFilterValueService) {
      //service body

      return {
        singleFilter:singleFilter,
        getPropertyWithColumnDef:getPropertyWithColumnDef
      };


      function getPropertyWithColumnDef(entity,columnDef) {
        if(!columnDef) return '';
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
          var fields = [];
          var columnDefs = row.grid.options ? row.grid.options.columnDefs : [];
          columnDefs = columnDefs || [];

          if(columnDefs.length > 0) {
            for(var i=0; i < columnDefs.length; i++) {
              if(columnDefs[i].field && getPropertyWithColumnDef( row.entity,columnDefs[i]) ){
                concatedProperties = concatedProperties.concat( getPropertyWithColumnDef(row.entity,columnDefs[i]) );
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
    }]);

  /**
   * @ngdoc factory
   * @name ui
   */

})();
