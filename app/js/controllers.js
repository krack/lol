'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Champion',
  function($scope, Champion) {
    $scope.phones = Champion.getAll(function(champions) {
    });

    $scope.orderProp = 'name';
  }]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Champion',
  function($scope, $routeParams, Champion) {
    console.log($routeParams.phoneId)
    $scope.phone = Champion.getOne({phoneId: $routeParams.phoneId}, function(champions) {
    });


  }]);
