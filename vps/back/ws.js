const WebSocket = require('ws');
const fs = require("fs");

const server = new WebSocket.Server({
    host: 'localhost',
    port: "####"
});

server.on('connection', socket => {
    socket.on('message', message => {
        console.log('受信: ', message.toString());

        jmes = JSON.parse(message);


        if (jmes.id == "num-make") {

            var say = jmes.all + "番、査定が終了しました";

            const exec = require('child_process').exec;

            exec('python3 voice.py -id 3 -f ' + jmes.alp + jmes.num + ' -t ' + say, (err, stdout, stderr) => {
                if (err) { console.log(err); }

                server.clients.forEach(client => {
                    client.send(JSON.stringify({ id: "num-ok", alp: jmes.alp, num: jmes.num }));
                });
                //socket.send(JSON.stringify({ id: "num-ok" }));

            });

        }

        if (jmes.id == "num-del") {
            server.clients.forEach(client => {
                client.send(JSON.stringify({ id: "num-update" }));
            });
        }

    });

    socket.on('close', id => {
        console.log('切断した: ', id);
    });

    socket.on('error', err => {
        console.log('エラー: ', err);
    });
});