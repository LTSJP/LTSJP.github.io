var womenba = require('./womenba.json')
var womengoods = require('./womengoods.json')
var shoesba = require('./shoesba.json')
var shoesgoods = require('./shoesgoods.json')
var globalba = require('./globalba.json')
var globalgoods = require('./globalgoods.json')
var ornamentba = require('./ornamentba.json')
var ornamentgoods = require('./ornamentgoods.json')
module.exports = function(){
  return{
    'wowenba.php': womenba,
    'womengoods.php': womengoods,
    'shoesba.php': shoesba,
    'shoesgoods.php': shoesgoods,
    'globalba.php': globalba,
    'globalgoods.php': globalgoods,
    'ornamentba.php': ornamentba,
    'ornamentgoods.php': ornamentgoods
  }
}
