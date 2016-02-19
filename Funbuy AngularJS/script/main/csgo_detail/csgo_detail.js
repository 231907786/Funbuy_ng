// Project:Funbuy
// Author: yeshanqi
// Date:2016-02-18
angular.module('app.main')
    .controller('csgo.detail.baseCtrl', ['$scope', 'dataservice', function($scope, rest) {
        // Comment: 品质下拉框
        // Author: yeshanqi
        // Date:2016-02-18
        var ravity = $scope.ravity = {
            currentText: '',
            currentIndex: 0,
            showOptions: false,
            options: [],
            choose: function(index) {
                this.currentIndex = index;
                this.currentText = this.options[index];
            }
        };
        // Comment: 外观下拉框
        // Author: yeshanqi
        // Date:2016-02-18
        var facade = $scope.facade = {
            currentText: '',
            currentIndex: 0,
            showOptions: false,
            options: [],
            choose: function(index) {
                this.currentIndex = index;
                this.currentText = this.options[index];
            }
        };
        // Comment: 注册下拉框点击关闭事件
        // Author: yeshanqi
        // Date:2016-02-18
        document.addEventListener('click', function(evt) {
            var node = evt.target;
            if (node.nodeName !== 'BUTTON' && node.parentNode.nodeName !== 'BUTTON') {
                $scope.$apply(function() {
                    ravity.showOptions = false;
                    facade.showOptions = false;
                });
            }
        });


        //header
        var spinach = $scope.spinach = {};

        //bet
        var betTab = $scope.betTab = {
            active: 0,
            choosed: -1,
            chooseWin: function(index) {
                if (this.choosed === index) {
                    this.choosed = -1;
                } else {
                    this.choosed = index;
                }
            },
            myBag: {
                sort: function(sortBy) {
                    if (sortBy === 'price') {
                        if (this.priceSort === 'desc') {
                            this.priceSort = 'asc';
                        } else {
                            this.priceSort = 'desc';
                        }
                    }
                },
                priceSort: 'desc'
            }
        };

        //guessTab
        var guessTab = $scope.guessTab = {
            state: 0,
            changeTab: function(state) {
                (this.state !== state) && (this.state = state);
            },
        };
        // Comment: 页面数据初始化
        // Author: yeshanqi
        // Date:2016-02-18
        (function init(){
            rest["csgo-detail-ravity"]().then(function (result) {
                var data = result.data;
                ravity.options = data;
                ravity.currentText = data[0];
            });
            rest["csgo-detail-facade"]().then(function (result) {
                var data = result.data;
                facade.options = data;
                facade.currentText = data[0];
            });
            rest["csgo-detail-spinach"]().then(function (result) {
                var data = result.data;
                angular.extend(spinach, data);
            });

        })();
    }])
    .controller('csgo.detail.rightCtrl', ['$scope', 'dataservice', function($scope, rest) {
        
        var th = $scope.th = {
            users: []
        };
        var profile = $scope.profile = {};
        // Comment: 页面数据初始化
        // Author: yeshanqi
        // Date:2016-02-18
        (function init(){
            rest["csgo-detail-richest"]().then(function (result) {
                var data = result.data;
                th.users = data;
            });
            rest["csgo-detail-profile"]().then(function (result) {
                var data = result.data;
                angular.extend(profile, data);
            });
        })();
    }])
