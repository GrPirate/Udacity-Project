/* rank.js
 * 这是一个简单的储存玩家游戏成绩的工具
 */

(function() {
    
    let _data=[]

    function load(name,time){
        _data=getStorage("rank")||[];
        _data.push({
            name:name,
            time:time
        });
        _data.sort(function(pre,next){
            return pre.time-next.time;
        });
        _buildHtml(_data)
        localStorage.setItem("rank",JSON.stringify(_data));
    }
    /**
     * 从 localStorage中获取数据
     * @param {*key值} item 
     */
    function getStorage(item){
        return JSON.parse(localStorage.getItem(item));
    }
    /**
     * 表格中插入数据
     * @param {*数据列表} data 
     */
    function _buildHtml(data){
        let html="";
        let id=document.querySelector("#bodyrank");
        data.forEach((element, i)=> {
            html+="<tr><td>"+(i+1)+"</td><td>"+element.name+"</td><td>"+element.time+"</td></tr>";
        });
        id.innerHTML=html;
    }

    /* 这个对象通过创造一个公共的资源对象来定义公有的开发者可以访问的函数。*/
    window.Rank = {
        load: load
    };
})();
