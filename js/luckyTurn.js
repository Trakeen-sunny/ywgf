var span = document.createElement('span')
var p = document.createElement('p')
var bw = document.querySelector('.bw')
var isRotate = false
var giftType = [
    { location: 1, type: 1, rate: 20 },
    { location: 2, type: 2, rate: 10 },
    { location: 3, type: 3, rate: 10 },
    { location: 4, type: 4, rate: 5 },
    { location: 5, type: 5, rate: 10 },
    { location: 6, type: 6, rate: 5 },
    { location: 7, type: 7, rate: 10 },
    { location: 8, type: 8, rate: 20 },
    { location: 9, type: 9, rate: 5 },
    { location: 10, type: 10, rate: 5 }
  ];
 
var typeMap = {};
window.onload = function(){
    getGift()
    initData()
  
}
function getGift(){
  var prize = document.getElementsByClassName('prize')[0]
  let giftFragment = document.createDocumentFragment();
  Ajax.get('../json/gift.json',{},function(res){
      for(let i=0;i<10;i++){
        typeMap[i+1] = res.arr[i]
        let giftItem = document.createElement('li');
        let deg = (360 / 10) * i;
        giftItem.style.transform = `rotate(${-deg}deg)`;
        let span = document.createElement('span');
        span.innerHTML = res.arr[i]
        giftItem.appendChild(span)
        giftFragment.appendChild(giftItem)
    }
    prize.appendChild(giftFragment)
  })
}
function initData(){
    var date = document.getElementsByClassName('date')[0]
    var prizes  = document.querySelector('.prizes')
    var qs = document.querySelector('.qs')
    var ol = document.createElement('ol')
    Ajax.get("../json/lucky.json",{},function(res){
        date.innerText = res.arr.date
        prizes.innerText = res.arr.prize
        var str = ''
        res.arr.qualifications.forEach(element => {
            str+=`<p>${element}</p>`
        });
        ol.innerHTML = str
        qs.appendChild(ol)
        
    })
}

function beginStart(){
    if (isRotate){
        return
    }
    isRotate = true;
    let randomRate = Math.floor(Math.random() * 100) 
    let num = 0;
    giftType.forEach(item => {
        item.min = num;
        num += item.rate;
        item.max = num;   
    })
    let res = giftType.filter(item => {
        return randomRate >= item.min && randomRate < item.max;
      })[0];
      let rotateItemDeg = (res.location - 1) * 36;
      let rotate = rotateItemDeg + 5 * 360;
      let rotateSpeed = (rotateItemDeg / 360 + 5).toFixed(2);
      bw.removeAttribute('style')
      setTimeout(()=>{
        bw.style.transform = `rotate(${rotate}deg)`;
        bw.style.transition = `transform ${rotateSpeed}s ease-out`;
      },10)

      setTimeout(() => {
        isRotate = false;
        alert(typeMap[res.type])
      }, rotateSpeed * 1000);
}
