var vm = new AppViewModel();

ko.applyBindings(vm);
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




var markers = new Array();
var windowsArr = new Array();
var placeSearch;

AMap.service('AMap.PlaceSearch', function () {
    placeSearch = new AMap.PlaceSearch({
        pageSize: 100,
        type: "餐饮服务",
        city: "武汉"
    });
})
search();
function search(key = '') {
    placeSearch.searchNearBy(key, [114.337611, 30.487903], 500, function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
            // keywordSearch_CallBack(result);
            console.log(status, result);
            search_callback(result);
            vm.list(result.poiList.pois);
        }
    });
}

/**
 * 查询回调方法
 * @param {*ArrayList} data 
 */
function search_callback(data) {
    map.remove(markers);
    windowsArr = [];
    markers = [];
    var poiArr = data.poiList.pois;
    var resultCount = poiArr.length;
    for (var i = 0; i < resultCount; i++) {
        var mar = addmarker(i, poiArr[i]);
        markers.push(mar);
        AMap.event.addListener(mar, 'click', _onClick);
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

    var infoWindow = new AMap.InfoWindow({
        content: "<h3><font color=\"#00a6ac\">  " + (i + 1) + ". " + d.name + "</font></h3>" + createContent(d.type, d.address, d.tel),
        autoMove: true,
        offset: new AMap.Pixel(0, -30)
    });
    windowsArr.push(infoWindow);
    var openInfoWindow = function (e) {
        infoWindow.open(map, mar.getPosition());
    };
    mar.on("mouseover", openInfoWindow);
    mar.on("mouseout", () => infoWindow.close());
    return mar;
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

/**
 * knockoutJs部分
 */


function AppViewModel() {
    this.list = ko.observableArray([]);

    this.updated
    this.placeName=ko.pureComputed({
        read: function () {
            return "";
        },
        write: function (value) {
            search(value);
        },
        owner: this
    });

    // this.showDetail = function (data,e) {
    //     // showMakerByIndex(idx);
    //     console.log(data,e);
    // }
}


AMap.event.addListener(map, 'zoomend', _onZoomEnd);

function _onZoomEnd(e) {
    if (map.getZoom() < 16) {
        map.add(markers);
    }
}


function _onClick(e) {
    map.remove(markers);
    map.add(e.target);
    map.setFitView(e.target);
}

function showMakerByIndex(data,e) {
    console.log(data,e);
    // map.remove(markers);
    // map.add(markers[idx]);
    // map.setFitView(markers[idx]);
}