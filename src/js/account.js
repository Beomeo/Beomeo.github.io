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