
// const express = require('express')

// const app = express()

// app.use('/', express.static('/'))

const WebSocket = require('ws');
 
const ws = new WebSocket.Server({ port: 3000 }, function (){
  console.log('服务端开启ws')
});

let cliArr = []

ws.on('connection', function (client) {
  console.log('服务端ws打开');
  cliArr.push(client)
  // client.send('已连上');
  getMsg(client)
  toClose(client)
});

function getMsg(client) {
  client.on('message', function (data) {
    console.log(data);
    toBroadcast(client, data)
  });
}

function toBroadcast(client, data) {
  for(let cli of cliArr) {
    if(cli === client) continue; // 暂不广播给发送者
    // cli.send('广播消息：' + data)
    cli.send(data)
  }
}

function toClose(client) {
  client.on('close', function () {
    cliArr.splice(cliArr.indexOf(client), 1) // 移除内存中已有的存放
  });
}

ws.on('close', function () {
  console.log('客户端已关闭');
});

ws.on('error', function (err) {
  console.log('服务端连接错误:', err)
})

// app.listen(3000)