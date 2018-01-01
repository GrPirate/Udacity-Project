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

var markers = [];

for (let i = 0, len = provinces.length; i < len; i++) {
    let marker;
    if (provinces[i].type === 0) {
        let icon = new AMap.Icon({
            img: 'https://vdata.amap.com/icons/b18/1/2.png',
            siza: new AMap.Size(24, 24)
        });
        marker = new AMap.Marker({
            icon: icon,
            position: provinces[i].center.split(','),
            title: provinces[i].name,
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
    markers.push(marker);
}

// var marker = new AMap.Marker({
//     position: [116.480983, 39.989628],
//     map: map
// });
// // marker.setMap(map);
// var circle = new AMap.Circle({
//     center: [116.480983, 39.989628],
//     radius: 100,
//     fillOpacity: 0.2,
//     strokeWeight: 1,
//     map: map
// })
// circle.setMap(map);
map.setFitView();
var info = new AMap.InfoWindow({
    content: "信息窗体<br>这里是方恒科技大厦",
    offset: new AMap.Pixel(0, -28)
});
info.open(map, marker.getPosition())