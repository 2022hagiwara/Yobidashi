const socket = new WebSocket("wss:///hagiwara-kenta.net/ws/");

socket.addEventListener("message", e => {
    var jres = JSON.parse(e.data);

    if (jres.id == "num-ok") {
        conn();

        var sound = new Audio();
        sound.src = "voice/" + jres.alp + jres.num + ".wav";


        setTimeout(function () { sound.play(); }, 5000);

        console.log("sai");
    }

    if (jres.id == "num-update") {
        conn();
    }
});


var xhr = new XMLHttpRequest();

conn();
//json関係の関数
function conn() {
    xhr.open('GET', "num.json");
    xhr.send();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            const numjson = JSON.parse(xhr.responseText);
            const keys = Object.keys(numjson);

            function makep() {
                var div = document.getElementById("div");

                while (div.firstChild) {
                    div.removeChild(div.firstChild);
                }

                for (var i = 0; i < keys.length; i++) {
                    var p = document.createElement("b");
                    p.textContent = numjson[keys[i]].alphabet + " " + numjson[keys[i]].num;
                    p.className = "tile";
                    p.style.backgroundColor = numjson[keys[i]].color;
                    div.appendChild(p);
                }
            }

            console.log("aaa")
            makep();
        }
    }
}

window.onload = function () {
    conn();
}

//フルスクリーン関係の関数
function change_fullscreen() {
    //document.getElementById("voice").load();

    if (!document.fullscreenElement) {
        document.getElementById("fullscreen").setAttribute("src", "etc/fullexit.png");
        document.body.requestFullscreen();
    } else if (document.exitFullscreen) {
        document.getElementById("fullscreen").setAttribute("src", "etc/full.png");
        document.exitFullscreen();
    }
}



