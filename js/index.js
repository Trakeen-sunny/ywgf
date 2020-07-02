var pages = {page:1,pageList:5}
var total = 0
var load = document.getElementsByClassName('load')[0]
var loadBox = document.getElementsByClassName('refresh-loading')[0]
var content = document.getElementById('ulContent')
var refreshTxtEle = document.getElementsByClassName('refresh-txt')[0];
var show = false
var touch, moved, startY, diff, moveDiff = 60,
    pagePull = true;
window.addEventListener('load',function(){
    initData(pages)
    content.addEventListener('touchstart', function (e) {
        if (content.scrollTop > 0) {
          touch = false;
          return;
        }
        touch = true;
        moved = false;
        startY = e.touches[0].clientY;
    }, false);
      content.addEventListener('touchmove', function (e) {
        if (content.scrollTop > 0) {
           return
        }
        if (!touch || !pagePull) {
          return;
        }
        var touchesDiff = e.touches[0].clientY - startY;
        if (touchesDiff < 0) {
          moved = false;
          return;
        }
        moved = true;
        diff = touchesDiff;
        var distance = 0;
        if (diff <= moveDiff) {
          distance = diff;
          refreshTxtEle.style.display='block'
          refreshTxtEle.innerHTML = '下拉可刷新';
        } else {
          refreshTxtEle.style.display='block'
          refreshTxtEle.innerHTML = '释放可刷新';
          if (touchesDiff <= (2 * moveDiff)) {
            distance = moveDiff + 0.5 * (touchesDiff - moveDiff);
          } else {
            distance = moveDiff + 0.1 * (touchesDiff - moveDiff) + 0.05 * (touchesDiff - 2 * moveDiff);
          }
        }
        if (distance > 0) {
          css(loadBox, 0);
          loadBox.style.height = distance + 'px';
        }
      }, false);
      content.addEventListener('touchend', function (e) {
        if (!touch || !moved) {
            loadBox.style.height = '0px';
          return;
        }
        css(loadBox, 300);
        pagePull = false;
        if (diff > moveDiff) {
          refreshTxtEle.innerHTML = '刷新中';
          loadBox.style.height = moveDiff + 'px';
          show = true
          pages.page = 1
          initData(pages)
        } else {
          pagePull = true;
          loadBox.style.height = '0px';
        }
      }, false);
    
      function css(ele, t) {
        ele.style.transition = "all " + t + "ms";
        ele.style.webkitTransition = "all " + t + "ms";
      }
})

function initData (data) {
    var el = document.getElementById('ulContent')
    let div = window.document.createElement('div')
    let divChild = document.getElementsByClassName('div')
    let len = divChild.length
    div.classList.add('div')

    if(show){
        pagePull = true;
        loadBox.style.height = '0px';
        refreshTxtEle.style.height = '0px'
        refreshTxtEle.style.display='none'
        for(let i=len-1;i>=0;i--){
           el.removeChild(el.children[i])
        }
    }
    
    Ajax.get('../json/index.json',data,function(res){
        var str = ''
        total = res.total
        for(let item of res.arr){
            str += `<li class="li">
                            <div>${item.title}</div>
                            <div>
                            <img src="${item.img}"/>
                            <span>${item.tip}</span>
                            </div>
                        </li>
                    `
        }
        div.innerHTML = str
        el.appendChild(div)
        load.style.display='none'
        show = false
    })
}

window.addEventListener('scroll',function(){
    if(getScrollTop() + getClientHeight()+ 50 > getScrollHeight()) {
        console.log('下拉刷新了')
        if (++pages.page<= total){
            load.style.display='block'
            initData(pages)
        }
    }
})
