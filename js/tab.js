var pages = {page:1,pageList:6}
var total = 0
var load = document.getElementsByClassName('load')[0]
var index = 1
var loadBox = document.getElementsByClassName('refresh-loading')[0]
var content = document.getElementById('ul')
var show = false
var refreshTxtEle = document.getElementsByClassName('refresh-txt')[0]; //刷新显示的提示文字
var touch, moved, startY, diff, moveDiff = 60,
    pagePull = true;
window.addEventListener('load',function(){
    initData('../json/tabBranch.json',pages)
    
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
          if(index === 1){
            initData('../json/tabBranch.json',pages)
        } else {
            initData('../json/tabType.json',pages)
        }
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

function tabClick(ind){
    var tab = document.getElementsByClassName('tab')[0]
    var tabChild = tab.children
    pages.page = 1
    index = ind
    show = true
    if(ind === 1){
        tabChild[0].innerText = '选择支行'
        tabChild[1].innerText = '分类'
        tabChild[0].classList.add('activeColor')
        tabChild[1].classList.remove('activeColor')
        initData('../json/tabBranch.json',pages)
    } else {
        tabChild[1].innerText = '选择分类'
        tabChild[0].innerText = '支行'
        tabChild[1].classList.add('activeColor')
        tabChild[0].classList.remove('activeColor')
        initData('../json/tabType.json',pages)
    }
}
function initData(url,pages){
    var el = document.getElementById('ul');
    var div = document.createElement('div')
    let len = el.children.length
    if(show){
        pagePull = true;
        loadBox.style.height = '0px';
        refreshTxtEle.style.height = '0px'
        refreshTxtEle.style.display='none'
        for(let i=len-1;i>=0;i--){
           el.removeChild(el.children[i])
        }
    }
    Ajax.get(url,pages,function(res){
        total = res.total
        var str = ''
        for(let item of res.arr){
          str += `<li class="li">
            <div class="left">
                <img src="${item.img}"/>
            </div>
            <div class="right">
                <ul>
                    <div>
                        <li class="type textHandle">${item.type}</li>
                        <li class="detail">${item.detail}</li>
                    </div>
                    <div>
                        <li class="title textHandle">${item.title}</li>
                        <li class="address textHandle">地址：${item.address}</li>
                    </div>
                </ul>
            </div>
        </li>`
        }
        div.innerHTML = str
        el.appendChild(div)
        load.style.display='none'
        show = false
    })
}

window.addEventListener('scroll',function(){
  if(getScrollTop() + getClientHeight()+ 50 > getScrollHeight()) {
      if (++pages.page<= total){
          console.log('下拉刷新了')
          load.style.display='block'
          if(index === 1){
              initData('../json/tabBranch.json',pages)
          } else {
              initData('../json/tabType.json',pages)
          }
      }
  }
})
