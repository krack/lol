'use strict';

/* Services */

var championServices = angular.module('championServices', ['ngResource']);

championServices.factory('Champion', ['$resource',
  function($resource){
    return $resource('https://global.api.pvp.net/api/lol/static-data/euw/v1.2/champion/:phoneId?locale=fr_FR&api_key=cf77c8ef-2c04-4187-89a9-f93df85109a7', {}, {
	    getAll: {
	      	method:'GET',
	      	isArray:true,
			transformResponse: function(data, header) {
				console.log(data);
				var wrapped = angular.fromJson(data);
				var champ = new Array();
				angular.forEach(wrapped.data, function(item, idx) {
					item.imageUrl = "http://ddragon.leagueoflegends.com/cdn/"+wrapped.version+"/img/champion/"+item.key+".png";
					champ.push(item);
				});
				return champ;
			}
		},
		getOne: {
	      	method:'GET',
	      	isArray:false,
			transformResponse: function(data, header) {	
				var wrapped = angular.fromJson(data);
				wrapped.imageUrl = "http://ddragon.leagueoflegends.com/cdn/"+wrapped.version+"/img/champion/"+wrapped.key+".png";
				
				return wrapped;
			}
		}
    });
  }]);


