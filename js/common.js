! function (n, e) {
    function t() {
        e.documentElement.style.fontSize = 100 * e.documentElement.clientWidth / 375 + "px"
    }
    t(), n.addEventListener("resize", t, !1)
}(window, document)
function goTo(ev){
    if(ev===1){
        window.location.href='../html/index.html'
    }else if(ev === 2){
        window.location.href='../html/detail.html'
    }else if(ev === 3){
        window.location.href='../html/tab.html'
    }else if(ev === 4){
        window.location.href='../html/luckyTurn.html'
    }
}
