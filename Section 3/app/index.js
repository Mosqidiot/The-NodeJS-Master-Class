/*
 *
 *  Primary file for the API
 * 
 */

 // Deoendencies 
 var http = require('http');
 var url = require('url');

 // The server shoud respond to all request with a string 
 var server = http.createServer(function(req,res){
    
    // get URL and parse it (paese in true to call queryString)
    let parseUrl = url.parse(req.url,true);

    // get path of the URL
    let path = parseUrl.pathname; //un trimed path 
    let trimmedPath = path.replace(/^\/+|\/+$/g, '')
    // send response 
    res.end('hello\n');


    // Log the request path
    console.log('Request received on path: '+trimmedPath);

 });

 // Start the server, and have it listen to port 3000
 server.listen(3000,function(){
     console.log("Server is listening to port 3000");
 })