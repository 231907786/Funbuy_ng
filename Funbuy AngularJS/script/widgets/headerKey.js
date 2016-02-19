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
        .directive('headerKey', headerKey);

    /* @ngInject */
    function headerKey () {
        // Opens and closes the sidebar menu.
        // Usage:
        //  <div data-cc-sidebar">
        //  <div data-cc-sidebar whenDoneAnimating="vm.sidebarReady()">
        // Creates:
        //  <div data-cc-sidebar class="sidebar">
        var directive = {

            restrict: 'EA',
            require: '?^headerKey',

            scope:{
                tag:'=tag'
            },
            replace:true,
            template:'<span class="roll-title roll-title-4" data-ng-value="tag"></span>',

            link:function (scope, element, attrs){
                var tag =scope.tag;
                if(parseInt(tag) == 1){
                    $(element).html("竞技达人");
                }
                if(parseInt(tag) == 2){
                    $(element).html("职业队员");
                }
                if(parseInt(tag) == 3){
                    $(element).html("组织机构");
                }
                if(parseInt(tag) == 4){
                    $(element).html("电竞解说");
                }
                if(parseInt(tag) == 5){
                    $(element).html("竞猜明灯");
                }
                if(parseInt(tag) == 6){
                    $(element).html("全部头衔");
                }
                if(parseInt(tag) == 7){
                    $(element).html("土豪");
                }
            }
        };
        return directive;
    }
})();
