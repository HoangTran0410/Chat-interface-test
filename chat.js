// Make connection
// var socket = io.connect('http://localhost:8080');

window.onload = function () {
    setupChat();
    setupEmoji();
    setupOnclick();

    addMessage('conv-world', {
        name: 'Hoang Tran',
        avatar: 'https://avatars3.githubusercontent.com/u/8141770?s=88&v=4'
    }, 'Veniam nisi voluptate in minim velit. Non officia dolor ad dolor nisi tempor magna non. Culpa aliqua dolore ullamco amet amet consectetur est amet cupidatat Lorem. Nulla anim aliqua irure aliquip ad qui laboris qui. Proident consectetur aliqua cupidatat in magna non enim adipisicing cupidatat excepteur aliquip veniam. Magna consequat non sit magna et aliquip id ad aliquip minim.',
    'right');

    addMessage('conv-world', {
        name: 'Hien Tran',
        avatar: 'https://avatars3.githubusercontent.com/u/8141770?s=88&v=4'
    }, 'Veniam nisi voluptate in minim velit. Non officia dolor ad dolor nisi tempor magna non. Culpa aliqua dolore ullamco amet amet consectetur est amet cupidatat Lorem. Nulla anim aliqua irure aliquip ad qui laboris qui. Proident consectetur aliqua cupidatat in magna non enim adipisicing cupidatat excepteur aliquip veniam. Magna consequat non sit magna et aliquip id ad aliquip minim.',
    'left'); 
}

function setupOnclick() {
    document.addEventListener('click', function(e) {
        // check click outside emoji container => close emoji picker
        var emojiPicker = document.getElementById('emoji-picker');
        if (!emojiPicker.contains(e.target)) {
            emojiPicker.classList.remove("active");
        }
        
        // check click to emoji icon
        if (e.target.classList.contains('emoji')) {
            document.getElementById('input-message').value += e.target.innerHTML;
            saveFrequentlyToLocal(e.target.title, e.target.innerHTML);
        }

        // check click to title emoji => open emoji inside
        if(e.target.classList == 'emoji-picker-group-small-title') {
            addEmoji(e.target);
        }

        // check click button conversation chat
        var dataConv =  e.target.getAttribute("data-conv");
        if(dataConv) {
            openChat(e.target);
        }
    })

}

function setupChat() {
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

function openChat2(type) {
    var btn_world = document.getElementById('btn-chat-world');
    var btn_room = document.getElementById('btn-chat-room');
    var conv_world = document.getElementById('conversation-world');
    var conv_room = document.getElementById('conversation-room');

    if (type == 'world') {
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

function openChat(btn) {
    // close all actived button
    var group_btn_conv = document.getElementById('btns-choose-conv').getElementsByTagName('button');
    for(var b of group_btn_conv) {
        b.classList.remove('active');
    }
    btn.classList.add('active');

    // close all conversation opened
    var convs = document.getElementsByClassName('conversation');
    for(var c of convs) {
        c.classList.remove('active');
    }

    document.getElementById(btn.getAttribute('data-conv')).classList.add('active');
}

function sendMessage() {
    var inp = document.getElementById('input-message');
    var mes = inp.value;

    if (mes.trim() != '') {
        var room = document.getElementById('conv-room');
        var container = (room.classList.contains('active') ? 'conv-room' : 'conv-world');
        addMessage(container, {
            name: "Hoang Tran",
            avatar: "img/question.svg"
        }, mes, 'right');
        updateFrequentlyFromLocal();
    }

    inp.value = "";
}

function addMessage(container, from, mes, align) {
    var div = document.createElement('div');
    div.classList = `message-container-` + align;

    div.innerHTML = `<div class="message-avatar tooltipW3 ` + (align == 'right' ? 'left' : '') + `">
                <img src="` + from.avatar + `" alt="">
                <span class="tooltiptextW3">` + from.name + `</span>
            </div>
            <div class="message-body">
                <p>` + mes + `</p>
            </div>
            <div class="clearFloat"></div>`;

    document.getElementById(container).append(div);
}