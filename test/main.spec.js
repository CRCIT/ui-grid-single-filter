'use strict';

describe('Plugin SingleFilterService', function () {
  var SingleFilterService, row;

  beforeEach(module('ui.grid.single.filter'));
  beforeEach(inject(function (_uiGridSingleFilterService_) {
    SingleFilterService = _uiGridSingleFilterService_;

    row = { propNivel1:'p1', nivel2:{ propNivel2:'p2'}, nivel3:{ nivel2:{ propNivel3:'p3'}} };
  }));

  describe('La función "getPropertyWithName" ', function () {

    it('Permite obtener el valor de la propiedad de un objeto dada su nombre', function () {
       expect(SingleFilterService.getPropertyWithName(row,'propNivel1')).toBe('p1');
    });

    it('También me permite obtener el valor para propiedades anidadas', function () {
      expect(SingleFilterService.getPropertyWithName(row,'nivel2.propNivel2')).toBe('p2');
    });

    it('También me permite obtener el valor para propiedades anidadas con cualquier nivel arbitrario', function () {
      expect(SingleFilterService.getPropertyWithName(row,'nivel3.nivel2.propNivel3')).toBe('p3');
    });

    it('La navegación entre las propiedades estará segura de nulos', function() {
      row.nivel2.propNivel2 = null;
      expect(SingleFilterService.getPropertyWithName(row,'nivel2.propNivel2')).toBe(null);
    });

    it('La navegación entre las propiedades estará segura pese a la existencia de nulos', function() {
      row.nivel2 = null;
      expect(SingleFilterService.getPropertyWithName(row,'nivel2.propNivel2')).toBe('');
    });

    it('La navegación entre las propiedades estará segura pese a la existencia de nulos', function() {
      row.nivel3 = null;
      expect(SingleFilterService.getPropertyWithName(row,'nivel3.nivel2.propNivel3')).toBe('');
    });

    it('Comprobamos las condiciones límite', function() {
      expect(SingleFilterService.getPropertyWithName(null,'nivel3.nivel2.propNivel3')).toBe('');
      expect(SingleFilterService.getPropertyWithName(row, null)).toBe('');
    });

  });
});
