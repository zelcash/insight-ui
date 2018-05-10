'use strict';

angular.module('insight')
  .directive('scroll', function ($window) {
    return function(scope, element, attrs) {
      angular.element($window).bind('scroll', function() {
        if (this.pageYOffset >= 200) {
          scope.secondaryNavbar = true;
        } else {
          scope.secondaryNavbar = false;
        }
        scope.$apply();
      });
    };
  })
  .directive('whenScrolled', function($window) {
    return {
      restric: 'A',
      link: function(scope, elm, attr) {
        var pageHeight, clientHeight, scrollPos;
        $window = angular.element($window);

        var handler = function() {
          pageHeight = window.document.documentElement.scrollHeight;
          clientHeight = window.document.documentElement.clientHeight;
          scrollPos = window.pageYOffset;

          if (pageHeight - (scrollPos + clientHeight) === 0) {
            scope.$apply(attr.whenScrolled);
          }
        };

        $window.on('scroll', handler);

        scope.$on('$destroy', function() {
          return $window.off('scroll', handler);
        });
      }
    };
  })
  .directive('dataClipboardText', function() {
    return {
      restric: 'A',
      scope: { dataClipboardText: '=dataClipboardText' },
      link: function(scope, elm) {
        var clipboardDemos = new ClipboardJS(elm);
        
        clipboardDemos.on('success', function(e) {
            e.clearSelection();
        
            console.info('Action:', e.action);
            console.info('Text:', e.text);
            console.info('Trigger:', e.trigger);
        
            showTooltip(e.trigger, 'Copied!');
        });
        
        clipboardDemos.on('error', function(e) {
            console.error('Action:', e.action);
            console.error('Trigger:', e.trigger);
        
            showTooltip(e.trigger, fallbackMessage(e.action));
        });
      }
    };
  })  
  .directive('focus', function ($timeout) {
    return {
      scope: {
        trigger: '@focus'
      },
      link: function (scope, element) {
        scope.$watch('trigger', function (value) {
          if (value === "true") {
            $timeout(function () {
              element[0].focus();
            });
          }
        });
      }
    };
  });
