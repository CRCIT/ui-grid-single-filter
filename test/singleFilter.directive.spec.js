'use strict';

describe('SingleFilterService', function () {
  var ele, scope;

  beforeEach(module('ui.grid.single.filter'));
  beforeEach(inject(function (_uiGridSingleFilterService_) {
    ele = _uiGridSingleFilterService_;

    scope = { propNivel1:'p1', nivel2:{ propNivel2:'p2'}, nivel3:{ nivel2:{ propNivel3:'p3'}} };
  }));


  // beforeEach(inject(function () {
  //
  //   scope = $rootScope.$new();
  //   ele = angular.element(
  //     '<input type="text" ui-grid-single-filter-value/>' +
  //     '<div id="grid" ui-grid-bootstrap-styles ui-grid="gridOptions" class="grid" ui-grid-single-filter></div>'
  //   );
  //   $compile(ele)(scope);
  //   scope.$apply();
  // }));

  // describe('La directiva ui-grid ', function () {
  //   scope.$apply(function(){
  //     scope.getGridOptions = getGridOptions();
  //   });
  //
  //   it('crea filas para cada elemento del data pasado en el gridOptions', function () {
  //     debugger
  //     console.log(ele.html());
  //   });
  //
  // });

  //
  //
  // function getGridOptions() {
  //   var gridOptions = {};
  //
  //   gridOptions = {
  //     columnDefs:[
  //       {field:"code"},
  //       {field:"description"}
  //     ],
  //     data:[
  //       {code:'1', description:'description 1'},
  //       {code:'2', description:'description 2'},
  //       {code:'3', description:'description 3'}
  //     ]
  //   };
  //
  //   return gridOptions;
  // }


});
