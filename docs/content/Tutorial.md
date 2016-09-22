@ngdoc content
@name Start
@description

# "UI-Grid Single Filter"

This module is a skeleton for you to use to create your own UI-Grid plugins, complete with unit tests, automatic documentation generation, and a build process.

<br>
<br>

<example name="example-name" module="app">
  <file name="index.html" type="html">
    <div ng-controller="MainCtrl">
      Custom directive output below:
      <br>
      <br>
      <example-plugin-directive class="test-directive">{{ out }}</example-plugin-directive>
    </div>
  </file>
  <file name="app.js">
    angular.module('app', ['ui.grid.single.filter'])

    .controller('MainCtrl', function ($scope) {
      $scope.out = 'Click Me!';
    });
  </file>
  <file name="app.css">
    .click-me {
      cursor: pointer;
    }

    .toggled {
      color: red;
    }
  </file>
  <file name="protractor.js" type="protractor">
    describe('Plugin directive', function () {
      it('works', function() {
        expect(true).toBe(true);
      });
    });
  </file>
</example>
