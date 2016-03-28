var request = require('request'),
	xpath   = require('xpath'),
	dom     = require('xmldom').DOMParser,
	fs      = require('fs'),
	util    = require('util'),
	path 	= require('path');

var OUTPUT_FILE = path.join(process.cwd(), 'todaysbeers.csv');


request('http://www.vicesetversa.com/fr/bieres', function (err, req, body) {
	var doc = new dom({errorHandler:{warning:function(e){}}}).parseFromString(body);
	var xPathRes = xpath.select('/html//div[@id="beer-list"]/ol/li/a', doc);

	var beers = [];

	xPathRes.forEach(function(res) {
		var beerName = xpath.select('em/text()', res);
		var breweryAndAlcoholDeg = res.lastChild.toString().split(' -- ');

		beers.push({
			name: beerName.toString(),
			brewery: breweryAndAlcoholDeg[1],
			abv: breweryAndAlcoholDeg[0].slice(2, breweryAndAlcoholDeg[0].length-1)
		});
	});

	var fd = fs.openSync(OUTPUT_FILE, 'w+');
	beers.forEach(function(beer) {
		var row = util.format('"%s","%s",%d', beer.brewery, beer.name, beer.abv);
		fs.appendFileSync(fd, row + '\n');
	});
	fs.closeSync(fd);
})

  if(timer in timerCheckpoints) {
    var value = timerCheckpoints[timer];
    request({
      url: 'https://maker.ifttt.com/trigger/Beerlist/with/key/b_ZOL3ZrvMWgiPHj6ktX22' + ifttt, //URL to hit
      method: 'POST',
      json: {
        value1: value,
      }
    }, function(error, response, body){
      console.log(response.statusCode, body)
      if(error) {
        console.log(error);
      } else {
        console.log(response.statusCode, body);
      }
    });
  }