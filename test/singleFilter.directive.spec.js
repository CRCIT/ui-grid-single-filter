'use strict';

describe('SingleFilterService', function () {
  var ele, scope, compile;

  beforeEach(module('ui.grid.single.filter'));
  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope.$new();
    ele = angular.element(
      '<input type="text" ui-grid-single-filter-value/>' +
      '<div id="grid" ui-grid-bootstrap-styles ui-grid="gridOptions" class="grid" ui-grid-single-filter></div>'
    );
    scope.gridOptions = getGridOptions();

    $compile(ele)(scope);
    scope.$digest();
  }));


  describe('Comprobamos el uso de la directiva ui-grid ', function () {

    it('verificando el elemento del DOM sobre el que estamos trabajando', function () {
      console.log(ele.text());
      expect(ele.html()).not.toBe(null);
    });

  });

  //

  function getGridOptions() {
    var gridOptions = {};

    gridOptions = {
      columnDefs:[
        {field:"code"},
        {field:"description"}
      ],
      data:[
        {code:'1', description:'description 1'},
        {code:'2', description:'description 2'},
        {code:'3', description:'description 3'}
      ]
    };

    return gridOptions;
  }


});
