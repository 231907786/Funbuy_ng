/**
 * Created by Administrator on 2016/1/19 0019.
 */
(function() {
    'use strict';

    angular
        .module('app.widgets')
        .directive('navSearchTooler', navSearchTooler);

    /* @ngInject */
    function navSearchTooler () {
        // Opens and closes the sidebar menu.
        // Usage:
        //  <div data-cc-sidebar">
        //  <div data-cc-sidebar whenDoneAnimating="vm.sidebarReady()">
        // Creates:
        //  <div data-cc-sidebar class="sidebar">
        var directive = {

            restrict: 'EA',
            require: '?^navSearchTooler',
            scope:{
                greet:'&'
               },
            replace:true,
            templateUrl:'script/widgets/navSearchTooler.html'

        };
        return directive;



    }
})();
