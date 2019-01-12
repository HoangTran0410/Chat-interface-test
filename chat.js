// Make connection
// var socket = io.connect('http://localhost:8080');

window.onload = function () {
    setupChat();
    setupEmoji();
}

function setupChat() {

    document.getElementById('btn-chat-world').addEventListener('click', function () {
        openChat('world');
    })

    document.getElementById('btn-chat-room').addEventListener('click', function () {
        openChat('room');
    })

    document.getElementById('input-message').addEventListener('keyup', function () {
        var key = window.event.keyCode;

        // If the user has pressed enter
        if (key === 13) {
            sendMessage();
            return '';
        }
    })

    document.getElementById('btn-send-message').addEventListener('click', function () {
        sendMessage();
    })

    document.getElementById('btn-close-chat').addEventListener('click', function () {
        document.getElementsByClassName('chat-container')[0].classList.remove('active');
    })

    document.getElementById('btn-open-chat').addEventListener('click', function () {
        document.getElementsByClassName('chat-container')[0].classList.toggle('active');
    })
}

function openChat(type) {
    var btn_world = document.getElementById('btn-chat-world');
    var btn_room = document.getElementById('btn-chat-room');
    var conv_world = document.getElementById('conversation-world');
    var conv_room = document.getElementById('conversation-room');

    if(type == 'world') {
        btn_world.classList.add('active');
        conv_world.classList.add('active');
        btn_room.classList.remove('active');
        conv_room.classList.remove('active');
    } else {
        btn_world.classList.remove('active');
        conv_world.classList.remove('active');
        btn_room.classList.add('active');
        conv_room.classList.add('active'); 
    }
}

function sendMessage() {
    var inp = document.getElementById('input-message');
    var mes = inp.value;

    if (mes.trim() != '') {
        var room = document.getElementById('conversation-room');
        var world = document.getElementById('conversation-world');
        var h = '<p>' + mes + '</p>';
        (room.classList.contains('active') ? room.innerHTML += h : world.innerHTML += h);
        updateFrequentlyFromLocal();
    }

    inp.value = "";
}

function addMessage() {

}