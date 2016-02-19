/**
 *  所有页面都用得到的方法
 *  author：dawang
 *  date:2013/07/22
 **/
$(function () {

    $("input[type='radio']").not($(".vpgame-icheck-panel input")).iCheck();
    //说明
    $(".explain-icon").tooltip({
        template: '<div class="tooltip explain-tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
    });
    //禁止数字以外输入
    $(document).on('keyup', '[data-number="true"]', function (e) {
        if (!/^(\d|[1-3]\d|40)$/gm.test(e.keyCode)) {
            var rge = /\D/g;
            $(this).val($(this).val().replace(rge, ""));
        }
    });

    $('[data-toggle="tooltip-normal"]').tooltip();
    //: 返回顶端
    $(document).on('click', '#scroll-up', function () {
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    });
    $(window).scroll(function () {
        var $this = $(this);
        if ($this.scrollTop() < 100) {
            $('#scroll-up').fadeOut();
        } else if ($('#scroll-up').is(':hidden')) {
            $('#scroll-up').fadeIn();
        }
    });
    //判断是否为手机访问
    var thisOS = navigator.platform;
    var os = new Array("iPhone", "iPod", "iPad", "android", "Nokia", "SymbianOS", "Symbian", "Windows Phone", "Phone", "Linux armv71", "MAUI", "UNTRUSTED/1.0", "Windows CE", "BlackBerry", "IEMobile");
    for (var i = 0; i < os.length; i++)
    {
        if (thisOS.match(os[i]))
        {
            $("#header").css("position", "relative");
        }
    }
    //modal隐藏判断
    $(document).on("hidden.bs.modal", ".modal", function () {
        if ($(".modal:visible").length >= 1) {
            $("body").addClass("modal-open");
        }
    });


});

//IE8解决不支持数组的indexOf方法
if (!Array.prototype.indexOf)
{
    Array.prototype.indexOf = function (elt /*, from*/)
    {
        var len = this.length >>> 0;
        var from = Number(arguments[1]) || 0;
        from = (from < 0)
                ? Math.ceil(from)
                : Math.floor(from);
        if (from < 0)
            from += len;
        for (; from < len; from++)
        {
            if (from in this &&
                    this[from] === elt)
                return from;
        }
        return -1;
    };
}

Array.prototype.in_array = function(e){
    for(i=0;i<this.length && this[i]!=e;i++);
        return !(i==this.length);
}

// 兼容IE-input占位标志
;
(function (window, $) {
    $(function () {
        if (!$.support.leadingWhitespace) {
            $('input[type=text],input[type=password],textarea').each(function () {
                var that = $(this),
                        placeholder = that.attr('placeholder') || '',
                        span = $('<span class="fuck-IE-input-placeholder">' + placeholder + '</span>');
                that.parent().css('position', 'relative');
                that.before(span);
                if (that[0].nodeName != 'TEXTAREA') {
                    span.css('top', that.height() / 2 - 2 + 'px');
                }
                that.keydown(function () {
                    span.hide();
                }).keyup(function () {
                    if (that.val() == '') {
                        span.show();
                    }
                });

                if (that.val() != '') {
                    span.hide();
                }

                span.on('click', function () {
                    that.focus();
                });
            });
        }
    });
})(window, jQuery, undefined);

// 弹出对话框阴影--结合css
(function (window, $, undefined) {
    $.fn.extend({
        shadow: function () {
            var parent = $(this).parent();
            if (parent.find('.dialog-shadow').length < 1) {
                var height = parent.height() + 20;
                var width = parent.width() + 20;
                $(this).parent().prepend('<div class="dialog-shadow" originalHeight="' + height + '" style="height:' + height + 'px; width:' + width + 'px;top:-10px;left:-10px;"></div>');
            }
            // 如果是IE低版本浏览器，则去掉遮罩(临时处理)
            if ($.browser != undefined && $.browser.msie && parseInt($.browser.version) <= 9) {
                $('.ui-widget-overlay').remove();
            }
        }
    });
})(window, jQuery);

// 获取当前对象值字符长度和根据字符长度获取对象值--用于截取
(function (window, $, undefined) {
    $.fn.extend({
        getLengthOfValue: function () {
            var length = 0,
                    value = $(this).val() || $(this).html(),
                    len = value.length,
                    i = 0;
            for (; i < len; i++) {
                if (value.charCodeAt(i) >= 0 && value.charCodeAt(i) <= 255) {
                    length += 1;
                } else {
                    length += 2;
                }
            }
            return length;
        },
        getValueByLength: function (length) {
            var value = "",
                    val = $(this).val() || $(this).html(),
                    len = val.length,
                    i = 0;
            for (; i < len; i++) {
                if (val.charCodeAt(i) >= 0 && val.charCodeAt(i) <= 255) {
                    length -= 1;
                } else {
                    length -= 2;
                }
                value += val.charAt(i);
                if (length <= 0) {
                    return value;
                }
            }
            return value;
        }
    });
})(window, jQuery);

// 文本匹配--搜索值等
(function (window, $, undefined) {
    $.extend({
        matchSearchValue: function () {
            var m = arguments[arguments.length - 1];
            if (arguments.length < 2 || typeof (m) !== 'string' || m.replace(/(^\s*)|(\s*$)/g, '') == '') {
                return false;
            }
            var args = Array.prototype.slice.call(arguments),
                    target = args.shift(),
                    matchvalue = args.pop(),
                    children = target.children(),
                    regexp,
                    canmatch = false;
            if (children.length > 0) {
                $.matchSearchValue(children, matchvalue);
            } else {
                // 进行匹配
                target.contents().filter(function () {
                    if (this.nodeType != 1) {
                        //regexp = new RegExp(matchvalue.replace(/\|/g, '\\|'), 'ig');
                        regexp = new RegExp(matchvalue.replace(/\W/g, function () {
                            return '\\' + arguments[0];
                        }), 'ig');
                        m = this.nodeValue.match(regexp, matchvalue);
                        if (m != undefined) {
                            this.nodeValue = this.nodeValue.replace(regexp, '<b class="match-b">' + m[0] + '</b>');
                            canmatch = true;
                        }
                    }
                });
                if (canmatch) {
                    target.each(function () {
                        $(this).html($(this).html().replace(new RegExp('&lt;', 'g'), '<').replace(new RegExp('&gt;', 'g'), '>'));
                    });
                }
                if (args.length == 0) {
                    return false;
                } else {
                    $.matchSearchValue(args, matchvalue);
                }
            }
        }
    });
})(window, jQuery);

// 扩展JQ对  对象--json  的操作，将对象转换为json字符串
(function (window, $, undefined) {
    var escape = /["\\\x00-\x1f\x7f-\x9f]/g,
            meta = {
                '\b': '\\b',
                '\t': '\\t',
                '\n': '\\n',
                '\f': '\\f',
                '\r': '\\r',
                '"': '\\"',
                '\\': '\\\\'
            },
    hasOwn = Object.prototype.hasOwnProperty;
    $.extend({
        quoteString: function (str) {
            if (str.match(escape)) {
                return '"' + str.replace(escape, function (a) {
                    var c = meta[a];
                    if (typeof c === 'string') {
                        return c;
                    }
                    c = a.charCodeAt();
                    return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
                }) + '"';
            }
            return '"' + str + '"';
        },
        toJSON: function (obj) {
            // 判断浏览器是否支持JSON对象，对于IE6、7以及IE8兼容模式不存在JSON对象。
            if (typeof JSON === 'object' && JSON.stringify) {
                return JSON.stringify(obj);
            }
            // 不存在转换对象则返回null
            if (obj === null) {
                return 'null';
            }

            var pairs, k, name, val,
                    type = $.type(obj);
            // 根据对象的不同数据类型进行相应的操作
            if (type === 'undefined') {
                return undefined;
            }
            if (type === 'number' || type === 'boolean') {
                return String(obj);
            }
            if (type === 'string') {
                return $.quoteString(obj);
            }
            if (typeof obj.toJSON === 'function') {
                return $.toJSON(obj.toJSON());
            }
            if (type === 'date') {
                var month = obj.getUTCMonth() + 1,
                        day = obj.getUTCDate(),
                        year = obj.getUTCFullYear(),
                        hours = obj.getUTCHours(),
                        minutes = obj.getUTCMinutes(),
                        seconds = obj.getUTCSeconds(),
                        milli = obj.getUTCMilliseconds();

                if (month < 10) {
                    month = '0' + month;
                }
                if (day < 10) {
                    day = '0' + day;
                }
                if (hours < 10) {
                    hours = '0' + hours;
                }
                if (minutes < 10) {
                    minutes = '0' + minutes;
                }
                if (seconds < 10) {
                    seconds = '0' + seconds;
                }
                if (milli < 100) {
                    milli = '0' + milli;
                }
                if (milli < 10) {
                    milli = '0' + milli;
                }
                return '"' + year + '-' + month + '-' + day + 'T' +
                        hours + ':' + minutes + ':' + seconds +
                        '.' + milli + 'Z"';
            }

            pairs = [];

            if ($.isArray(obj)) {
                for (k = 0; k < obj.length; k++) {
                    pairs.push($.toJSON(obj[k]) || 'null');
                }
                return '[' + pairs.join(',') + ']';
            }

            if (typeof obj === 'object') {
                for (k in obj) {
                    // 单独获取到自身的直接属性，和子属性无关联。
                    if (hasOwn.call(obj, k)) {
                        type = typeof k;
                        if (type === 'number') {
                            name = '"' + k + '"';
                        } else if (type === 'string') {
                            name = $.quoteString(k);
                        } else {
                            continue;
                        }
                        type = typeof obj[k];

                        if (type !== 'function' && type !== 'undefined') {
                            val = $.toJSON(obj[k]);
                            pairs.push(name + ':' + val);
                        }
                    }
                }
                return '{' + pairs.join(',') + '}';
            }
        }
    });
})(window, jQuery);

// 滚动条滚动至底边
(function (window, $, undefined) {
    $.fn.scrollToBottom = function () {
        try {
            var $this = $(this),
                    scrollHeight = $this.eq(0)[0].scrollHeight;
            $this.scrollTop(scrollHeight);
        } catch (e) {

        }
    }
})(window, jQuery);

// 触发声音--war!
(function (window, $, undefined) {
    $.noiseTrigger = function () {
        if (/msie/.test(navigator.userAgent.toLowerCase()) && document.documentMode <= 9) {
            $('#audio-div').html(' <bgsound src="' + window.assetsUrl + '/audio/match_ready.mp3" /> ');
        } else {
            $('#audio-div').html('<audio autoplay="true">' + '<source src="' + window.assetsUrl + '/audio/match_ready.mp3"></source>' + '<source src="' + window.assetsUrl + '/audio/match_ready.OGG"></source>' + '</audio>');
        }
    }
})(window, jQuery);

// 预加载效果--支持全屏或者区域,可自定义长宽
(function (window, $, undefined) {
    $.loading = function (args, event) {
        return this.loading.prototype.initialize.call(this.loading.prototype, args, event);
    }
    $.loading.prototype = {
        options: {
            event: undefined,
            width: 0,
            type:'get',
            height: 0
        },
        initialize: function (args, event) {
            var box = event || 'body';
            if (typeof args === 'object') {
                this.show(args);
            } else if (typeof args === 'string') {
                switch (args) {
                    case 'show':
                        this.show(box);
                        break;
                    case 'hide':
                        this.hide(box);
                        break;
                    default:
                        break;
                }
            }
        },
        hide: function (event) {
            var loading;
            if (event && event instanceof jQuery) {
                loading = event.find('.preloading');
            } else {
                loading = $('body > .preloading');
            }
            if (loading.length == 1) {
                loading.remove();
            }
        },
        show: function (args) {
            // 判断传参来选择是否是全屏显示
            if (args) {
                var $this, height, width, pass = false;
                // 判断是否简写或者附带有长宽
                if (args instanceof jQuery) {
                    $this = args;
                    height = $this.height();
                    width = $this.width();
                    pass = true;
                    
                } else if (args.event instanceof jQuery) {
                    var options = $.extend({}, this.options, args);
                    $this = options.event;
                    height = options.height;
                    width = options.width;
                    var type = '';
                    if(options.type == 'render'){
                        type = 'ajaxrender';
                    }
                    if (typeof height === 'number' && typeof width === 'number') {
                        if (height == 0)
                            height = $this.height();
                        if (width == 0)
                            width = $this.width();
                        pass = true;
                    } else {
                        pass = false;
                    }
                }
                if (pass) {
                    var $loading = $('<div class="preloading" style="position: absolute;top: 0px;left: 0px;"><div class="ajax-preloading '+ type +'" style="position: absolute;"></div></div>');
                    $loading.height(height).width(width);
                    $this.css('position') === 'static' ? $this.css('position', 'relative').append($loading) : $this.append($loading);
                }
            } else {
                this.hide();
                $('body').append('<div class="preloading"><div class="ajax-preloading"></div><div class="ajax-mask"></div></div>');
            }
        }
    };
})(window, jQuery);

// 一些小方法集合
(function (window, $, undefined) {
    // 倒计时
    $.fn.countdown = function (time, complete) {
        var $this = $(this);
        if (typeof time === 'number' && time > 0) {
            var timeobj;
            timeobj = timeConvert(time);
            $this.html(timeobj.d + '天' + timeobj.h + '时' + timeobj.m + '分' + timeobj.s + '秒');
            var remainingtime = setInterval(function () {
                --time;
                timeobj = timeConvert(time);
                $this.html(timeobj.d + '天' + timeobj.h + '时' + timeobj.m + '分' + timeobj.s + '秒');
                if (time == 0) {
                    complete($this);
                    clearInterval(remainingtime);
                }
            }, 1000);
        } else {
            complete($this);
        }
    }

    // 计算等级方法
    $.levelshow = function (level) {
        if (typeof level === 'number') {
            var nSun = parseInt(level / 16),
                    nMoon = parseInt(level % 16 / 4),
                    nStar = level % 16 % 4,
                    i,
                    arrStr = [];
            for (i = 0; i < nSun; i++) {
                arrStr.push('<i class="sun level-icon"></i>');
            }
            for (i = 0; i < nMoon; i++) {
                arrStr.push('<i class="moon level-icon"></i>');
            }
            for (i = 0; i < nStar; i++) {
                arrStr.push('<i class="star level-icon"></i>');
            }
            return arrStr.join('');
        }
        return '';
    }
})(window, jQuery);

// 名片浮动框
(function (window, $, undefined) {
    var $card = $('#popover-card'),
            hideTime, showTime;
    $card.hover(function () {
        // 清除所有的hideTime
        clearTimeout(hideTime);
    }, function () {
        hideTime = setTimeout(function () {
            $card.stop(true, true).fadeOut();
        }, 500);
    });
    $.fn.popoverCard = function (args) {
        $(this).each(function () {
            var $this = $(this),
                    $info = $this.parent(),
                    uid = $info.attr('data-id'),
                    $point, emptyStr = "用户已不存在。";
            $this.hover(function () {
                $point = $('<div class="popover-card-point"></div>');

                // 重置卡片
                clearTimeout(showTime);
                clearTimeout(hideTime);

                // 如果是同一个名片，不需要进行隐藏操作
                if (!($card.attr('uid') !== undefined && uid == $card.attr('uid'))) {
                    $card.stop(true, true).fadeOut().attr('uid', uid);

                    //申请一个自己的showTime，同时避免立刻发送请求
                    showTime = setTimeout(function () {
                        // 数据存在于缓存中则直接展示
                        tempData = $('body').data(uid);
                        // 数据获取
                        if (tempData !== undefined) {
                            if (tempData == '') {
                                $card.html($point).append(emptyStr);
                            } else {
                                $card.html($point);
                                createCardDom(tempData, $card);
                            }
                            showCard($card, $this);
                        } else {
                            // 数据不存在于缓存中则异步获取展示
                            $.ajax({
                                url: $info.attr('data-ajax'),
                                data: 'id=' + uid,
                                type: 'POST',
                                beforeSend: function () {
                                    // 需要将卡片变成loading状态
                                    $.loading($card.html($point));
                                },
                                success: function (data) {
                                    $.loading('hide', $card);
                                    // 防止请求慢的多个内容重叠在一起，重新覆盖内容
                                    $card.html($point);
                                    // 将数据放于缓存之中
                                    if (data === '') {
                                        $card.append(emptyStr);
                                        showCard($card, $this);
                                    } else {
                                        createCardDom(data, $card);
                                        showCard($card, $this);
                                    }
                                    $('body').data(uid, data);
                                }
                            });
                        }
                    }, 200);
                }
            }, function () {
                // 申请一个自己的hideTime；
                hideTime = setTimeout(function () {
                    $card.stop(true, true).fadeOut();
                }, 500);
            });
        });
    }

    function createCardDom(data, $card) {
        $card.append(data);

        // 可称赞的功能
        $card.find('a.popover-item-praise').click(function () {
            var $this = $(this);
            $.ajax({
                url: $this.attr('href'),
                data: 'id=' + $this.attr('uid'),
                type: 'POST',
                dataType: 'json',
                beforeSend: function () {
                    $this.attr('disabled', 'disabled');
                },
                success: function (data) {
                    if (data != null && data.status == 200) {
                        $.promptDialog('称赞成功！');
                    }
                },
                error: function () {
                    $this.removeAttr('disabled');
                }
            });
            return false;
        });
    }

    function showCard($card, $this) {
        // 名片位置处理
        var _top = 0,
                _left = 0,
                dom = $this[0],
                $point = $card.find('.popover-card-point');
        while (dom.offsetParent) {
            _top += dom.offsetTop;
            _left += dom.offsetLeft;
            dom = dom.offsetParent;
        }

        // 判断边距
        var _height = $card.outerHeight(),
                _width = $card.outerWidth(),
                _maxHeight = _top + _height,
                _maxWidth = _left + _width;
        // 放置小点位置
        if (_maxHeight > $(window).height() + $(window).scrollTop()) {
            // 总高度大于显示屏高度，名片在上方显示
            _top = _top - _height;
            $point.removeClass('down').addClass('up');
        } else {
            _top = _top + $this.height();
            $point.removeClass('up').addClass('down');
        }
        if (_maxWidth > $(window).width() + $(window).scrollLeft()) {
            // 总宽度大于显示屏宽度，名片在偏左显示
            _left = _left - _width + $this.width();
            $point.removeClass('right').addClass('left');
        } else {
            $point.removeClass('left').addClass('right');
        }

        $card.css("top", _top).css("left", _left).stop(true, true).fadeIn();
    }
})(window, jQuery);

// 根据bootstrap--dialog的封装，仿dialog改造，主要用于远程数据加载
(function (window, $, undefined) {
    $.remoteDialog = function (args) {
        var $dialog, // 弹出框本身
                options = {
                    url: '',
                    title: '标题',
                    showTitle: true,
                    fade: true,
                    width: 800,
                    height: '',
                    buttons: [],
                    showCloseButton: true, // 是否显示右上角关闭按钮
                    loadData: undefined // 可以为iframe的url添加参数
                };

        // 加载iframe所需
        function loadiFrame() {
            var $body = $dialog.find('.modal-body'),
                    $shadow = $(".modal").find('.dialog-shadow'),
                    newurl = options.loadData ? options.loadData() : '',
                    iframe = $('<iframe src="' + (options.url + newurl) + '" frameborder="0" width="100%"></iframe>');
            if (options.showTitle) {
                $dialog.find('.modal-header span').html(options.title);
            }
            $dialog.find('.close').show();
            // 高度自适应
            iframe.load(function () {
                if (typeof options.height === 'number') {
                    iframe.height(options.height);
                    iframe.attr('originalHeight', options.height);
                    $body.height(options.height + 4);
                    $body.attr('originalHeight', options.height + 4);

                    // 背景阴影
                    $body.shadow();
                } else {
                    // ?--
                    $body.parent().height();
                    var height = iframe.contents().find("body")[0].offsetHeight;
                    iframe.height(height);
                    iframe.attr('originalHeight', height);
                    $body.height(height + 4);
                    $body.attr('originalHeight', height + 4);

                    // 背景阴影
                    $body.shadow();
                }

                // 重新设置阴影长度和宽度
                $shadow.attr('style', 'height: ' + $shadow.attr('originalHeight') + 'px; width: ' + (options.width + 20) + 'px;top: -10px;left: -10px;');
            });

            // 重新设置宽度
            if (typeof options.width === 'number') {
                $dialog.find(".modal-dialog").attr('style', 'width:' + options.width + 'px;');
            }

            $body.html(iframe);
        }

        if (arguments.length == 1 && typeof args === 'object') {
            options = $.extend({}, options, args);
            if ($('.remoteDialog').length == 0) {
                if (/\?/g.test(options.url)) {
                    options.url += '&v=' + new Date().getTime();
                } else {
                    options.url += '?v=' + new Date().getTime();
                }

                var dialogHtml = '<div class="remoteDialog modal" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog" style="width:' + options.width + 'px"><div class="modal-content">';
                if (options.showTitle) {
                    dialogHtml += '<div class="modal-header">';
                    if (options.showCloseButton) {
                        dialogHtml += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>';
                    }
                    dialogHtml += '<span></span></div>';
                } else if (options.showCloseButton) {
                    dialogHtml += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>'
                }

                dialogHtml += '<div class="popmodal-body"><div class="modal-body scroll-bar"' + '</div>' + '<div class="modal-footer"></div>' + '</div></div></div></div>';

                // 将dialog代码加入到页面代码中
                $('body').append(dialogHtml);

                $dialog = $('.remoteDialog');
                var $footer = $dialog.find('.modal-footer'),
                        btns = options.buttons,
                        length = btns.length,
                        $btn,
                        i;
                // 是否需要淡入淡出
                if (options.fade) {
                    $dialog.addClass('fade');
                }
                // 是否加入button
                if (length > 0) {
                    for (i = 0; i < length; i++) {
                        $btn = $('<button class="btn">' + btns[i].text + '</button>');
                        $footer.append($btn);
                        $btn.click(btns[i].click);
                    }
                    ;
                }
                // 绑定dialog打开时执行的行为
                $dialog.off('shown').on('shown', function () {
                    if (typeof options.open === 'function')
                        options.open();
                });
                // 绑定dialog关闭时执行的行为
                $dialog.off('hidden').on('hidden', function () {
                    if (typeof options.close === 'function')
                        options.close();
                });
            }

            // 返回合并后的参数对象
            return options;
        } else {
            if (typeof arguments[0] === 'string') {
                $dialog = $('.remoteDialog').length > 0 ? $('.remoteDialog') : $('.remoteDialog', parent.document);
                switch (args) {
                    case 'close':
                        setTimeout(function () {
                            $dialog.find('.close').trigger('click');
                        }, typeof arguments[1] === 'number' ? arguments[1] : 0);
                        return false;
                    case 'show':
                        options = typeof arguments[1] === 'object' ? arguments[1] : {};
                        loadiFrame();
                        if (!options.showCloseButton)
                            $dialog.modal({
                                backdrop: 'static',
                                keyboard: false
                            });
                        $dialog.modal('show');
                        if (arguments[2] === 'function') {
                            arguments[2]();
                        }
                        return false;
                    case 'height':
                        var $body = $dialog.find('.modal-body'),
                                $shadow = $dialog.find('.dialog-shadow'),
                                $iframe = $dialog.find('iframe'),
                                height = typeof arguments[1] === 'number' ? arguments[1] : 0;
                        $body.height(1 * $body.attr('originalHeight') + height);
                        $shadow.height(1 * $shadow.attr('originalHeight') + height);
                        $iframe.height(1 * $iframe.attr('originalHeight') + height);
                    default:
                        return false;
                }
            }
        }
        return false;
    }
})(window, jQuery);

// 自行处理的一个动态绑定事件
(function (window, $, undefined) {
    $.ownbind = function (args) {
        var options = {
            event: '', //触发对象，可以是多个
            eventType: '', //触发方式
            before: function ($this) {
                return true;
            }, //在绑定方法执行前执行，传入方法触发对象，返回false则不继续往下执行。
            ajax: false, //是否通过ajax来判断绑定方法执行与否
            ajaxOptions: function ($this) {
                return {
                    url: '',
                    success: function () {
                        return true;
                    }
                };
            }, //ajax方式的参数
            after: function ($this) {
                return true;
            }, //在绑定方法执行后执行，传入方法触发对象
            handle: function ($this) {
            } //自定义绑定方法，传入方法触发对象
        };
        if (typeof args === 'object')
            options = $.extend({}, options, args);

        if (options.event == '' || options.eventType == '')
            return false;

        $(document).off(options.eventType, options.event);
        $(document).on(options.eventType, options.event, function () {
            var $this = $(this);
            if (typeof options.before === 'function' && options.before($this)) {
                if (options.ajax) {
                    var ops = options.ajaxOptions($this);
                    $.ajax({
                        url: ops.url,
                        data: ops.data,
                        type: ops.type,
                        dataType: ops.dataType,
                        success: function (data, textStatus, jqXHR) {
                            if (typeof ops.success === 'function' && ops.success(data, textStatus, jqXHR)) {
                                if (typeof options.handle === 'function')
                                    options.handle($this);
                                if (typeof options.after === 'function')
                                    options.after($this);
                            }
                        }
                    });
                } else {
                    if (typeof options.handle === 'function')
                        options.handle($this);
                    if (typeof options.after === 'function')
                        options.after($this);
                }
            }
        });
    }
})(window, jQuery);

// 验证数字（可为零）
function examineNumberZero(valueOfInput) {
    var regexp = new RegExp('([0-9]+(\.[0-9]+)?)', 'g');
    if (valueOfInput == '') {
        return false;
    }
    while (valueOfInput != '') {
        if (regexp.test(valueOfInput)) {
            valueOfInput = valueOfInput.replace(regexp, '');
        } else {
            return false;
        }
    }
    return true;
}

// 验证数字（非零）
function examineNumber(valueOfInput) {
    var regexp = new RegExp('([1-9][0-9]{0,}(\.[0-9]+)?)|(0\.[0-9]+)', 'g');
    if (valueOfInput == '') {
        return false;
    }
    while (valueOfInput != '') {
        if (regexp.test(valueOfInput)) {
            valueOfInput = valueOfInput.replace(regexp, '');
        } else {
            return false;
        }
    }
    return true;
}

// 时间转换
function timeConvert(time) {
    var timeobj = {},
            time_d = parseInt(time / 24 / 3600),
            time_tmp = time % (3600 * 24),
            time_h = parseInt(time_tmp / 3600),
            time_m = parseInt((time_tmp % 3600) / 60),
            time_s = time_tmp % 3600 % 60;
    timeobj.d = time_d;
    timeobj.h = time_h < 10 ? '0' + time_h : time_h;
    timeobj.m = time_m < 10 ? '0' + time_m : time_m;
    timeobj.s = time_s < 10 ? '0' + time_s.toFixed(0) : time_s.toFixed(0);
    return timeobj;
}

//<: 模块高度自适应
function autoHeight(event) {
    $(window).resize(function () {
        var _height = $(window).height();
        var _body = $('body').height();
        var thisHeight = event.height();
        if (_body <= _height) {
            event.css('min-height', thisHeight + (_height - _body));
        } else {
            event.css('min-height', '');
        }
    });
    $(window).resize();
}
//:>

//无缝滚动
(function (window, $, undefined) {
    $.fn.marquee = function (options) {
        $(this).wrapAll('<div class="marquee-box"><div class="marquee"></div></div>');
        var opts = $.extend({}, $.fn.marquee.defaults, options),
                Marquee = $(this).closest(".marquee-box"),
                move = $(this).clone().removeAttr("id").addClass("move").height("auto");
        Marquee.find(".marquee").append(move);
        var that = $(this);
        function Marqueemove() {
            if (opts.type == "top") {
                Marquee.addClass("marquee-top");
                if (Marquee.find(".move")[0].offsetHeight - Marquee[0].scrollTop <= 0) {
                    Marquee[0].scrollTop -= that[0].offsetHeight;
                } else {
                    Marquee[0].scrollTop++;
                }
            } else if (opts.type == "left") {
                Marquee.addClass("marquee-left");
                if (Marquee.find(".move")[0].offsetWidth - Marquee[0].scrollLeft <= 0) {
                    Marquee[0].scrollLeft -= that[0].offsetWidth;
                } else {
                    Marquee[0].scrollLeft++;
                }
            }
        }
        var MyMar = setInterval(Marqueemove, opts.speed);
        Marquee.mouseover(function () {
            clearInterval(MyMar);
        });
        Marquee.mouseout(function () {
            MyMar = setInterval(Marqueemove, opts.speed);
        });
    };
    $.fn.marquee.defaults = {
        speed: 40,
        type: "top"
    };
})(window, jQuery);

function stopDefault(e) {
    //阻止默认浏览器动作(W3C)
    if (e && e.preventDefault)
        e.preventDefault();
    //IE中阻止函数器默认动作的方式
    else
        window.event.returnValue = false;
    return false;
}


// 弹出提示框
(function (window, $, undefined) {
    $.popModal = function (args) {
        return this.popModal.prototype.initialize.call(this.popModal.prototype, args);
    };
    $.popModal.prototype = {
        $dialog: undefined,
        options: {
            title: '',
            hide: 500, // 关闭弹出框时的隐藏速度，出现负值则立即关闭;
            close: true,
            width: null,
            id: "",
            html: false, // 是否使用自己的html代码来替换内容区域;
            times: 2000, // 限定时间内关闭alert类型弹出框，如果数值大于0，则默认隐藏alert类型框中的确认按钮;
            content: '', // 内容区域html;
            alert: true,
            opts: {
                backdrop: 'static',
                keyboard: false
            },
            type: "alert" // 弹出框类型，根据JS的弹出框，分别实现alert和默认;

        },
        btnType: {
            btn1: {
                name: "确认",
                id: "",
                Class: "",
                dismiss: false,
                events: function () {

                }
            },
            btn2: {
                name: "取消",
                id: "",
                Class: "",
                dismiss: false,
                events: function () {

                }
            }
        },
        // 初始化弹出提示框
        initialize: function (args) {
            var that = this,
                    promptDialogHtml,
                    options,
                    btnType,
                    i = 0,
                    _btn = "";

            // 如果参数传入是字符串，则使用默认参数，内容替换为传入值
            // 如果是以参数方式传入，则合并参数使用。
            if (typeof args === 'string') {
                options = this.options;
                options.content = args;
            } else {

                options = $.extend({}, this.options, args.options);
                btnType = $.extend({}, this.btnType, args.btnType);
            }

            // 去掉现有的提示，避免连续点击
            var _id = options.id,
                    _width = options.width ? options.width + "px" : "",
                    _height = options.height ? options.height + "px" : "",
                    _close = options.close ? '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' : "";
            promptDialogHtml = '<div class="modal popmodal public-modal modal-info" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' + '<div class="modal-dialog">' + '<div class="modal-middle">' + '<div class="modal-content">' + '<div class="modal-header"> ' + _close + ' <h4>' + options.title + '</h4></div>' + '<div class="popmodal-body"><div class="modal-body"></div></div></div></div></div>' + '</div>';
            var $dialog = this.$dialog = $(promptDialogHtml),
                    $dialogBody = $dialog.find('.popmodal-body');
            if (options.width) {
                $dialog.find(".modal-dialog").width(options.width);
            }
            // 判断是否需要填充新的html
            if (options.html) {
                $dialogBody.html(options.content);
            } else {
                $dialogBody.find(".modal-body").html('<div class="modal-p">' + options.content + '</div>');
            }

            // 判断是需要哪种提示框，根据不同的提示框处理底部按钮
            switch (options.type) {
                case 'confirm':
                    for (j in btnType) {
                        var _btnid = btnType[j].id ? "id=" + btnType[j].id : "",
                                dismiss = btnType[j].dismiss ? "data-dismiss='modal'" : "";
                        _btn += '<button class="btn ' + btnType[j].Class + '" ' + _btnid + ' ' + dismiss + '>' + btnType[j].name + '</button>';
                    }

                    $dialogBody.append('<div class="modal-footer">' + _btn + '</div>');
                    $dialog.find(".btn:last").attr("data-dismiss", "modal");
                    $dialog.css('margin-top', '-' + (options.height + 35) + 'px');
                    break;
                case 'alert':
                    // 如果times小于0则需要确认按钮
                    if (options.times < 0) {
                        var _btnid = btnType.btn1.id ? "id=" + btnType.btn1.id : "";
                        $dialogBody.append('<div class="modal-footer"><button class="btn ' + btnType.btn1.Class + '" data-dismiss="modal" ' + _btnid + '>' + btnType.btn1.name + '</button></div>');
                        $dialog.css('margin-top', '-' + (options.height + 18) + 'px');
                    } else {
                        $dialog.css('margin-top', '-' + (options.height + 35) + 'px');
                    }
                    break;

            }
            $("body").append($dialog);
            $dialogBody.css("height", options.height - 30);
            $dialog.attr("id", options.id);
            if (options.alert) {
                if ($(".popmodal").length <= 1) {
                    open($dialog);
                } else {
                    var dialog = $dialog;
                }
            } else {
                open($dialog);
            }
            for (var j in btnType) {
                if($dialog,btnType[j].events){
                    $dialog.find('.btn').eq(i).click($dialog,btnType[j].events);
                }
                i++;
            }
            // 判断times是否大于0，如果大于0则需要自动关闭alert类型的弹出框
            if (options.times > 0 && options.type == 'alert') {
                setTimeout(function () {
                    $dialog.modal("hide");
                }, options.times);
            }

            //$dialogBody.shadow();
            //当窗口隐藏时删除modal避免重复

            $dialog.one("hidden.bs.modal", function () {
                $dialog.remove();
            });
            $(document).one("hidden.bs.modal", $dialog, function () {
                if (dialog) {
                    open(dialog);
                }
            });
            function open(dialog) {
                dialog.modal(options.opts);
            }
            return $dialog;

        }
    };
})(window, jQuery);


(function (window, $, undefined) {
    // outside the scope of the jQuery plugin to
    // keep track of all dropdowns
    var $allDropdowns = $();

    // if instantlyCloseOthers is true, then it will instantly
    // shut other nav items when a new one is hovered over
    $.fn.dropdownHover = function (options) {

        // the element we really care about
        // is the dropdown-toggle's parent
        $allDropdowns = $allDropdowns.add(this.parent());
        return this.each(function () {
            var $this = $(this).parent(),
                    defaults = {
                        delay: 500,
                        instantlyCloseOthers: true
                    },
            data = {
                delay: $(this).data('delay'),
                instantlyCloseOthers: $(this).data('close-others')
            },
            options = $.extend(true, {}, defaults, options, data),
                    timeout;
            $this.hover(function () {
                if (options.instantlyCloseOthers === true)
                    $allDropdowns.removeClass('open');

                window.clearTimeout(timeout);
                $(this).addClass('open');
            }, function () {
                timeout = window.setTimeout(function () {
                    $this.removeClass('open');
                }, options.delay);
            });
        });
    };
    $('[data-hover="dropdown"]').dropdownHover();
})(window, jQuery);

(function (window, $, undefined) {
    $.fn.tapExtend = function (options) {
        return this.each(function (i) {
            var _this = $(this),
                    defaults = {
                        hover: false
                    },
            data = {
                hover: _this.attr('data-hover')
            },
            options = $.extend(true, {}, defaults, data, options);
            if (options.hover) {
                _this.find('[data-toggle="tap"]').hover(function () {
                    memory(i, $(this));
                });
            }
            ;
            _this.find('li > a').on('shown.bs.tab', function () {
                memory(i, $(this));
            });
            Refresh(i, _this);
        });
    };
    function memory(cookieIndex, obj) {
        obj.tab('show');
        var index = obj.parent().index();
        $.cookie('vp-tap-' + cookieIndex, index);
    }
    function Refresh(cookieIndex, obj) {
        var val = $.cookie('vp-tap-' + cookieIndex);
        obj.find('li').eq(val).find('a').tab('show');
    }
    //$('[role="tablist"]').tapExtend();
})(window, jQuery);

//编码
function html_encode(str){
    var s = "";
    if (str.length == 0)
        return "";
    s = str.replace(/[<>&"]/g, function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c];});
    return s;
}

//解码
function html_decode(str){
    var s = "";
    if (str.length == 0)
        return "";
    var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
    s = str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
    return s;
}

if (false || !(window.console && console.log)) {
  (function() {
    var noop = function() {};
    var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
    var length = methods.length;
    var console = window.console = {};
    while (length--) {
        console[methods[length]] = noop;
    }
  }());
}

(function(window,$){
    var SetText = function(element,options){
        this.$element = $(element);
        this.options = $.extend({}, $.fn.setText.defaults, options);
        
    };
    SetText.prototype.setState = function(state){
        var $el = this.$element,
            data = $el.data(),
            val = $el.is('input') ? 'val' : 'html';
        state = state + 'Text';
        data.resetText || $el.data('resetText', $el[val]() || ' ');
        if(data.positionText == true){
            $el.css('position','relative');
            if(state == 'resetText'){
                $el.find('.ajaxloading-settext').remove();
            }else{
                if($el.find('.ajaxloading-settext').length <= 0){
                    $el.append('<div class="ajaxloading-settext"><div><div>'+ data[state] || this.options[state] +'</div></div></div>');
                }
            }
        }else{
            $el[val](data[state] || this.options[state]);
        }
    };
    var old = $.fn.setText; 
    $.fn.setText = function(option){
        return this.each(function(i){
            var $this = $(this),
                data = $this.data('setText'),
                options = typeof option == 'object' && option;
                if(!data){
                    $this.data('setText',(data = new SetText(this,options)));
                }
                data.setState(option);
        });
    };
    $.fn.setText.defaluts = {
        loadingText:'loading...'
    };
    $.fn.setText.Constructor = SetText;
    $.fn.setText.noConfict = function(){
        $.fn.setText = old;
        return this;
    };
})(window,$);


// 监测浏览器版本。如果内核低于IE8则提示下载最新游览器，譬如chrome。ff。IE8+
(function (window, $, undefined) {
    if (/msie/.test(navigator.userAgent.toLowerCase()) && document.documentMode < 8) {
        $('body div').remove();
        $.popModal({
            options: {
                times: 0,
                content: '您的游览器版本过低，请下载最新游览器:<a href="https://dl.google.com/tag/s/appguid%3D%7B8A69D345-D564-463C-AFF1-A69D9E530F96%7D%26iid%3D%7BE1BEB2F9-56EB-25F6-C64C-CEF0052B1054%7D%26lang%3Dzh-CN%26browser%3D4%26usagestats%3D0%26appname%3DGoogle%2520Chrome%26needsadmin%3Dprefers/update2/installers/ChromeSetup.exe" style="font-size:16px;margin-left:15px;">Chrome</a>'
            }
        });
    }
})(window, jQuery);
