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

document.getElementById('hider').addEventListener("click", function(){
    let pw = document.getElementById("password");
    if(pw.type == 'password'){
        pw.type = 'text';
    }else{
        pw.type = 'password';
    }

    document.querySelectorAll(".hider").forEach(a => {
        a.classList.toggle('active');
    })
})

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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
const analytics = getAnalytics(app);
const auth = getAuth(app);

// createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
//     const user = userCredential.user;
// }).catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
// });

function logIn(email, password){
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        // const user = userCredential.user;
        window.location.href = '/';
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
    });
}

document.getElementById('log-in').addEventListener("click", function(){
    let email = document.getElementById("email").value;
    let password = document.getElementById('password').value;
    logIn(email, password);
})