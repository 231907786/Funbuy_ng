(function() {
    'use strict';

    var apis = {
        "getRollIndexDataList": ['GET', '/api/roll/index'],
        "getRollDetailDataList": ['GET', '/api/roll/detail'],
        "getUserVpByNameId": ['GET', '/api/roll/name_vm'],
        "guess-index-carousel": ['GET', '/api/guess/index/carousel'],
        "guess-index-matches": ['GET', '/api/guess/index/matches'],
        "guess-index-lights": ['GET', '/api/guess/index/lights'],
        "guess-index-darkLights": ['GET', '/api/guess/index/darkLights'],
        "guess-index-bestGamblers": ['GET', '/api/guess/index/bestGamblers'],
        "guess-detail-spinachCorps": ['GET', '/api/guess/detail/spinachCorps'],
        "guess-detail-comments": ['GET', '/api/guess/detail/comments'],
        "guess-detail-goldGuessRecords": ['GET', '/api/guess/detail/goldGuessRecords'],
        "guess-detail-itemGuessRecords": ['GET', '/api/guess/detail/itemGuessRecords'],
        "guess-detail-mybets": ['GET', '/api/guess/detail/mybets'],
        "guess-detail-richests": ['GET', '/api/guess/detail/richests'],
        "csgo-index-lights": ['GET', '/api/csgo/index/lights'],
        "csgo-index-darkLights": ['GET', '/api/csgo/index/darkLights'],
        "csgo-index-matches": ['GET', '/api/csgo/index/matches'],
        "csgo-detail-ravity": ['GET', '/api/csgo/detail/ravity'],
        "csgo-detail-facade": ['GET', '/api/csgo/detail/facade'],
        "csgo-detail-spinach": ['GET', '/api/csgo/detail/spinach'],
        "csgo-detail-richest": ['GET', '/api/csgo/detail/richest'],
        "csgo-detail-profile": ['GET', '/api/csgo/detail/profile'],
        "getSecurityData": ['GET',  '/api/roll/security'],
        "user-userInfo-users":['GET','/api/user/userInfo/users'],
        "user-userInfo-get":['GET','/api/user/userInfo/get'],
        "user-userInfo-get_V":['GET','/api/user/userInfo/get_V'],
        "user-my_trade-my_purchase":['GET','/api/user/my_trade/my_purchase'],
        "user-my_trade-my_sell":['GET','/api/user/my_trade/my_sell'],
        "api-user-my_trade-my_demand":['GET','/api/user/my_trade/my_demand'],
        "api-user-my_trade-my_quote":['GET','/api/user/my_trade/my_quote'],
        "api-user-userInfo-user_login_record":['GET','/api/user/userInfo/user_login_record'],

    };

    var dataservice = ['$http', function dataservice ($http) {
        var obj = {};
        for (var key in apis){
            if(apis.hasOwnProperty(key)){
                obj[key] = ajaxWrapper(apis[key]);
            }
        }
        function ajaxWrapper (apiPair) {
            return function (config) {
                config = config || {};
                var defaultConfig = {
                    method: apiPair[0],
                    url: apiPair[1]
                };
                config = angular.extend(defaultConfig, config);
                return $http(config);
            };
            };   

        return obj;
    }];

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

 })();
