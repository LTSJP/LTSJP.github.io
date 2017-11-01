var recommlist = require('./recommlist.json');
var recommend = require('./recommend.json');
var recommlist_refresh = require('./recommlist-refresh.json');
var sort = require('./sort.json');
var womenba = require('./womenba.json')
var womengoods = require('./womengoods.json')
var shoesba = require('./shoesba.json')
var shoesgoods = require('./shoesgoods.json')
var ornamentba = require('./ornamentba.json')
var ornamentgoods = require('./ornamentgoods.json')
var hotsearch = require('./hotsearch.json')
var globalba = require('./globalba.json')
var globalgoods = require('./globalgoods.json')
var list1 = require('./stay-home-top.json');
var list2 = require('./stay-home-bottom.json');
var baby_top = require('./baby-top.json');
var baby_bottom = require('./baby-bottom.json');
//数码
var digitalTop = require('./digital-top.json');
var digitalBottom = require('./digital-bottom.json');
//美食
var deliciousFoodTop = require('./delicious-food-top.json');
var deliciousFoodBottom = require('./delicious-food-bottom.json');
//美妆
var beautyTop = require('./beauty-top.json');
var beautyBottom = require('./beauty-bottom.json');
//男士
var manTop = require('./man-top.json');
var manBottom = require('./man-bottom.json');
//卷皮优选
var preferredTop = require('./preferred-top.json');
var preferredBottom = require('./preferred-bottom.json');

module.exports = function(){
	return {
		'recommlist.php': recommlist,
		'recommend.php': recommend,
		'recommlist-refresh.php': recommlist_refresh,
		'sort.php': sort,
		'wowenba.php': womenba,
	    'womengoods.php': womengoods,
	    'shoesba.php': shoesba,
	    'shoesgoods.php': shoesgoods,
	    'ornamentba.php': ornamentba,
	    'ornamentgoods.php': ornamentgoods,
	    'hotsearch.php': hotsearch,
	    'globalba.php': globalba,
    	'globalgoods.php': globalgoods,
    	'list1.php': list1,
        'list2.php': list2,
        'babytop.php':  baby_top,
        'babybottom.php': baby_bottom,
        'digitaltop.php': digitalTop,
        'digitalbottom.php': digitalBottom,
        'deliciousfoodtop.php': deliciousFoodTop,
        'deliciousfoodbottom.php': deliciousFoodBottom,
        'beautytop.php': beautyTop,
        'beautybottom.php': beautyBottom,
        'mantop.php': manTop,
        'manbottom.php': manBottom,
        'preferredtop.php': preferredTop,
        'preferredbottom.php': preferredBottom
	}
}
