'use strict';

/* App Module */

var lolToolsApp = angular.module('lolToolsApp', [
  'ngRoute',
  'phonecatAnimations',

  'phonecatControllers',
  'phonecatFilters',
  'championServices',
  'playersServices',
  'summonerServices',
  'gamesServices', 
  'gamesDirectives'
]);

lolToolsApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/champions', {
        templateUrl: 'partials/champions-list.html',
        controller: 'PhoneListCtrl'
      }).
      when('/phones/:phoneId', {
        templateUrl: 'partials/champions-detail.html',
        controller: 'PhoneDetailCtrl'
      }).
       when('/game-fight', {
        templateUrl: 'partials/game-fighter.html',
        controller: 'FightCtrl'
      }).
      otherwise({
        redirectTo: '/champions'
      });
  }]);


