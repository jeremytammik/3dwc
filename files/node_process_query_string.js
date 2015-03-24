function pluralSuffix( n ) {
  return 1 == n ? '' : 's';
}

function dotOrColon( n ) {
  return 0 == n ? '.' : ':';
}

// format dictionary values to a string

function dict_to_string(dict) {
  var keys = Object.keys(dict);
  var n = keys.length;
  var s = [];

  s.push( n.toString() + ' key-value pair'
         + pluralSuffix( n ) + dotOrColon( n ) );

  keys.sort();
  for( var i = 0; i < n; ++i ) {
    s.push( '  ' + keys[i] + ' = ' + dict[keys[i]] );
  }
  return s.join('\n');
}

http = require('http'),
url = require('url'),
server = http.createServer(
  function(request,response){
    var paramdict = url.parse(request.url,true).query;
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end(dict_to_string(paramdict));
  });
server.listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');