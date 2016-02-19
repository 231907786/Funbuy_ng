/**
 * Created by Administrator on 2016/1/19 0019.
 */
var CONFIG = {"user":{"nickname":null,"avatar":"avatar.png","steam_id":0,"gold":0},"session_id":"b5u0et8psn75k8286i54cmqbv1","user_id":0,"lang":"zh_CN","image_domain":"http:\/\/thumb.vpgamecdn.com","api_domain":"http:\/\/gateway.vpgame.com\/v1\/","api_dota_domain":"http:\/\/api.dota2.vpgame.com"};
var userdata = {
    id : '',
    domain:"guess"
};
var WORKSPACE = {
    VERSION:"201601180603",
    award:{"status":200,"data":{"awardNum":0},"message":"\u8bbf\u95ee\u6210\u529f\u3002"},//"http://dota2.vpgame.com/api/item-award.html",
    take:{"status":500,"message":"\u60a8\u8fd8\u6ca1\u6709\u767b\u5f55VPGAME"},//"http://dota2.vpgame.com/api/item-take.html",
    language:"zh_cn"
};

var requestUrl ="http://localhost:8899";
(function ($) {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
})(jQuery);