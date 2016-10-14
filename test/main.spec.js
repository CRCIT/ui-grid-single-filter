// 'use strict';
//
// describe('SingleFilterService', function () {
//   var SingleFilterService, row;
//
//   beforeEach(module('ui.grid.single.filter'));
//   beforeEach(inject(function (_uiGridSingleFilterService_) {
//     SingleFilterService = _uiGridSingleFilterService_;
//
//     row = { propNivel1:'p1', nivel2:{ propNivel2:'p2'}, nivel3:{ nivel2:{ propNivel3:'p3'}} };
//   }));
//
//   describe('La función "getRenderedCellByColumnDef" ', function () {
//
//     it('Permite obtener el valor de la propiedad de un objeto dada su nombre', function () {
//        expect(SingleFilterService.getRenderedCellByColumnDef(row,{field:'propNivel1'})).toBe('p1');
//     });
//
//     it('También me permite obtener el valor para propiedades anidadas', function () {
//       expect(SingleFilterService.getRenderedCellByColumnDef(row,{field: 'nivel2.propNivel2'})).toBe('p2');
//     });
//
//     it('También me permite obtener el valor para propiedades anidadas con cualquier nivel arbitrario', function () {
//       expect(SingleFilterService.getRenderedCellByColumnDef(row,{field:'nivel3.nivel2.propNivel3'})).toBe('p3');
//     });
//
//     it('La navegación entre las propiedades estará segura pese a la existencia de nulos', function() {
//       row.nivel2 = null;
//       expect(SingleFilterService.getRenderedCellByColumnDef(row,{field:'nivel2.propNivel2'})).toBe('');
//     });
//
//     it('para cualquier tipo de nuivel', function() {
//       row.nivel3 = null;
//       expect(SingleFilterService.getRenderedCellByColumnDef(row,{field:'nivel3.nivel2.propNivel3'})).toBe('');
//     });
//
//
//     it('y para propiedades nulas', function() {
//       row.nivel2.propNivel2 = null;
//       expect(SingleFilterService.getRenderedCellByColumnDef(row,{field:'nivel2.propNivel2'})).toBe(null);
//     });
//
//
//     it('Comprobamos las condiciones límite', function() {
//       expect(SingleFilterService.getRenderedCellByColumnDef(null,{field: 'nivel3.nivel2.propNivel3'})).toBe('');
//       expect(SingleFilterService.getRenderedCellByColumnDef(row, null)).toBe('');
//     });
//
//   });
//
//   describe('En cuanto a la configuración a través de ColumnDef', function () {
//
//     it('La propiedad "filterField" en caso de existir en un elemento de la lista columnDef sirve para indicar como obtener el valor a filtrar del objeto, sobreescribiendo el indicado en field', function(){
//       expect(SingleFilterService.getRenderedCellByColumnDef(row,{field:'karateka', filterField:'nivel2.propNivel2'})).toBe('p2');
//     });
//
//     it('Para los casos más complejos como booleanos que se muestran tras un "cellTemplate" como textos filterField puede recibir una función que obtenga dichos textos dado el objeto entidad', function (){
//       row.enabled = true; // tras el CellTemplate true => ACTIVO, false => INACTIVO
//       expect(SingleFilterService.getRenderedCellByColumnDef(row,
//         { field:'enabled',
//           filterField:function(row){
//             return row.enabled? 'ACTIVO':'INACTIVO'; }
//         })).toBe('ACTIVO')
//     });
//
//   });
//
//
//
// });
