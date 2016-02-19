// Project:Funbuy
// Author: yeshanqi
// Date:2016-02-18
(function(){
	angular.module('app.main')
		.controller('guess.index.carouselCtrl', ['$scope', 'dataservice', function ($scope, rest) {
			// Function:ajax
		    // Comment:顶部轮播图数据
		    // Author: yeshanqi
		    // Date:2016-02-18
		    rest["guess-index-carousel"]().then(function (result) {
		    	$scope.carousel = result.data;
		    });

		}])
		.controller('guess.index.leftCtrl', ['$scope', '$q', '$timeout', 'dataservice', function($scope, $q, $timeout, rest) {
			// Comment:头部tab栏,下面属性注释单写
			// Author: yeshanqi
			// @pending: 从点击到ajax请求完成的标志位，防止用户重复点击
			// @switchRecentHistory: 切换tab页时重置到第一页
			// Date:2016-02-18
		    $scope.header = {
		        state: 0, //0:最近比赛, 1:历史比赛
		        pending: false,
		        switchRecentHistory: function(state) {
		            state = Number(state);
		            if (this.state === state || this.pending) {
		                return;
		            }
		            this.pending = true;
		            var callback = function(){
		                this.state = state;
		                $scope.paginate.curPage = 1;
		                this.pending = false;
		            }.bind(this);
		            var params = {
		                state: state,
		                pageNum: 1,
		                pageSize: $scope.paginate.pageSize,
		            };
		            getNewMatches(callback, params);
		        },
		    };
	        // Comment:比赛分页条,属性注释单写
	        // Author: yeshanqi
	        // @pending: 从点击到ajax请求完成的标志位，防止用户重复点击
	        // @go: 向后台请求一页数据
	        // @pages: ng-repeat需要用到的占位数组
	        // Date:2016-02-18
		    $scope.paginate = {
		        pending: false,
		        go: function(pageNum) {
		            pageNum = Number(pageNum);
		            if (pageNum < 1 || pageNum > this.pages.length || this.pending) {
		                return;
		            }
		            this.pending = true;
		            var callback = function(){
		                this.curPage = pageNum;
		                this.pending = false;
		            }.bind(this);
		            var params = {
		                state: $scope.header.state,
		                pageNum: pageNum,
		                pageSize: $scope.paginate.pageSize,
		            };
		            getNewMatches(callback, params);
		        },
		        pages: [1],
		        curPage: 1,
		        pageSize: 10,
		    };
		    // Function: getNewMatches 
		    // @callback: 得到数据后的回调
		    // @params: GET请求的参数
		    // Comment: 封装的ajax请求一页数据, 根据得到的totalSize值计算总页数并同步到view
		    // Author: yeshanqi
		    // Date:2016-02-18
		    function getNewMatches(callback, params){
		        rest["guess-index-matches"]({params:params}).then(function(result){
		        	var data = result.data;
		            $scope.matches = data.matches;
		            var config = data.config;
		            if(config && config.totalSize){
		                var totalPage = Math.ceil(Number(config.totalSize) / $scope.paginate.pageSize);
		                if(totalPage !== $scope.paginate.pages.length){
		                    var arr = [];
		                    for(var i=0; i<totalPage; i++){
		                        arr.push(i + 1);
		                    }
		                    $scope.paginate.pages = arr;
		                }
		            }
		            angular.isFunction(callback) && callback();
		        });
		    }
		    // Function: init 
		    // Comment: 页面初始化
		    // Author: yeshanqi
		    // Date:2016-02-18
		    (function init(){
		        getNewMatches(null, {
		            state: 0,
		            pageNum: 1,
		            pageSize: $scope.paginate.pageSize,
		        });

		    })();
		}])
		.controller('guess.index.rightCtrl', ['$scope', 'dataservice', function($scope, rest) {
			// Comment:明灯黑灯榜
			// Author: yeshanqi
			// @arr: 当前显示的榜单数据，数组形式
			// @changeTab: 点击tab切换明灯/黑灯
			// Date:2016-02-18
		    var top = [];
		    $scope.top = {
		        arr: [],
		        curTab: 0,
		        changeTab: function(tab) {
		            //0:明灯,1:黑灯
		            tab = Number(tab);
		            if (this.curTab === tab) {
		                return;
		            } else {
		                this.curTab = tab;
		                this.arr = top[tab];
		            }

		        },
		    };
		    $scope.bottom = [];
		    // Function: init 
		    // Comment: 页面数据初始化
		    // Author: yeshanqi
		    // Date:2016-02-18
		    (function init(){
		        rest["guess-index-lights"]().then(function (result) {
		        	var data = result.data;
		        	top[0] = data;
		        	$scope.top.arr = top[0];
		        });
		        rest["guess-index-darkLights"]().then(function (result) {
		        	var data = result.data;
		        	top[1] = data;
		        });
		        rest["guess-index-bestGamblers"]().then(function (result) {
		        	var data = result.data;
		        	$scope.bottom = data;
		        });

		    })();
		}])
})();