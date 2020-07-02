var Ajax = {
    get: function(url,data,callback){
        var xhr=new XMLHttpRequest();
        xhr.open('GET',url,false);
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4){
                if(xhr.status==200 || xhr.status==304){
                    if (JSON.parse(xhr.responseText).main) {
                        var arr = JSON.parse(xhr.responseText).main
                        var obj = {arr:arr.slice(data.pageList * data.page - data.pageList,data.pageList * data.page),total:Math.ceil(arr.length / data.pageList)}
                    } else if(JSON.parse(xhr.responseText).branch){
                        var arr = JSON.parse(xhr.responseText).branch
                        var obj = {arr:arr.slice(data.pageList * data.page - data.pageList,data.pageList * data.page),total:Math.ceil(arr.length / data.pageList)}
                    } else if(JSON.parse(xhr.responseText).type){
                        var arr = JSON.parse(xhr.responseText).type
                        var obj = {arr:arr.slice(data.pageList * data.page - data.pageList,data.pageList * data.page),total:Math.ceil(arr.length / data.pageList)}
                    } else if(JSON.parse(xhr.responseText).banner){
                        var obj = {arr: JSON.parse(xhr.responseText).banner}
                    } else if(JSON.parse(xhr.responseText).rule){
                        var obj = {arr: JSON.parse(xhr.responseText).rule}
                    } else if(JSON.parse(xhr.responseText).gift){
                        var obj = {arr: JSON.parse(xhr.responseText).gift}
                    }
                    callback(obj);
                }
            }
        }
        xhr.send();
    },

    post: function(url,data,callback){
        var xhr=new XMLHttpRequest();
        xhr.open('POST',url,false);
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xhr.onreadystatechange=function(){
            if (xhr.readyState==4){
                if (xhr.status==200 || xhr.status==304){
                    callback(xhr.responseText);
                }
            }
        }
        xhr.send(data);
    }
}