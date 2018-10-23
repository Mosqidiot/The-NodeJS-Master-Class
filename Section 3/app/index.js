/*
 *  Primary file for the API
 * 
 */

 // Deoendencies 
 var http = require('http');
 var url = require('url');
 var StringDecoder = require('string_decoder').StringDecoder;

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
    var decoder = new StringDecoder('utf-8'); // a pretty common option as utf-8
    var buffer = '';
    req.on('data',function(data){
        buffer += decoder.write(data)
    });
    req.on('end',function(data){
        buffer += decoder.end();
        // Choose the handler this request should go to, if not found then not dounf hanler 
        var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

        // construct the data object send to handler 
        var data = {
            'trimmedPath':trimmedPath,
            'queryStringObject': queryStringObject,
            'method' : method,
            'headers' : headers,
            'payload' : buffer
        }
        
        // Send the response
        chosenHandler(data, function(statusCode, payload ){
            statusCode = typeof(statusCode) ==  'number' ? statusCode : 200 ; 

            payload = typeof(payload) == 'object' ? payload: {};

            // Convert the payload to a string
            var payloadString = JSON.stringify(payload);

            // return the response 
            res.writeHead(statusCode);
            res.end(payloadString);

            console.log("returning this responses: ", statusCode, payloadString)
        });
 
    });
    

    

 });

 // Start the server, and have it listen to port 3000
 server.listen(3000,function(){
     console.log("Server is listening to port 3000");
 })

// Define the handler 
var handlers = {}

// sample handler
handlers.sample = function(data, callback){
  // call back a http status code , and a payload object
  callback(406, {'name': 'sample handler'})
}

// Not found 
handlers.notFound = function(data, callback){
  callback(404)
}

 // defin a request router 
 var router = {
     'sample' : handlers.sample
 }