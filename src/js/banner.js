import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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
const db = getFirestore(app);

const getBanners = await getDocs(collection(db, "Banners"));
let banners = getBanners.docs.map(x => x.data());
document.getElementById('banner-max').innerText = banners.length;

let banner_n = 0;

function setBanner(x){
  let banner = banners[x];
  let keyframes = [
    {opacity: 0, transform: "translate(0, 50px)"},
    {opacity: 1}
  ];
  let imgframes = [
    {opacity: 0, transform: "translate(50px, 0)"},
    {opacity: 1}
  ];
  let options = {
    delay: 0,
    duration: 500,
    iterations: 1,
  };
  document.getElementById('banner-dep').innerText = banner.department;
  document.getElementById('banner-title').innerText = banner.title;
  document.getElementById('banner-des').innerText = banner.description;
  document.getElementById('banner-text').animate(keyframes, options);
  document.getElementById('banner-img').innerText = banner.title;
  document.getElementById('banner-img').animate(imgframes, options);
  document.getElementById('banner').style.backgroundColor = banner.color;
  document.getElementById('banner-a').href = banner.url;
  document.getElementById('banner-cur').innerText = x + 1;
}

setBanner(banner_n % banners.length);

let banner_btn = document.querySelectorAll('.banner-btn');
banner_btn[0].addEventListener("click", function(){
  banner_n += banners.length - 1;
  setBanner(banner_n % banners.length);
})
banner_btn[1].addEventListener("click", function(){
  banner_n += 1;
  setBanner(banner_n % banners.length);
})

setInterval(() => {
  banner_n += 1;
  setBanner(banner_n % banners.length);
}, 4000);