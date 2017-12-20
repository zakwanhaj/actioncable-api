var App = {};

App.sendmessage = function(data) {
  message = {
    command: "message",
    identifier: JSON.stringify(App.param),
    data: JSON.stringify(data)
  };

  App.ws.send(JSON.stringify(message));
}

App.connect_server = function() {
  const WebSocket = require('ws');

  App.ws = new WebSocket(
    'ws://localhost:3000/cable',
    [],
    {
      headers: {
        'Authorization': 'Bearer 23a122abddd3dc75185fc8e4b2579440'
      }
    }
  );

  App.param = {channel: "ChatChannel"};

  App.ws.on('open', function open() {
    data = {
      command: "subscribe",
      identifier: JSON.stringify(App.param)
    }
    App.ws.send(JSON.stringify(data));
  });

  App.ws.on('message', function (event) {
    console.log(event);
  });

}


App.connect_server();
setTimeout(function () {
  App.sendmessage({action: 'join_room', room_id: 1}); // OR if operator: { action: 'join_conversation', conversation_id: 11, unread: 0 }
}, 500)
setTimeout(function () {
  App.sendmessage({action: 'post_message', conversation_id: 26, body: "Hello World"});
}, 1000)
