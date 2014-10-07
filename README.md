## kansuji

kanji numeric converter

## Usage

```js
var fs = require('fs');
var kansuji = require('kansuji');

// stream
fs.createReadStream(__dirname+'/test/test.txt')
  .pipe(kansuji())
  .on('data',function(data){
    console.log(data);
  });

// sync
console.log(kansuji.sync("その２からその1234までを変換"));
console.log(kansuji.sync("250とか1024とか"));
console.log(kansuji.sync("404954334"));
console.log(kansuji.sync("テスト"));

var suji = [
  '〇','壱','弐','参','四','伍','六','七','八','九'
];
console.log(kansuji.sync("404954334",{suji:suji}));
```
