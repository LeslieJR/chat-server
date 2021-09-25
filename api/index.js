require('./mongo');
const server = require('./server');


//Settings
server.set('port', 4400);
server.listen(server.get('port'), ()=>{
    console.log('listening to port number: ', server.get('port'));
})





