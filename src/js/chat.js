import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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
const auth = getAuth(app);
const db = getFirestore(app);

window.onload = function(){
    onAuthStateChanged(auth, async function(user){
        if(user){
            const uid = user.uid;
            const id = await getDoc(doc(db, "Auths", uid));
            async function enterChat(){
                let 채팅 = document.getElementById('채팅');
                await updateDoc(doc(db, "Chats", "chat"), {
                    id : id.data().id,
                    chat : 채팅.value,
                    time : new Date
                });
                채팅.value = '';
            }
            document.getElementById("채팅").addEventListener("keypress", function(e){
                if(e.code == "Enter" && this.value != ''){
                    enterChat();
                }
            })
            document.getElementById("버튼").addEventListener("click", function(){
                enterChat();
            })
            onSnapshot(doc(db, "Chats", "chat"), (doc) => {
                document.getElementById("채팅들").innerHTML += `
                <div>${doc.data().id} : ${doc.data().chat}</div>
                `;
            });
            // loged.innerText = '로그인 완료(' + id.data().id + ')';
        }else{
            console.log('logout');
        }
    });
}