/*
 *
 *  Primary file for the API
 * 
 */

 // Deoendencies 
 var http = require('http');
 var url = require('url');
 var stringDecoder = require('string_decoder').stringDecoder;

 // The server shoud respond to all request with a string 
 var server = http.createServer(function(req,res){
    
    // get URL and parse it (paese in true to call queryString)
    let parsedUrl = url.parse(req.url,true);

    // get path of the URL
    let path = parsedUrl.pathname; //un trimed path 
    let trimmedPath = path.replace(/^\/+|\/+$/g, '')
    
    // get the query string as an object
    var queryStringObject = parsedUrl.query;

    // get the HTTP Method 
    let method = req.method.toLowerCase();

    // get the header as an object 
    var headers = req.headers;

    // get the payload, if any @TODO:what is a payload 
    var decoder = new stringDecoder('utf-8'); // a pretty common option as utf-8
    var buffer = '';
    

    // send response 
    res.end('hello\n');


    // Log the request path
    console.log('Request received on path: '+trimmedPath+' with method:\n'+method+' and with this query string parameters'
    ,queryStringObject, " receive with the header\n", headers);

 });

 // Start the server, and have it listen to port 3000
 server.listen(3000,function(){
     console.log("Server is listening to port 3000");
 })