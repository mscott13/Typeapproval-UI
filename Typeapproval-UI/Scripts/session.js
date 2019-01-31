var xhr = new XMLHttpRequest();
xhr.open('GET', '/session-check?rnd=' + Math.random());
xhr.onload = function () {
    if (xhr.status === 200) {
        console.log("session_ok");
    }
    else {
        window.location = "/account";
    }
};

xhr.send();