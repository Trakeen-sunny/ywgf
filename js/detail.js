var ul = document.createElement('ul')
var focus = document.querySelector('.banner');
var num = 0
window.addEventListener('load', function() {
    initData()
    
    var ul = focus.children[0];
    var newLi = ul.children[0].cloneNode(true) // 克隆第一个li标签，放到Ul最后
    ul.appendChild(newLi)
    var index = 0;
    function yd(index) {
        ul.style.left = -index * focus.offsetWidth + 'px'
    }
    var timer = setInterval(function() {
        ++index;
        ul.style.transition = 'all .3s';
        yd(index);
    }, 5000);

    ul.addEventListener('transitionend', function() {
        if (index === ul.children.length - 1) {
            index = 0;
            ul.style.transition = '';
            yd(index);
        } else if (index < 0) {
            index = ul.children.length-2; 
            ul.style.transition = '';
            yd(index);
        }
    });

    var x = 0;
    var x1 = 0;
    
    var flag = false;
    var time = +new Date();
    var s = 0;
    ul.addEventListener('touchstart', function(e) { 
        x = e.targetTouches[0].pageX;
        var time1 = +new Date(); 
        s = time1 - time; 
        time = time1; 
        clearInterval(timer);
    });

    ul.addEventListener('touchmove', function(e) {
		if (s > 500) {
     		x1 = e.targetTouches[0].pageX - x;
            if (Math.abs(x1) < focus.offsetWidth) {
                var w = -index * focus.offsetWidth + x1;
                if(x1>0){
                    if(index==0){
                        index = num
                        w = -index * focus.offsetWidth + x1;
                    }
                }
                if(x1<0){
                    w = -index * focus.offsetWidth + x1;
                }
                ul.style.transition = 'none';
                ul.style.left =  w + 'px'
                flag = true; 
                e.preventDefault();
            }
        }
    })

    ul.addEventListener('touchend', function(e) {
        if (flag) {
            if (Math.abs(x1) > 50) {
                if (x1 > 0) {
                    index--;
                } else {
                    index++;
                }
                ul.style.transition = 'all .3s';
                yd(index);
            } else {
                ul.style.transition = 'all .3s';
                yd(index);
            }
            flag = false;
        }
        clearInterval(timer);
        timer = setInterval(function() {
            index++;
            ul.style.transition = 'all .3s';
            yd(index);
        }, 5000);
    })
})

function initData(){
    var el = document.getElementsByClassName('banner')[0]
    Ajax.get('../json/banner.json',{},function(res){
        var str = ''
        for(let item of res.arr){
            str+=`<li>
                    <img src="${item.img}" />
                    <span>${item.title}</span>
                </li>`
        }
        num = res.arr.length
        ul.innerHTML = str
        el.appendChild(ul)
        var elChild =  el.children[0]
        elChild.style.width = focus.offsetWidth * (res.arr.length + 1) +'px'
    })
    
}

