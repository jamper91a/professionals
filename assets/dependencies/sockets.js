class Sockets {

  static professionals(){
    //Socket io
    io.socket.get('/api/professionals/subscribe', function(data, jwr) {
      console.log("socket: professionals");
      console.log('Server responded with status code ' + jwr.statusCode + ' and data: ', data);

    });
    io.socket.on('changeStatus', function(entry) {
      console.log("changeStatus");
      console.log(entry);
    });
  }

}



