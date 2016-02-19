/**
 * Created by Administrator on 2016/1/20 0020.
 */
/**
 * Created by Administrator on 2016/1/19 0019.
 */
(function() {
    'use strict';

    angular
        .module('app.widgets')
        .directive('lastTimer', lastTimer);

    /* @ngInject */
    function lastTimer () {
        // Opens and closes the sidebar menu.
        // Usage:
        //  <div data-cc-sidebar">
        //  <div data-cc-sidebar whenDoneAnimating="vm.sidebarReady()">
        // Creates:
        //  <div data-cc-sidebar class="sidebar">
        var directive = {

            restrict: 'EA',
            require: '?^lastTimer',

            scope: {
                lastTimer: '=lastTimer'
            },
            replace: true,
            template: '<span data-ng-value="lastTimer"></span>',

            link: function (scope, element, attrs) {


                var lastTimer = attrs.lasttimer;
                var nowTimer = (new Date()).getTime();
                var timer = nowTimer - lastTimer;
                var days = (timer) / 1000 / 60 / 60 / 24;
                var daysRound = Math.floor(days);
                var hours = (timer) / 1000 / 60 / 60 - (24 * daysRound);
                var hoursRound = Math.floor(hours);
                var minutes = (timer) / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound);
                var minutesRound = Math.floor(minutes);
                var seconds = (timer) / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound);
                var secondsRound = Math.round(seconds);
                if(daysRound<=0)
                {
                    if(hoursRound <=0){
                        $(element).html("");
                        $(element).html(minutesRound + "分" + secondsRound + "秒");
                        if(minutesRound<=0){
                            $(element).html("");
                            $(element).html(secondsRound + "秒");
                        }
                    }else{
                        $(element).html("");
                        $(element).html(hoursRound + "小时" + minutesRound + "分" + secondsRound + "秒");
                    }

                }else{
                    $(element).html("");
                    $(element).html(daysRound + "天" + hoursRound + "小时" + minutesRound + "分" + secondsRound + "秒");
                }



            }
        };

        return directive;
    }
})();
