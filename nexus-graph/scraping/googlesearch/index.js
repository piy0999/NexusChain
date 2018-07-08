var google = require('google');
var fs = require('fast-csv');
var fs = require('fs');
var parse = require('csv-parse');
var result = [];

var csvData = [];
var total = 2;
fs
  .createReadStream('hkchamber_companies_en.csv')
  .pipe(parse({ delimiter: ',' }))
  .on('data', function(csvrow) {
    if (total > 0) {
      csvData.push(csvrow[0]);
      total--;
    }
  })
  .on('end', function() {
    console.log('CSV file read.');

    const company_pairs = [];

    for (let i = 0; i < csvData.length - 1; i++) {
      for (let j = i + 1; j < csvData.length; j++) {
        company_pairs.push([csvData[i], csvData[j]]);
      }
    }

    search(company_pairs);
  });

function search(pairs) {
  var google = require('google');
  google.resultsPerPage = 25;

  for (var k = 0; k < pairs.length; k++) {
    console.log(pairs[k][0] + ' ' + pairs[k][1]);
    google('"' + pairs[k][0] + '"' + ' ' + '"' + pairs[k][1] + '"', function(
      err,
      res
    ) {
      if (err) console.error(err);

      for (var i = 0; i < res.links.length; ++i) {
        var link = res.links[i];
        console.log(link.title + ' - ' + link.href);
        console.log(link.description + '\n');
      }
      console.log();
      console.log();
      console.log();
      console.log();
    });
  }
}
