function randomInt(begin, end){
    if(end === undefined){
        end = begin;
        begin = 0;
    }
    var increse = end - begin;
    return Math.floor(Math.random() * (increse + 1)) + begin;
}

//enums
var imgPath =  'images/';
var avatar = 'avatar_'; //7
var teamlogo = 'team-logo-'; //7
var league = 'league-'; //2
var png = '.png';
var jpg = '.jpg';
function getRandomArr(length, sum, prefix, suffix){
    if(sum === undefined){
        sum = 2;
    }
    if(prefix === undefined){
        prefix = '';
    }
    if(suffix === undefined){
        suffix = png;
    }
    var arr = [];
    for(var i=0; i<length; i++){
        arr.push(prefix + randomInt(1, sum) + suffix);
    }
    return arr;
}
//flag:直接传0/1判断奇偶
function getOddEvenInt(begin, end, flag){
    var num = randomInt(begin, end);
    if((num % 2) === flag){
        return num;
    }else{
        return getOddEvenInt(begin, end, flag);
    }
}

function getRandomMatches(length){
    var arr = [];
    var stateMap = {
        0: '未开始',
        1: '进行中',
        2: '已结束'
    };
    var teamMap = {
        0: {
            0: '猛龙',
            1: '奇才',
            2: '湖人',
            3: '马刺',
            4: '热火',
            5: '76人',
            6: '爵士',
            7: '太阳',
            8: '掘金',
            9: '活塞',
            10: '老鹰',
            11: '快船'
        },
        1: {
            0: 'LGD',
            1: 'CDEC',
            2: 'EHOME',
            3: 'FTD',
            4: 'CDEC.Y',
            5: 'NAVI',
            6: 'Aliance',
            7: 'VP',
            8: 'Empire',
            9: 'CLOUD9',
            10: 'EG',
            11: 'Secret'
        }
    };
    var teamImgs = getRandomArr(21, 7, imgPath + teamlogo);
    var leagueImgMap = {
        0: imgPath + league + 2 + png,
        1: imgPath + league + 1 + png
    };
    var getOdds = function(){
        return String(randomInt(10,200) / 100);
    };
    for(var i=0; i<length; i++){
        var titleState = randomInt(1);
        var titleText = titleState === 0 ? 'NBA' : 'dota2';
        var fwarning = titleState === 0 ? '[ 猛龙 - 7.5 ]' : '';
        var timeState = randomInt(2);
        var winRate = randomInt(30, 70);
        var match = {
            id: String(randomInt(10000, 20000)), //超链接中的matchid
            title: {
                iconClass: titleState, //0: NBA, 1: dota2
                text: titleText,
                fwarning: fwarning
            },
            time: {
                //这里2种情况：现在用的第一种
                //1.后台算好 还有多少时间开始/进行中/已结束，前台转成字符串
                //2.后台给开始时间和结束时间，前台计算结果
                state: timeState, //0:未开始,1:进行中,2:已结束
                text: stateMap[timeState]
            },
            teamA: {
                name: teamMap[titleState][randomInt(11)],
                imgSrc: teamImgs[randomInt(20)],
                odds: getOdds(),
                winRate: winRate
            },
            teamB: {
                name: teamMap[titleState][randomInt(11)],
                imgSrc: teamImgs[randomInt(20)],
                odds: getOdds(),
                winRate: 100 - winRate
            },
            rounds: getOddEvenInt(1, 5, 1),
            leagueImg: leagueImgMap[titleState]
        };
        arr.push(match);
    }
    return arr;
}

function getGuessIndexRightContents(){
    var names = ['Muslimin Palembang', '2896', '9527', 'Arvinichii', '小小小小小小小', '我要打一万个', '这个名字能ROLL中', 'kashiro_kashiro', '大裤衩输没了还有小裤衩'];
    var arr1 = [];
    var arr2 = [];
    var arr3 = [];
    for(var i=0; i<10; i++){
        var user1 = {
            id: randomInt(10000, 20000),
            name: names[randomInt(names.length - 1)],
            topText: randomInt(45, 75) + '%win',
            bottomText: '+ 32,563,450 P',
            level: randomInt(5, 20),
            imgSrc: imgPath + avatar + randomInt(1, 7) + jpg
        };
        var user2 = {
            id: randomInt(10000, 20000),
            name: names[randomInt(names.length - 1)],
            topText: randomInt(15, 35) + '%win',
            bottomText: '- 32,563,450 P',
            level: randomInt(1, 8),
            imgSrc: imgPath + avatar + randomInt(1, 7) + jpg
        };
        var user3 = {
            id: randomInt(10000, 20000),
            name: names[randomInt(names.length - 1)],
            topText: '菠神指数',
            bottomText: randomInt(900, 1200),
            level: randomInt(5, 20),
            imgSrc: imgPath + avatar + randomInt(1, 7) + jpg
        };
        arr1.push(user1);
        arr2.push(user2);
        arr3.push(user3);
    }
    return [arr1,arr2,arr3];
}

var arr = getRandomMatches(10);

var matches = {
                matches:arr, //当前页数据
                config: {
                    totalSize: 60, //int类型,数据总条数
                }
            };
var lights = getGuessIndexRightContents()[0];
var darkLights = getGuessIndexRightContents()[1];
var bestGamblers = getGuessIndexRightContents()[2];

var spinachCorps = {
    header: {
        count: 58527,
        startTime: '2016-01-13 17:55:00',
        stateText: '已结算'
    },
    teamA: {
        win: true,
        name: 'LGD-GAMING',
        winRate: 60,
        imgSrc: 'images/team-logo-3.png',
        odds: 0.46,
        lastGames: [{
            timeText: '3 周前',
            title: '上海特级锦标赛',
            win: true,
            score: '2-0',
            rivalTeam: {
                name: 'IG.vitality',
                imgSrc: 'images/ig-v.jpg'
            }
        }, {
            timeText: '3 周前',
            title: '上海特级锦标赛',
            win: false,
            score: '0-2',
            rivalTeam: {
                name: 'IG.vitality',
                imgSrc: 'images/ig-v.jpg'
            }
        }, {
            timeText: '3 周前',
            title: '上海特级锦标赛',
            win: true,
            score: '2-0',
            rivalTeam: {
                name: 'IG.vitality',
                imgSrc: 'images/ig-v.jpg'
            }
        }, {
            timeText: '3 周前',
            title: '上海特级锦标赛',
            win: true,
            score: '2-0',
            rivalTeam: {
                name: 'IG.vitality',
                imgSrc: 'images/ig-v.jpg'
            }
        }]
    },
    teamB: {
        win: false,
        name: 'Fnatic',
        winRate: 40,
        imgSrc: 'images/team-logo-4.png',
        odds: 1.94,
        lastGames: [{
            timeText: '3 周前',
            title: '上海特级锦标赛',
            win: true,
            score: '0-2',
            rivalTeam: {
                name: 'MVP Phoenix',
                imgSrc: 'images/mvp.png'
            }
        }, {
            timeText: '3 周前',
            title: '上海特级锦标赛',
            win: true,
            score: '0-2',
            rivalTeam: {
                name: 'MVP Phoenix',
                imgSrc: 'images/mvp.png'
            }
        }, {
            timeText: '3 周前',
            title: '上海特级锦标赛',
            win: true,
            score: '0-2',
            rivalTeam: {
                name: 'MVP Phoenix',
                imgSrc: 'images/mvp.png'
            }
        }, {
            timeText: '3 周前',
            title: '上海特级锦标赛',
            win: false,
            score: '2-1',
            rivalTeam: {
                name: 'MVP Phoenix',
                imgSrc: 'images/mvp.png'
            }
        }]
    },
    score: '2:0',
    rounds: 3,
    guess: {state:0},
};
var itemGuessRecords = [
    {
        name: '928',
        id: 412329,
        level: 10,
        timeText: '2 周前',
        items: [
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'unique', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'common' //common/rare/mythical/uncommon/legendary/arcana/immortal
            },
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'strange', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'rare' //common/rare/mythical/uncommon/legendary/arcana/immortal
            },
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'genuine', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'mythical' //common/rare/mythical/uncommon/legendary/arcana/immortal
            },
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'unique', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'uncommon' //common/rare/mythical/uncommon/legendary/arcana/immortal
            },
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'unique', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'common' //common/rare/mythical/uncommon/legendary/arcana/immortal
            },
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'strange', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'rare' //common/rare/mythical/uncommon/legendary/arcana/immortal
            },
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'genuine', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'mythical' //common/rare/mythical/uncommon/legendary/arcana/immortal
            },
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'unique', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'uncommon' //common/rare/mythical/uncommon/legendary/arcana/immortal
            }
        ]
    },
    {
        name: '928',
        id: 412329,
        level: 10,
        timeText: '2 周前',
        items: [
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'unique', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'legendary' //common/rare/mythical/uncommon/legendary/arcana/immortal
            },
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'unique', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'arcana' //common/rare/mythical/uncommon/legendary/arcana/immortal
            },
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'unique', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'immortal' //common/rare/mythical/uncommon/legendary/arcana/immortal
            },
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'unique', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'immortal' //common/rare/mythical/uncommon/legendary/arcana/immortal
            }
        ]
    },
    {
        name: '928',
        id: 412329,
        level: 10,
        timeText: '2 周前',
        items: [
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'unique', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'common' //common/rare/mythical/uncommon/legendary/arcana/immortal
            },
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'strange', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'rare' //common/rare/mythical/uncommon/legendary/arcana/immortal
            },
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'genuine', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'mythical' //common/rare/mythical/uncommon/legendary/arcana/immortal
            },
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'unique', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'uncommon' //common/rare/mythical/uncommon/legendary/arcana/immortal
            },
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'unique', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'common' //common/rare/mythical/uncommon/legendary/arcana/immortal
            },
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'strange', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'rare' //common/rare/mythical/uncommon/legendary/arcana/immortal
            },
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'genuine', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'mythical' //common/rare/mythical/uncommon/legendary/arcana/immortal
            },
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'unique', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'uncommon' //common/rare/mythical/uncommon/legendary/arcana/immortal
            }
        ]
    },
    {
        name: '928',
        id: 412329,
        level: 10,
        timeText: '2 周前',
        items: [
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'unique', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'legendary' //common/rare/mythical/uncommon/legendary/arcana/immortal
            },
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'unique', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'arcana' //common/rare/mythical/uncommon/legendary/arcana/immortal
            },
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'unique', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'immortal' //common/rare/mythical/uncommon/legendary/arcana/immortal
            },
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'unique', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'immortal' //common/rare/mythical/uncommon/legendary/arcana/immortal
            }
        ]
    },
    {
        name: '928',
        id: 412329,
        level: 10,
        timeText: '2 周前',
        items: [
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'unique', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'common' //common/rare/mythical/uncommon/legendary/arcana/immortal
            },
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'strange', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'rare' //common/rare/mythical/uncommon/legendary/arcana/immortal
            },
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'genuine', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'mythical' //common/rare/mythical/uncommon/legendary/arcana/immortal
            },
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'unique', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'uncommon' //common/rare/mythical/uncommon/legendary/arcana/immortal
            },
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'unique', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'common' //common/rare/mythical/uncommon/legendary/arcana/immortal
            },
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'strange', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'rare' //common/rare/mythical/uncommon/legendary/arcana/immortal
            },
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'genuine', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'mythical' //common/rare/mythical/uncommon/legendary/arcana/immortal
            },
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'unique', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'uncommon' //common/rare/mythical/uncommon/legendary/arcana/immortal
            }
        ]
    },
    {
        name: '928',
        id: 412329,
        level: 10,
        timeText: '2 周前',
        items: [
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'unique', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'legendary' //common/rare/mythical/uncommon/legendary/arcana/immortal
            },
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'unique', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'arcana' //common/rare/mythical/uncommon/legendary/arcana/immortal
            },
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'unique', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'immortal' //common/rare/mythical/uncommon/legendary/arcana/immortal
            },
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'unique', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'immortal' //common/rare/mythical/uncommon/legendary/arcana/immortal
            }
        ]
    },
    {
        name: '928',
        id: 412329,
        level: 10,
        timeText: '2 周前',
        items: [
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'unique', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'common' //common/rare/mythical/uncommon/legendary/arcana/immortal
            },
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'strange', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'rare' //common/rare/mythical/uncommon/legendary/arcana/immortal
            },
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'genuine', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'mythical' //common/rare/mythical/uncommon/legendary/arcana/immortal
            },
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'unique', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'uncommon' //common/rare/mythical/uncommon/legendary/arcana/immortal
            },
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'unique', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'common' //common/rare/mythical/uncommon/legendary/arcana/immortal
            },
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'strange', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'rare' //common/rare/mythical/uncommon/legendary/arcana/immortal
            },
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'genuine', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'mythical' //common/rare/mythical/uncommon/legendary/arcana/immortal
            },
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'unique', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'uncommon' //common/rare/mythical/uncommon/legendary/arcana/immortal
            }
        ]
    },
    {
        name: '928',
        id: 412329,
        level: 10,
        timeText: '2 周前',
        items: [
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'unique', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'legendary' //common/rare/mythical/uncommon/legendary/arcana/immortal
            },
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'unique', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'arcana' //common/rare/mythical/uncommon/legendary/arcana/immortal
            },
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'unique', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'immortal' //common/rare/mythical/uncommon/legendary/arcana/immortal
            },
            {
                name: '纯正 纯金斯嘉蒂倒钩',
                qualitly: 'unique', //unique/strange/genuine
                href: '',
                imgSrc: 'images/item-list-1.png',
                price: 18.14,
                rarity: 'immortal' //common/rare/mythical/uncommon/legendary/arcana/immortal
            }
        ]
    }

];
var goldGuessRecords = [
    {
        id: 5219537,
        name: '上山打老虎',
        timeText: '2 周前',
        imgSrc: 'images/avatar_2.jpg',
        value: 1000
    },
    {
        id: 5219537,
        name: '上山打老虎',
        timeText: '2 周前',
        imgSrc: 'images/avatar_2.jpg',
        value: 500
    },
    {
        id: 5219537,
        name: '上山打老虎',
        timeText: '2 周前',
        imgSrc: 'images/avatar_2.jpg',
        value: 1000
    },
    {
        id: 5219537,
        name: '上山打老虎',
        timeText: '2 周前',
        imgSrc: 'images/avatar_2.jpg',
        value: 500
    },
    {
        id: 5219537,
        name: '上山打老虎',
        timeText: '2 周前',
        imgSrc: 'images/avatar_2.jpg',
        value: 1000
    },
    {
        id: 5219537,
        name: '上山打老虎',
        timeText: '2 周前',
        imgSrc: 'images/avatar_2.jpg',
        value: 500
    },
    {
        id: 5219537,
        name: '上山打老虎',
        timeText: '2 周前',
        imgSrc: 'images/avatar_2.jpg',
        value: 1000
    },
    {
        id: 5219537,
        name: '上山打老虎',
        timeText: '2 周前',
        imgSrc: 'images/avatar_2.jpg',
        value: 500
    },
    {
        id: 5219537,
        name: '上山打老虎',
        timeText: '2 周前',
        imgSrc: 'images/avatar_2.jpg',
        value: 1000
    },
    {
        id: 5219537,
        name: '上山打老虎',
        timeText: '2 周前',
        imgSrc: 'images/avatar_2.jpg',
        value: 500
    }
];
var mybets = {
    avatar: 'images/avatar.png',
    wins: 5,
    loss: 6,
};

var commentEnums = [
    {
        timeText: '1 周前',
        zans: 1,
        steps: 2,
        content: 'Sylar = Rape God. .... Rotk = Throw King',
        user: {
            id: 453542,
            name: '•KisH•',
            title: '竞技达人',
            imgSrc: 'images/avatar_1.jpg'
        }
    },
    {
        timeText: '2 周前',
        zans: 3,
        steps: 4,
        content: 'Noob rOtk',
        user: {
            id: 453542,
            name: 'Madafaka',
            title: '土豪',
            imgSrc: 'images/avatar_2.jpg'
        }
    },
    {
        timeText: '3 周前',
        zans: 5,
        steps: 6,
        content: 'Bet wise LGD game and F10k. Support Fnatic though',
        user: {
            id: 453542,
            name: 'choxolate._.',
            title: '组织机构',
            imgSrc: 'images/avatar_3.jpg'
        }
    },
    {
        timeText: '4 周前',
        zans: 7,
        steps: 8,
        content: 'f10k fnatic',
        user: {
            id: 453542,
            name: 'Standin.Lin',
            title: '竞技达人',
            imgSrc: 'images/avatar_4.jpg'
        }
    },
    {
        timeText: '5 周前',
        zans: 9,
        steps: 10,
        content: 'LGD已经送出一血',
        user: {
            id: 453542,
            name: 'Natsirt',
            title: '竞技达人',
            imgSrc: 'images/avatar_5.jpg'
        }
    }
];
function getRandomComments(){
    var arr = [];
    var nums = randomInt(50, 100);
    for(var i=0; i<nums; i++){
        arr.push(commentEnums[randomInt(4)]);
    }
    return arr;
}
var comments = getRandomComments();
var richests = [
    {
        id: 507396,
        name: '胖嘟嘟，肥呼呼',
        level: 15,
        wealth: 933.72,
        items: [
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            }
        ]
    },
    {
        id: 507396,
        name: '胖嘟嘟，肥呼呼',
        level: 15,
        wealth: 933.72,
        items: [
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            }
        ]
    },
    {
        id: 507396,
        name: '胖嘟嘟，肥呼呼',
        level: 15,
        wealth: 933.72,
        items: [
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            }
        ]
    },
    {
        id: 507396,
        name: '胖嘟嘟，肥呼呼',
        level: 15,
        wealth: 933.72,
        items: [
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            }
        ]
    },
    {
        id: 507396,
        name: '胖嘟嘟，肥呼呼',
        level: 15,
        wealth: 933.72,
        items: [
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            }
        ]
    },
    {
        id: 507396,
        name: '胖嘟嘟，肥呼呼',
        level: 15,
        wealth: 933.72,
        items: [
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            }
        ]
    },
    {
        id: 507396,
        name: '胖嘟嘟，肥呼呼',
        level: 15,
        wealth: 933.72,
        items: [
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            }
        ]
    },
    {
        id: 507396,
        name: '胖嘟嘟，肥呼呼',
        level: 15,
        wealth: 933.72,
        items: [
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            }
        ]
    },
    {
        id: 507396,
        name: '胖嘟嘟，肥呼呼',
        level: 15,
        wealth: 933.72,
        items: [
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            }
        ]
    },
    {
        id: 507396,
        name: '胖嘟嘟，肥呼呼',
        level: 15,
        wealth: 933.72,
        items: [
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            },
            {
                id: 11183,
                name: '龙爪弯钩',
                imgSrc: 'images/item-rich-1.png',
                rarity: 'immortal'
            }
        ]
    }
];
var user1 = {
    image: 'csgo_index/42x42.jpg',
    name: 'URTHEONE',
    winRate: 200,
    score: 794520,
    level: 2
};
var user2 = {
    image: 'http://lorempixel.com/42/42',
    name: '000',
    winRate: 33,
    score: -604395,
    level: 5
};
var temp = [user1,user1,user1,user1,user1,user1,user1,user1,user1,user1];
var temp2 = [user2,user2,user2,user2,user2,user2,user2,user2,user2,user2];

var match1 = {
    id: 111222,
    name: 'NBA',
    patternText: '猜输赢',
    stateText: '已结束',
    rounds: 3,
    score: '110 : 99',
    leagueLogo: 'http://lorempixel.com/220/99',
    teamA: {
        logo: 'http://lorempixel.com/91/55',
        name: '森林狼',
        odds: 1.13,
        win: true
    },
    teamB: {
        logo: 'http://lorempixel.com/91/55',
        name: '湖人',
        odds: 2.65,
        win: false
    }
};
var match2 = {
    id: 123456,
    name: 'MDL',
    patternText: '猜输赢',
    stateText: '已结束',
    rounds: 5,
    score: '3 : 0',
    leagueLogo: 'http://lorempixel.com/220/99',
    teamA: {
        logo: 'http://lorempixel.com/91/55',
        name: 'Ehome',
        odds: 0.65,
        win: true
    },
    teamB: {
        logo: 'http://lorempixel.com/91/55',
        name: 'EG',
        odds: 1.38,
        win: false
    }
};
var matchEnums = [match1,match2];
var temp = {
    avatar: 'http://lorempixel.com/30/30',
    name: 'ysq1989',
    level: 1,
    guesses: 5,
    wins: 3,
    winRate: 60,
    income: {
        deco: 33.5,
        bean: 500
    }
};

module.exports = {temp};