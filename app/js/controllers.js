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
            var games = searchCommonsGame(gamesPlayers);
            $scope.games = games;
            console.log(games);
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
        var commonGameId = getIdCommonsGame(gamesPlayers);
        return  foundGame(gamesPlayers, commonGameId);

      };

      function getIdCommonsGame(gamesPlayers){
        var communsGames = gamesIdArray(gamesPlayers[0]);

         angular.forEach(gamesPlayers, function(gamesPlayer, index) {
          var idGameOther = gamesIdArray(gamesPlayer);

          communsGames = getCommonIds(communsGames, idGameOther);
       });
         if(communsGames.length >= 1){
          return communsGames[0];
         }else{
          return null;
         }
      };
      function getCommonIds(ids1, id2){
        var commonsIds = new Array();

         angular.forEach(ids1, function(id, index) {
            if(id2.indexOf(id) != -1){
              commonsIds.push(id);
            }
         });
        return commonsIds;
      };

      function gamesIdArray(games){
        var gamesId = new Array();
         angular.forEach(games, function(game, index) {
          gamesId.push(game.gameId);
         });
         return gamesId;

      };
      function foundGame(gamesPlayers, commonGameId){
        var games = new Array();
        angular.forEach(gamesPlayers, function(gamesPlayer, index) {
          angular.forEach(gamesPlayer, function(game, index) {
            if(game.gameId == commonGameId){
              games.push(game);
            }
          });
        });
        return games;
      }
}]);

