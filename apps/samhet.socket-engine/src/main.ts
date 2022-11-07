import { Server } from "socket.io";
const port = process.env.port || 3335;
const io = new Server({ cors: {
  origin: "http://localhost:4200"
} });

io.on("connection", (socket) => {
  //console.log(JSON.stringify(socket));
  //check type of connection > Notification or Conversation
  //add to room. notification + profileid
  //add to room conversation.
  //add send to conversation.
  //add viewed conversation.
  console.log(socket.request.headers);
  const userId = socket.request.headers.userid;
  if(!userId) {
    socket.disconnect();
  }

  const connectionType = socket.request.headers.connectiontype;
  if(!connectionType) {
    socket.disconnect();
  }

  if(connectionType === 'notification') {
    socket.join('notification' + userId);
  } else {
    const conversationId = socket.request.headers.conversationid;
    if(!conversationId) {
      socket.disconnect();
    }
    socket.join('conversation' + conversationId);
  }

  console.log('user connected');
  socket.on('ping', (sockettwo) => {
    //console.log(JSON.stringify(socket));
    io.to('notification' + '112').emit('pong', {data: 'from room'});
    io.to('notification' + 'notexist').emit('pong', {data: 'from room'})
  })
});


io.listen(+port);
