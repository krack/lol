'use strict';

/* Directives */


var gamesDirectives = angular.module('gamesDirectives', []);

gamesDirectives.directive('gameResume', function() {
    return {
      restrict: 'E',
      templateUrl: 'partials/game-resume.html',
      scope: {
        game: '=game'
      }
    };
  });