/**
 * Created by Administrator on 2016/1/19 0019.
 */
(function() {
    'use strict';

    angular
        .module('app.widgets')
        .directive('navSearchOther3Tooler', navSearchOther3Tooler);

    /* @ngInject */
    function navSearchOther3Tooler () {
        var directive = {

            restrict: 'EA',
            require: '?^navSearchOther3Tooler',
            scope:{
                greet:'&'
               },
            replace:true,
            templateUrl:'script/widgets/navSearchOther3Tooler.html'

        };
        return directive;



    }
})();
