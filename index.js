var es = require('event-stream');

var _keta = [
  '','十','百','千','万','十万','百万','千万','億','十億','百億','千億'
];

var _suji = [
  '〇','一','二','三','四','五','六','七','八','九'
];

function toH(n){
  return n.replace(/[０-９]/g,function(s){
    return String.fromCharCode(s.charCodeAt(0) - 0xFEE0)
  });
};

function _convert(str,opt){
  if(opt!==undefined){
    _suji = (opt.suji!==undefined)? opt.suji : _suji;
  }

  var r = new RegExp("[0-9０１２３４５６７８９]{1,}","g");
  var matched = str.match(r);

  if(matched!==null){
    matched.forEach(function(m){
      var s = m.split('');
      s = s.reverse().map(function(n,i){
        var keta = _keta[i];
        if(i===0){
          return (n==='0')? '' : _suji[toH(n)]
        }else if(n==='0'){
          return ''
        }else if(n==='1'){
          return keta
        }else{
          return _suji[toH(n)]+keta
        }
      });
      str = str.replace(m,s.reverse().join(''));
    });
  }

  return str
};

function kansuji(opt){
  return es.pipeline(es.split(),es.map(function(data,next){
    return next(null,_convert(data,opt))
  }));
};

kansuji.sync = function(str,opt){
  return _convert(str,opt);
};

module.exports = kansuji;
