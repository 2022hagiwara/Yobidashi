const socket = new WebSocket("wss:///hagiwara-kenta.net/ws/");

socket.addEventListener("message", e => {
    var jres = JSON.parse(e.data);

    if (jres.id == "num-make") {
        change_example();
    }

    if (jres.id == "num-ok") {
        console.log("num-ok")
    }

});


function btn_cli() {

    var temp_alphabet = document.getElementById("alphabet").value.toUpperCase();
    var temp_num = document.getElementById("num").value;

    if (temp_alphabet == "" || temp_num == "") {
        console.log("no");
        return;
    }

    var color_element = document.getElementsByName("color");

    for (let i = 0; i < color_element.length; i++) {
        if (color_element[i].checked) {
            var temp_color = color_element[i].value;
        }
    }

    var url = 'https://hagiwara-kenta.net/api/yobi?';
    url = url + 'alphabet=' + temp_alphabet;
    url = url + '&num=' + temp_num;
    url = url + '&color=' + temp_color;
    url = url + '&all=' + temp_alphabet + temp_num;




    var postyou = new XMLHttpRequest();
    postyou.open('GET', url);

    postyou.send();

    postyou.onload = function () {
        if (postyou.status == 200) {
            console.log("Success:", postyou.responseText);
            result = document.getElementById("result");
            result.textContent = "成功";
            socket.send(JSON.stringify({ id: "num-make", alp: temp_alphabet, num: temp_num, all: temp_alphabet + "、" + temp_num }));

            setTimeout(function () {
                result.textContent = "";
            }, 5000);

        } else {
            console.error("Error:", postyou.statusText);
            result = document.getElementById("result");
            result.textContent = "失敗";

            setTimeout(function () {
                result.textContent = "";
            }, 5000);

        }
    };


}

function check_form() {
    var str = document.getElementById("alphabet").value;
    while (str.match(/[^A-Z^a-z]/)) {
        str = str.replace(/[^A-Z^a-z]/, "");
    }

    document.getElementById("alphabet").value = str;
}

function change_example() {
    var example = document.getElementById("example");

    while (example.firstChild) {
        example.removeChild(example.firstChild);
    }

    var color_checked = document.getElementsByName("color");

    for (let i = 0; i < color_checked.length; i++) {
        if (color_checked[i].checked) {
            var color = color_checked[i].value;
        }
    }
    example.style.backgroundColor = color;

    var b = document.createElement("b");
    b.textContent = document.getElementById("alphabet").value.toUpperCase() + " " + document.getElementById("num").value;
    b.className = "tile";

    example.appendChild(b);
}

function select() {
    this.select();
}

window.onload = function () {

    document.getElementById("alphabet").addEventListener("input", change_example);
    document.getElementById("num").addEventListener("input", change_example);


    alphabet_change();
    change_example();

    conn();
    setInterval(conn, 5000);
}

function alphabet_change() {
    var newdate = new Date();
    var date = newdate.getDate();

    var input_alph = "A";

    switch (date) {
        case 1:
            input_alph = "A";
            break;
        case 2:
            input_alph = "B";
            break;
        case 3:
            input_alph = "C";
            break;
        case 4:
            input_alph = "E";
            break;
        case 5:
            input_alph = "F";
            break;
        case 6:
            input_alph = "G";
            break;
        case 7:
            input_alph = "H";
            break;
        case 8:
            input_alph = "J";
            break;
        case 9:
            input_alph = "K";
            break;
        case 10:
            input_alph = "L";
            break;
        case 11:
            input_alph = "M";
            break;
        case 12:
            input_alph = "N";
            break;
        case 13:
            input_alph = "P";
            break;
        case 14:
            input_alph = "Q";
            break;
        case 15:
            input_alph = "R";
            break;
        case 16:
            input_alph = "T";
            break;
        case 17:
            input_alph = "U";
            break;
        case 18:
            input_alph = "V";
            break;
        case 19:
            input_alph = "W";
            break;
        case 20:
            input_alph = "X";
            break;
        case 21:
            input_alph = "Y";
            break;
        case 22:
            input_alph = "Z";
            break;
        case 23:
            input_alph = "A";
            break;
        case 24:
            input_alph = "B";
            break;
        case 25:
            input_alph = "C";
            break;
        case 26:
            input_alph = "E";
            break;
        case 27:
            input_alph = "F";
            break;
        case 28:
            input_alph = "G";
            break;
        case 29:
            input_alph = "H";
            break;
        case 30:
            input_alph = "J";
            break;
        case 31:
            input_alph = "K";
            break;
    }

    document.getElementById("alphabet").value = input_alph;
}


function conn() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', "https://hagiwara-kenta.net/works/yobidashi/demo/info/num.json");
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const numjson = JSON.parse(xhr.responseText);
            const keys = Object.keys(numjson);

            var list = document.getElementById("list");
            while (list.firstChild) {
                list.removeChild(list.firstChild);
            }

            for (var i = 0; i < keys.length; i++) {
                var li = document.createElement("li");
                li.textContent = numjson[keys[i]].alphabet + " " + numjson[keys[i]].num;
                li.style.backgroundColor = numjson[keys[i]].color;

                var btn = document.createElement("button");
                btn.textContent = "削除";
                btn.setAttribute("onclick", "del(this)");
                btn.id = keys[i];
                li.appendChild(btn);

                list.appendChild(li);
            }
        }
    }

}

function del(e) {

    all = e.id;

    var url = 'https://hagiwara-kenta.net/api/yobi-del?' + "del=" + all;

    var delcon = new XMLHttpRequest();
    delcon.open('GET', url);

    delcon.send();

    delcon.onload = function () {
        if (delcon.status == 200) {
            console.log("Success:", delcon.responseText);
            socket.send(JSON.stringify({ id: "num-del" }));
        } else {
            console.error("Error:", delcon.statusText);
        }
    };
}