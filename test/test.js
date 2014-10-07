var test = require('tape'),
    colorize = require('tap-colorize');

var fs = require('fs');
var kansuji = require('../');

test.createStream().pipe(colorize()).pipe(process.stdout);

test('stream',function(t){
  var res = [];
  var exact = [
    'その二からその千二百三十四までを変換',
    '二百五十とか千二十四とか',
    '四億四百万九十万五万四千三百三十四',
    'テスト',
    ''
  ];

  fs.createReadStream(__dirname+'/test.txt')
  .pipe(kansuji())
  .on('data',function(data){
    res.push(data);
  }).on('end',function(){
    t.deepEqual(res,exact);
    t.end();
  });

});

test('sync without opt',function(t){
  var res = kansuji.sync("その２からその1234までを変換");
  t.equal("その二からその千二百三十四までを変換",res);
  t.end();
});

test('sync with opt',function(t){
  var suji = [
    '〇','壱','弐','参','四','伍','六','七','八','九'
  ];
  var res = kansuji.sync("404954334",{suji:suji});
  t.equal('四億四百万九十万伍万四千参百参十四',res);
  t.end();
});


