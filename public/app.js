window.onload = function(){
    const socket = io(); //서버에 소켓연결

    const popup = document.querySelector("#popup");
    const nicknameInput = document.querySelector("#nickname");
    document.querySelector("#btnLogin").addEventListener("click", e =>{
        if(nicknameInput.value === ""){
            alert("닉네임 입력하세요");
            return;
        }
        socket.emit('login', nicknameInput.value);
    });

    socket.on('login-ok', data=>{
        popup.remove();
    });

    const userList = document.querySelector("#userList");
    socket.on('user-list', data =>{
        userList.innerHTML = "";
        data.forEach( user => {
            let div = document.createElement("div");
            div.classList.add("user");
            div.innerHTML = user.nickname;
            if(user.id === socket.id){
                div.classList.add("my");
            }
            userList.appendChild(div);
        });
    });

    const msgBox = document.querySelector("#msgBox");
    const msgInput = document.querySelector("#msg");
    msgBox.innerHTML = "";
    //보내기 버튼 클릭시
    /*
        1. 디자인을 고쳐보세요. F-Awesome하게
        2. 채팅 메시지를 치면 자동으로 스크롤 되게 하세요.
        3. 로그인과 채팅메시지 전송에서 엔터키를 치면 자동 전송되게
    */
    document.querySelector("#btnSend").addEventListener("click", e =>{
        if(msgInput.value !== ""){
            socket.emit('chat msg', msgInput.value);
            msgInput.value = "";
        }
    });

    socket.on('awesome', data => {
        let msg = document.createElement("div");
        msg.classList.add("msg");
        if(data.user.id === socket.id){
            msg.classList.add("my");
            msg.innerHTML = data.msg;
        }else{
            msg.innerHTML = data.user.nickname + " : " + data.msg;
        }
        msgBox.appendChild(msg);
    });
};