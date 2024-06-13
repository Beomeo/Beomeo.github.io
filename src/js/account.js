let card = document.querySelector('#card');
let cardLength = [card.clientWidth, card.clientHeight];
let shadow = document.querySelector('#shadow');
card.addEventListener('mousemove', function(e){
    let x = e.offsetX;
    let y = e.offsetY;
    let rotateY = x / cardLength[0] * 40 - 20;
    let rotateX = 20 - y / cardLength[1] * 40;
    shadow.style = `transition: all 100ms; background-position : ${90 - x / cardLength[0] * 80}% ${90 - y / cardLength[1] * 80}%;`;
    this.style = `transition: all 100ms; transform : perspective(350px) rotateX(${2*rotateX}deg) rotateY(${2*rotateY}deg);`;
})
card.addEventListener('mouseout', function(){
    shadow.style = 'transition: all 300ms;';
    this.style = 'transition: all 300ms;';
})
document.querySelector("#code").addEventListener("click", function(){
    this.classList.toggle('active');
})

document.querySelectorAll('.hider-toggle').forEach((a, i) => {
    a.addEventListener("click", function(){
        let id = 'password';
        if(i == 1) id = 'repw';
        let input = document.getElementById(id);
        input.type = input.type == 'text' ? 'password' : 'text';

        a.querySelectorAll(".hider").forEach(x => {
            x.classList.toggle('active');
        })
    })
})

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, getDocs, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDRIEG9pedF7-yJ3Pcad23-JBgxb7Jd2J0",
    authDomain: "beomeo-3025c.firebaseapp.com",
    projectId: "beomeo-3025c",
    storageBucket: "beomeo-3025c.appspot.com",
    messagingSenderId: "735227917768",
    appId: "1:735227917768:web:1d1a48e06be5884b90fcfd",
    measurementId: "G-L3G2XBJZ3E"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);


async function signUp(id, email, password, repw){
    const profiles = await getDocs(collection(db, "Profiles"));
    let ids = profiles.docs.map(x => x.data().id);
    console.log(ids);
    if(!ids.includes(id) && password === repw){
        createUserWithEmailAndPassword(auth, email, sha224(password)).then(async function(user){
            await setDoc(doc(db, "Profiles", user.user.uid),{
                id : id,
                email : email
            })
            await setDoc(doc(db, "Auths", user.user.uid),{
                id : id
            })
            // const user = user.user;

            window.location.href = '/';
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
    }
}


function logIn(email, password){
    setPersistence(auth, browserSessionPersistence).then(() => {

        signInWithEmailAndPassword(auth, email, password).then((user) => {
            // const user = userCredential.user;
            window.location.href = '/';
            // console.log(user.user);
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
    })
}

document.getElementById('log-in')?.addEventListener("click", function(){
    let email = document.getElementById("email").value;
    let password = document.getElementById('password').value;
    logIn(email, sha224(password));
})

document.getElementById('id')?.addEventListener("input", async function(){
    let idWarn = document.getElementById("id-warn");
    idWarn.classList.remove("permit");
    let sign = document.getElementById('sign-up');
    sign.classList.remove("id");
    let regex = /^[a-zA-Z0-9가-힣_.-]{2,25}$/;
    if(this.value == ''){
        idWarn.innerText = "아이디를 입력해 주세요.";
    }else if(regex.test(this.value) == false){
        idWarn.innerText = "올바르지 않은 아이디 형식입니다.";
    }else{
        const profiles = await getDocs(collection(db, "Profiles"));
        let ids = profiles.docs.map(x => x.data().id);
        if(ids.includes(this.value)){
            idWarn.innerText = "이미 사용되고 있는 아이디입니다.";
        }else{
            idWarn.innerText = "사용할 수 있는 아이디입니다.";
            idWarn.classList.add("permit");
            sign.classList.add("id");
        }
    }
    idWarn.classList.remove("hidden");
})

document.getElementById('email').addEventListener("input", function(){
    let sign = document.getElementById('sign-up');
    sign?.classList.remove("email");
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if(this.value == ''){
        // console.log(this.value);
    }else if(regex.test(this.value) == false){
        // console.log(this.value);
    }else{
        sign?.classList.add("email");
    }
})

document.getElementById('password').addEventListener("input", function(){
    let sign = document.getElementById('sign-up');
    sign?.classList.remove("pw");
    let regex = /^.{0,20}$/;
    if(regex.test(this.value) == false){
        // console.log(this.value);
    }else if(this.value != document.getElementById('repw')?.value){
        // 
    }else{
        sign?.classList.add("pw");
        sign.classList.add("repw");
    }
})

document.getElementById('repw')?.addEventListener("input", function(){
    let sign = document.getElementById('sign-up');
    sign.classList.remove("repw");
    if(this.value != document.getElementById('password').value){
        // console.log(this.value);
    }else{
        sign.classList.add("repw");
        sign?.classList.add("pw");
    }
})

document.getElementById('sign-up')?.addEventListener("click", function(){
    let id = document.getElementById("id").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById('password').value;
    let repw = document.getElementById('repw').value;
    signUp(id, email, password, repw);
})