(function() {
    'use strict';

    angular.module('app', [
        'app.core',
        'app.common',
        'app.widgets',
        'app.feature',
        'app.layout',
        'app.main',
        'ui.bootstrap',
        'ngAnimate'
    ]).filter('numSegment', function(){
            return function(val){
                var arr = Array.prototype.slice.call(String(val)).reverse();
                if(arr.length <= 3){
                    return String(val);
                }else{
                    var tempArr = [];
                    arr.map(function(item, index, arr){
                        tempArr.push(item);
                        var last = (arr.length - 1) === index;
                        if(index % 3 === 2 && !last){
                            tempArr.push(',');
                        }
                    });
                    return tempArr.reverse().join('');
                }
            };
        })
})();
