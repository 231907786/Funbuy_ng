/**
 * Created by Administrator on 2016/1/19 0019.
 */
(function() {
    'use strict';

    angular
        .module('app.widgets')
        .directive('navSearchOther2Tooler', navSearchOther2Tooler);

    /* @ngInject */
    function navSearchOther2Tooler () {
        var directive = {

            restrict: 'EA',
            require: '?^navSearchOther2Tooler',
            scope:{
                greet:'&'
               },
            replace:true,
            templateUrl:'script/widgets/navSearchOther2Tooler.html'

        };
        return directive;



    }
})();
