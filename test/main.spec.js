'use strict';

describe('Plugin SingleFilterService', function () {
  var SingleFilterService;

  var row = { propNivel1:'p1', nivel2:{ propNivel2:'p2'}};

  beforeEach(module('ui.grid.single.filter'));
  beforeEach(inject(function (_uiGridSingleFilterService_) {

    SingleFilterService = _uiGridSingleFilterService_;
  }));

  describe('La función "getPropertyWithName" ', function () {

    it('Permite obtener el valor de la propiedad de un objeto dada su nombre', function () {
       expect(SingleFilterService.getPropertyWithName(row,'propNivel1')).toBe('p1');
    });

    it('También me permite obtener el valor para propiedades anidadas', function () {
      expect(SingleFilterService.getPropertyWithName(row,'nivel2.propNivel2')).toBe('p2');
    });


  });
});
