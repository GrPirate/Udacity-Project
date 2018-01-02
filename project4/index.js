/**
 * 显示地图
 */
var map = new AMap.Map('container', {
    resizeEnable: true,
    zoom: 15,
    center: [114.333652, 30.489841] // 地图中心点
});

/**
 * 地图插件
 */
AMap.plugin(['AMap.ToolBar', 'AMap.Scale'],
    function () {
        map.addControl(new AMap.ToolBar({
            position: 'RB'
        }));

        map.addControl(new AMap.Scale());
    });

/**
 * Market和信息窗体
 */

/*var markers = [];
var infoWindow = new AMap.InfoWindow({
    offset: new AMap.Pixel(0, -22)
});

// 给每个省添加marker
for (let i = 0, len = provinces.length; i < len; i++) {
    let marker;
    if (provinces[i].type === 0) {
        let icon = new AMap.Icon({
            img: 'https://vdata.amap.com/icons/b18/1/2.png',
            siza: new AMap.Size(24, 24)
        });
        marker = new AMap.Marker({
            icon: icon,
            // offset: new AMap.Pixel(-12,-12),
            position: provinces[i].center.split(','),
            title: provinces[i].name,
            zIndex: 101,
            map: map
        })
    } else{
        marker = new AMap.Marker({
            position: provinces[i].center.split(','),
            title: provinces[i].name,
            map: map
        });

        if(provinces[i].type === 2){
            let content = "<div class='taiwan'>宝岛台湾</div>";
            let baodao = new AMap.Marker({
                content: content,
                position: provinces[i].center.split(','),
                title: provinces[i].name,
                map: map
            })
        }
    }
    marker.content = "I am " + provinces[i].name;
    marker.on('click', markerClick);
    markers.push(marker);
}

map.setFitView();*/

/**
 * 点击标记显示详细信息
 * @param {*} e 
 */
/*function markerClick(e) {
    infoWindow.setContent(e.target.content);
    infoWindow.open(map, e.target.getPosition());
}*/

/**
 * 信息窗体
 */
/*var marker = new AMap.Marker({
    position: [116.480983, 39.989628],
    map: map
});
// marker.setMap(map);
var circle = new AMap.Circle({
    center: [116.480983, 39.989628],
    radius: 100,
    fillOpacity: 0.2,
    strokeWeight: 1,
    map: map
})
// circle.setMap(map);
map.setFitView();
var info = new AMap.InfoWindow({
    content: "信息窗体<br>这里是方恒科技大厦",
    offset: new AMap.Pixel(0, -28)
});
info.open(map, marker.getPosition())*/


var marker = new Array();
var windowsArr = new Array();

AMap.service('AMap.PlaceSearch', function () {
    placeSearch = new AMap.PlaceSearch({
        pageSize: 100,
        type: "餐饮服务",
        city: "武汉"
    });
})
placeSearch.searchNearBy('', [114.337611,30.487903], 500,function (status, result) {
    if (status === 'complete' && result.info === 'OK') {
        // keywordSearch_CallBack(result);
        console.log(status, result);
        search_callback(result);
    }
});

/**
 * 查询回调方法
 * @param {*ArrayList} data 
 */
function search_callback(data) {
    var poiArr = data.poiList.pois;
    var resultCount = poiArr.length;
    for (var i = 0; i < resultCount; i++) {
        addmarker(i, poiArr[i]);
    }
    map.setFitView();
}

function addmarker(i, d) {
    var lngX = d.location.getLng();
    var latY = d.location.getLat();
    var markerOption = {
        map: map,
        icon: i < 10 ? "https://webapi.amap.com/theme/v1.3/markers/n/mark_b" + (i + 1) + ".png" : "",
        position: [lngX, latY],
        topWhenMouseOver: true
    };
    var mar = new AMap.Marker(markerOption);
    marker.push([lngX, latY]);

    var infoWindow = new AMap.InfoWindow({
        content: "<h3><font color=\"#00a6ac\">  " + (i + 1) + ". " + d.name + "</font></h3>" + createContent(d.type, d.address, d.tel),
        autoMove: true,
        offset: new AMap.Pixel(0, -30)
    });
    windowsArr.push(infoWindow);
    var aa = function (e) {
        infoWindow.open(map, mar.getPosition());
    };
    mar.on("mouseover", aa);
}


function createContent(type, address, tel) { //窗体内容
    type = parseStr(type);
    address = parseStr(address);
    tel = parseStr(tel);
    var s = [];
    s.push("地址：" + address);
    s.push("电话：" + tel);
    s.push("类型：" + type);
    return '<div>' + s.join("<br>") + '</div>';
}

function parseStr(p) {
    if (!p || p == "undefined" || p == " undefined" || p == "tel") {
        p = "暂无";
    }
    return p;
}