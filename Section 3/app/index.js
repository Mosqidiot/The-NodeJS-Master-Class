/*
 *
 *  Primary file for the API
 * 
 */

 //Deoendencies 
 var http = require('http');

 //The server shoud respond to all request with a string 
 var server = http.createServer(function(req,res){
    res.end("");
 });

 //Start the server, and have it listen to port 3000
 server.listen(3000,function(){
     console.log("Server is listening to port 3000");
 })