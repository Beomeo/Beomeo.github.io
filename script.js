import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDSnAi_5X1llPGthRwyKj46S7tZ7H-4QJ0",
  authDomain: "beomeo-code.firebaseapp.com",
  projectId: "beomeo-code",
  storageBucket: "beomeo-code.appspot.com",
  messagingSenderId: "633559292237",
  appId: "1:633559292237:web:7c9a1e73fa526b0661bf04",
  measurementId: "G-CW6JHRESBK"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

let banners = [];
const getBanners = await getDocs(collection(db, "Banners"));
getBanners.forEach(x => {
  banners.push({id : x.id, data : x.data()});
});
document.getElementById('banner-max').innerText = banners.length;

let banner_n = 0;

function setBanner(x){
  let data = banners[x].data;
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
  document.getElementById('banner-dep').innerText = data.department;
  document.getElementById('banner-title').innerText = data.title;
  document.getElementById('banner-des').innerText = data.description;
  document.getElementById('banner-text').animate(keyframes, options);
  document.getElementById('banner-img').innerText = data.title;
  document.getElementById('banner-img').animate(imgframes, options);
  banner.style.backgroundColor = data.color;
  document.getElementById('banner-a').href = data.url;
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