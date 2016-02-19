// Project:Funbuy
// Author: yeshanqi
// Date:2016-02-18
angular.module('app.main')
    // Function: rarityText 
    // Comment: angular filter，用于映射有确定关系的中英文字段
    // Author: yeshanqi
    // Date:2016-02-18
    .filter('rarityText', [function() {
        return function(item) {
            switch (item) {
                case 'common':
                    return '普通';
                case 'uncommon':
                    return '罕见';
                case 'rare':
                    return '稀有';
                case 'legendary':
                    return '传说';
                case 'mythical':
                    return '神话';
                case 'arcana':
                    return '至宝';
                case 'immortal':
                    return '不朽';
            }
        };
    }])
    .controller('guess.detail.leftCtrl', ['$scope', '$timeout', 'dataservice', function($scope, $timeout, rest) {

        var spinachPick = $scope.spinachPick = {
            state: -1,
            pick: function (state) {
                if(this.state === state){
                    this.state = -1;
                }else{
                    this.state = state;
                }     
            }
        };

        
        // Comment: 饰品竞猜的3个下拉框
        // Author: yeshanqi
        // Date:2016-02-18
        var itemBag = $scope.itemBag = {
            type: {
                currentText: '所有类型',
                currentIndex: 0,
                showOptions: false,
                options: ['所有类型', '装备', '套装', '工具', '信使', '门票', '嘲讽', '宝石'],
                choose: function(index) {
                    this.currentIndex = index;
                    this.currentText = this.options[index];
                }
            },
            rarity: {
                currentText: '所有稀有度',
                currentIndex: 0,
                showOptions: false,
                options: ['所有稀有度', '普通', '罕见', '稀有', '神话', '传说', '远古', '不朽', '至宝'],
                choose: function(index) {
                    this.currentIndex = index;
                    this.currentText = this.options[index];
                }
            },
            quality: {
                currentText: '所有品质',
                currentIndex: 0,
                showOptions: false,
                options: ['所有品质', '基础', '纯正', '上古', '独特', '标准', '社区', 'Valve', '自制', '自定义', '铭刻', '完整', '凶煞', '英雄传世', '青睐', '传奇', '亲笔签名', '绝版', '尊享', '冻人', '冥灵', '吉祥', '融合'],
                choose: function(index) {
                    this.currentIndex = index;
                    this.currentText = this.options[index];
                }
            },
        };

        // Comment: 下拉框开启时的关闭事件注册
        // Author: yeshanqi
        // Date:2016-02-18
        document.addEventListener('click', function(evt) {
            var node = evt.target;
            if (node.nodeName !== 'BUTTON' && node.parentNode.nodeName !== 'BUTTON') {
                $scope.$apply(function() {
                    itemBag.type.showOptions = false;
                    itemBag.rarity.showOptions = false;
                    itemBag.quality.showOptions = false;
                });
            }
        });

        var inventory = $scope.inventory = {
            tabState: 0,
            changeTab: function (index) {
                (this.tabState !== index) && (this.tabState = index);     
            }
        };

        (function init() {
            rest["guess-detail-spinachCorps"]().then(function(result) {
                var data = result.data;
                var spinachCorps = data;
                spinachCorps.guess.click = function(state) {
                    if (state === this.state) {
                        return;
                    } else {
                        this.state = state;
                    }
                };
                $scope.spinachCorps = spinachCorps;
                // Comment: 数据同步到highcharts图表中(队名、胜场)
                // Author: yeshanqi
                // Date:2016-02-18
                $('#compare-chart').highcharts({
                    chart: {
                        type: 'pie',
                        backgroundColor: "#262626"
                    },
                    title: null,
                    tooltip: {
                        headerFormat: '',
                        pointFormat: "{point.name}"
                    },
                    plotOptions: {
                        pie: {
                            center: ['50%', "53%"],
                            shadow: false,
                            size: 170,
                            minSize: 100,
                            borderColor: "#262626",
                            borderWidth: 2,
                            dataLabels: {
                                connectorWidth: 0,
                                distance: -40,
                                format: "{point.percentage:.1f} %"
                            }
                        }
                    },
                    credits: false,
                    series: [{
                        type: 'pie',
                        sliced: true,
                        data: [{
                                name: spinachCorps.teamB.name,
                                y: countWins(spinachCorps.teamB.lastGames),
                                selected: true,
                                color: "#333"

                            }, {
                                name: spinachCorps.teamA.name,
                                y: countWins(spinachCorps.teamA.lastGames),
                                selected: true,
                                color: "#1a1a1a"
                            }

                        ]
                    }]
                });

                function countWins(arr) {
                    var i = 0;
                    arr.map(function(item) {
                        if (item.win) {
                            i++;
                        }
                    })
                    return i;
                }
            });
            var itemGuessRecords = [];
            var goldGuessRecords = [];
            rest["guess-detail-goldGuessRecords"]().then(function(result) {
                var data = result.data;
                goldGuessRecords = groupArrByNum(data, 2);
            });
            rest["guess-detail-itemGuessRecords"]().then(function(result) {
                var data = result.data;
                itemGuessRecords = groupArrByNum(data, 2);
                $scope.spinachRecord = {
                    tabState: 0,
                    switchTab: function(state) {
                        state = Number(state);
                        if (state === this.tabState) {
                            return;
                        } else {
                            this.tabState = state;
                            if (state === 0) {
                                this.records = itemGuessRecords;
                            } else if (state === 1) {
                                this.records = goldGuessRecords;
                            }
                        }
                    },
                    records: itemGuessRecords,
                };
            });
        })();
        // Function: groupArrByNum 
        // @arr: 原数组 
        // @num: 单元值 
        // Comment: 将一维数组按给定单元值(num)转成二维数组,用于页面展示
        // Author: yeshanqi
        // Date:2016-02-18
        function groupArrByNum(arr, num) {
            num = Number(num) || 2;
            var newArr = [];
            var tempArr = [];
            arr.map(function(item, index) {
                if (index % num === (num - 1)) { //分组断点
                    tempArr.push(item);
                    newArr.push(tempArr);
                    tempArr = [];
                } else { //一般情况
                    tempArr.push(item);
                }
            });
            if (tempArr.length > 0) {
                //arr.length不能被num整除的情况
                newArr.push(tempArr);
            }
            return newArr;
        }
    }])
    .controller('guess.detail.rightCtrl', ['$scope', 'dataservice', function($scope, rest) {
        // Comment: 用户评论区点赞、踩、举报操作,目前没有做后台交互
        // Author: yeshanqi
        // Date:2016-02-18
        $scope.commentActions = {
            zan: function(comment) {
                comment.zans = comment.zans + 1;
            },
            step: function(comment) {
                comment.steps = comment.steps + 1;
            },
            report: function(comment) {
                console.log(comment);
            },
        };
        (function init() {
            rest["guess-detail-mybets"]().then(function(result) {
                var data = result.data;
                $scope.mybets = {
                    avatar: data.avatar,
                    total: data.wins + data.loss,
                    wins: data.wins,
                    loss: data.loss,
                    winRate: (data.wins / (data.wins + data.loss)) * 100,
                };
            });
            rest["guess-detail-richests"]().then(function(result) {
                var data = result.data;
                $scope.richests = data;
            });
            rest["guess-detail-comments"]().then(function(result) {
                var comments = result.data;
                // Function: getPagedataFromArray 
                // Comment: 前台分页
                // @pageNum: 页码
                // @pageSize: 每页条数
                // Author: yeshanqi
                // Date:2016-02-18
                comments.getPagedataFromArray = function(pageNum, pageSize) {
                    var beginIndex = (pageNum - 1) * pageSize;
                    var endIndex = pageNum * pageSize;
                    return this.slice(beginIndex, endIndex);
                };
                $scope.comments = comments.getPagedataFromArray(1, 5);
                // Comment: 分页条。特点是没有上下翻页，点击边界页时会出现下一页按钮（如果不是最后一页）
                // Author: yeshanqi
                // Date:2016-02-18
                $scope.commentsPaginate = {
                    pages: generatePages(comments.length),
                    start: 1,
                    end: 4,
                    curPage: 1,
                    go: function(pageNum) {
                        if (pageNum === this.curPage) {
                            return;
                        } else {
                            if ((pageNum === this.start) && (this.start > 1)) {
                                this.start = this.start - 1;
                                this.end = this.end - 1;
                                this.curPage = pageNum;
                                $scope.comments = comments.getPagedataFromArray(pageNum, 5);
                            } else if ((pageNum === this.end) && (this.end < this.pages.length)) {
                                this.start = this.start + 1;
                                this.end = this.end + 1;
                                this.curPage = pageNum;
                                $scope.comments = comments.getPagedataFromArray(pageNum, 5);
                            } else {
                                this.curPage = pageNum;
                                $scope.comments = comments.getPagedataFromArray(pageNum, 5);
                            }
                        }
                    },
                };
                // Function: generatePages 
                // Comment: 生成ng-repeat需要显示的viewmodel
                // @total: 总条数
                // Author: yeshanqi
                // Date:2016-02-18
                function generatePages(total) {
                    var pageSize = 5;
                    var totalPage = Math.ceil(total / pageSize);
                    var arr = [];
                    for (var i = 0; i < totalPage; i++) {
                        arr.push(i + 1);
                    }
                    return arr;
                }
            })
            // Comment: 从原页面剥离的jquery代码,功能是 回到顶部按钮、富豪榜slide
            // Author: yeshanqi
            // Date:2016-02-18
            setTimeout(function() {
                var wallTimer;
                $(".richest-wall-list li").hover(function() {
                    var _this = $(this);
                    clearTimeout(wallTimer);
                    wallTimer = setTimeout(function() {
                        $(".richest-wall-list li .spinach-article:visible").not($(this).find(".spinach-article")).stop().slideUp("fast");
                        _this.find(".spinach-article").stop().slideDown("fast");
                    }, 300);

                }, function() {
                    clearTimeout(wallTimer);
                });
                $(document).on('click', '#scroll-up', function() {
                    $('html, body').animate({
                        scrollTop: 0
                    }, 1000);
                });
                $(window).scroll(function() {
                    var $this = $(this);
                    if ($this.scrollTop() < 100) {
                        $('#scroll-up').fadeOut();
                    } else if ($('#scroll-up').is(':hidden')) {
                        $('#scroll-up').fadeIn();
                    }
                });
            }, 100);

        })();
    }]);
