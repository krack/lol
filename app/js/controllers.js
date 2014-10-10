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




phonecatControllers.controller('FightCtrl', ['$scope', '$q', 'Player', 'Summoner', 'Games',
    function($scope, $q, Player, Summoner, Games) {

      $scope.players = Player.getAll(function(players) {
         
       });

      $scope.compare = function(){
        getCommunGame($scope.playersCompared);     
      };

      function getCommunGame(players){
        var allPromise = new Array();
         angular.forEach(players, function(player, index) {
            allPromise.push(getGames(player));
         });

         $q.all(allPromise).then(function(gamesPlayers){
            alert("ccou");
         });

      };

      function getGames(playerName){
        var d = $q.defer();
        var player = Summoner.get({summonerName: playerName}, function(player) {
             var summmerNameWrapper =playerName.toLowerCase().replace(/\s/g, "");
             Games.getAll({summonerId: player[summmerNameWrapper].id}, function(games){
               angular.forEach(games, function(game, index) {
                 game.summmerName = playerName
             });
               d.resolve(games);
             });

          });
        return d.promise;
      };

      function searchCommonsGame(gamesPlayers){
        var communsGame = null;
          angular.forEach(games1, function(game1, index) {
              angular.forEach(games2, function(game2, index2) {
                if(communsGame == null && game1.gameId == game2.gameId){
                  communsGame = {
                    "player1" : game1,
                     "player2" : game2
                    }
                  }
              });
          });

          return communsGame;

      }
}]);
