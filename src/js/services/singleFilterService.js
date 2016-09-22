/**
 * Created by rvalero on 13/09/16.
 */
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
    .service('uiGridSingleFilterService',['uiGridFilterValueService', function(uiGridFilterValueService) {
      //service body

      return {
        singleFilter:singleFilter,
        getPropertyWithName:getPropertyWithName
      };


      function getPropertyWithName(entity,propertyName) {

        if(propertyName.indexOf('.') < 0 ) return entity[propertyName];

        var property = entity;
        var arrayOfLevels = propertyName.split('.');
        for( var i=0; i < arrayOfLevels.length ; i++ ) {
          property = property[arrayOfLevels[i]];
        }

        return property;

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
              if(columnDefs[i].field && getPropertyWithName( row.entity,columnDefs[i].field) ){
                concatedProperties = concatedProperties.concat( getPropertyWithName(row.entity,columnDefs[i].field) );
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

})();
