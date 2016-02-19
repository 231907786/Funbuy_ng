var fs = require('fs');
var path = require('path');
var mockdata = require('./mockFn');
var mockbase = path.join(__dirname, 'mock');

var mockApi = function(res, pathname, paramObj, next) {
    switch (pathname) {
        // case '/api/getUserInfo':
        //     var data = fs.readFileSync(path.join(mockbase, 'getUserInfo.json'), 'utf-8');
        //     res.setHeader('Content-type', 'application/javascript');
        //     res.end(paramObj.callback + '(' + data + ')');
        //     return ;
        case '/api/mock':
            res.setHeader('Content-type', 'application/json');
            res.end(JSON.stringify(mockdata.temp));
            return ;
        case '/api/guess/index/carousel':
            var data = fs.readFileSync(path.join(mockbase + '/guess/index/', 'carousel.json'), 'utf-8');
            res.setHeader('Content-type', 'application/json');
            res.end(data);
            return ;
        case '/api/guess/index/matches':
            var random = Math.floor((Math.random() * 6) + 1);
            var data = fs.readFileSync(path.join(`${mockbase}/guess/index/matches_${random}.json`), 'utf-8');
            res.setHeader('Content-type', 'application/json');
            res.end(data);
            return ;
        case '/api/guess/index/lights':
            var data = fs.readFileSync(path.join(`${mockbase}/guess/index/lights.json`), 'utf-8');
            res.setHeader('Content-type', 'application/json');
            res.end(data);
            return ;
        case '/api/guess/index/darkLights':
            var data = fs.readFileSync(path.join(`${mockbase}/guess/index/darkLights.json`), 'utf-8');
            res.setHeader('Content-type', 'application/json');
            res.end(data);
            return ;
        case '/api/guess/index/bestGamblers':
            var data = fs.readFileSync(path.join(`${mockbase}/guess/index/bestGamblers.json`), 'utf-8');
            res.setHeader('Content-type', 'application/json');
            res.end(data);
            return ;
        case '/api/guess/detail/spinachCorps':
            var data = fs.readFileSync(path.join(`${mockbase}/guess/detail/spinachCorps.json`), 'utf-8');
            res.setHeader('Content-type', 'application/json');
            res.end(data);
            return ;
        case '/api/guess/detail/comments':
            var data = fs.readFileSync(path.join(`${mockbase}/guess/detail/comments.json`), 'utf-8');
            res.setHeader('Content-type', 'application/json');
            res.end(data);
            return ;
        case '/api/guess/detail/goldGuessRecords':
            var data = fs.readFileSync(path.join(`${mockbase}/guess/detail/goldGuessRecords.json`), 'utf-8');
            res.setHeader('Content-type', 'application/json');
            res.end(data);
            return ;
        case '/api/guess/detail/itemGuessRecords':
            var data = fs.readFileSync(path.join(`${mockbase}/guess/detail/itemGuessRecords.json`), 'utf-8');
            res.setHeader('Content-type', 'application/json');
            res.end(data);
            return ;
        case '/api/guess/detail/mybets':
            var data = fs.readFileSync(path.join(`${mockbase}/guess/detail/mybets.json`), 'utf-8');
            res.setHeader('Content-type', 'application/json');
            res.end(data);
            return ;
        case '/api/guess/detail/richests':
            var data = fs.readFileSync(path.join(`${mockbase}/guess/detail/richests.json`), 'utf-8');
            res.setHeader('Content-type', 'application/json');
            res.end(data);
            return ;
        case '/api/csgo/index/lights':
            var data = fs.readFileSync(path.join(`${mockbase}/csgo/index/lights.json`), 'utf-8');
            res.setHeader('Content-type', 'application/json');
            res.end(data);
            return ;
        case '/api/csgo/index/darkLights':
            var data = fs.readFileSync(path.join(`${mockbase}/csgo/index/darkLights.json`), 'utf-8');
            res.setHeader('Content-type', 'application/json');
            res.end(data);
            return ;
        case '/api/csgo/index/matches':
            var random = Math.floor((Math.random() * 3) + 1);
            var data = fs.readFileSync(path.join(`${mockbase}/csgo/index/matches_${random}.json`), 'utf-8');
            res.setHeader('Content-type', 'application/json');
            res.end(data);
            return ;
        case '/api/csgo/detail/ravity':
            var data = fs.readFileSync(path.join(`${mockbase}/csgo/detail/ravity.json`), 'utf-8');
            res.setHeader('Content-type', 'application/json');
            res.end(data);
            return ;
        case '/api/csgo/detail/facade':
            var data = fs.readFileSync(path.join(`${mockbase}/csgo/detail/facade.json`), 'utf-8');
            res.setHeader('Content-type', 'application/json');
            res.end(data);
            return ;
        case '/api/csgo/detail/spinach':
            var data = fs.readFileSync(path.join(`${mockbase}/csgo/detail/spinach.json`), 'utf-8');
            res.setHeader('Content-type', 'application/json');
            res.end(data);
            return ;
        case '/api/csgo/detail/richest':
            var data = fs.readFileSync(path.join(`${mockbase}/csgo/detail/richest.json`), 'utf-8');
            res.setHeader('Content-type', 'application/json');
            res.end(data);
            return ;
        case '/api/csgo/detail/profile':
            var data = fs.readFileSync(path.join(`${mockbase}/csgo/detail/profile.json`), 'utf-8');
            res.setHeader('Content-type', 'application/json');
            res.end(data);
            return ;

        default:
            ;
    }
    next();
};

module.exports = mockApi;