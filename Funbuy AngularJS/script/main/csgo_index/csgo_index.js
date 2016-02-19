// Project:Funbuy
// Author: yeshanqi
// Date:2016-02-18
angular.module('app.main')
	.controller('csgo.index.rightCtrl', ['$scope', 'dataservice', function ($scope, rest) {
		rest["csgo-index-lights"]().then(function (result) {
		    var data = result.data;
		    $scope.lights = data;
		});
		rest["csgo-index-darkLights"]().then(function (result) {
		    var data = result.data;
		    $scope.darks = data;
		});
	}])
	.controller('csgo.index.leftCtrl', ['$scope', 'dataservice', function($scope, rest){
	    $scope.category = 'all';
	    $scope.state = 'normal';
	    $scope.matches = [];
	    $scope.changeCategory = changeCategory;
	    $scope.changeMatchState = changeMatchState;
	    // Function: changeCategory 
	    // Comment: 切换游戏分类并请求数据
	    // Author: yeshanqi
	    // Date:2016-02-18
	    function changeCategory (str) {
	        $scope.category = str;
	        getMatches({category:$scope.category,state:$scope.state},true);
	    }
	    // Function: changeMatchState 
	    // Comment: 切换比赛状态并请求数据
	    // Author: yeshanqi
	    // Date:2016-02-18
	    function changeMatchState (str) {
	        $scope.state = str;
	        getMatches({category:$scope.category,state:$scope.state},true);
	    }
	    // Function: getMatches 
	    // Comment: 封装ajax请求,通过标志位决定添加/替换数据
	    // Author: yeshanqi
	    // Date:2016-02-18
	    function getMatches (params,isUpdate) {
	    	rest["csgo-index-matches"]({params:params}).then(function (result) {
	    	    var data = result.data;
	    	    if(isUpdate){
	    	    	$scope.matches = data;
	    	    }else{
	    	    	$scope.matches = $scope.matches.concat(data);
	    	    }
	    	});
	    }
	    (function init(){
	        getMatches({category:$scope.category,state:$scope.state},true);
	        // Comment: 注册滚动条事件，向下滚动到底部前请求更多数据
	        // Author: yeshanqi
	        // Date:2016-02-18
	        window.addEventListener('scroll', function (event) {
	            var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
	            var clientHeight = document.documentElement.clientHeight;
	            var scrollHeight = document.documentElement.scrollHeight;
	            var toBottom = scrollHeight - (scrollTop + clientHeight);
	            if (toBottom < 200){
	                getMatches({category:$scope.category,state:$scope.state},false);
	            }
	        });
	    })();
	}])