import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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
const db = getFirestore(app);

window.onload = function(){
    onAuthStateChanged(auth, async function(user){
        if(user){
            const uid = user.uid;
            let loged = document.getElementById('loged-in');
            if(loged){
                const id = await getDoc(doc(db, "Auths", uid));
                loged.innerText = '로그인 완료(' + id.data().id + ')';
                loged.classList.toggle('hidden');
                document.querySelectorAll('.enter-btn').forEach(a => {
                    a.classList.toggle('hidden');
                })
            }
            console.log('login, ' + uid);
        }else{
            // User is signed out
            // ...
            console.log('logout');
        }
    });
}