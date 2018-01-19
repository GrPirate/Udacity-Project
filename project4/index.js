
var map
var markers = [];
var windowsArr = [];
var placeSearch;
var mapView = {
    init: function () {
        /**
         * 显示地图
         */
        map = new AMap.Map('container', {
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

        AMap.service('AMap.PlaceSearch', function () {
            placeSearch = new AMap.PlaceSearch({
                pageSize: 100,
                type: "餐饮服务",
                city: "武汉"
            });
        })
        AMap.event.addListener(map, 'zoomend', mapOctopus._onZoomEnd);
    }
}


/**
 * knockoutJs部分
 */


var AppViewModel = function () {
    var self = this;
    this.list = ko.observableArray([]);

    this.toggle = ko.observable(false);
    this.placeName = ko.pureComputed({
        read: function () {
            return "";
        },
        write: function (value) {
            mapOctopus.search(value)
                .then((res) => mapOctopus.search_callback(res));
        },
        owner: this
    });
    this.showDetail = function (data) {
        map.remove(markers);
        map.add(data.marker);
        map.setFitView(data.marker);
    };
    this.toggleList = function () {
        self.toggle(!self.toggle());
    }
}

var mapOctopus = {
    init: function () {
        mapView.init();
        this.search()
            .then((res) => mapOctopus.search_callback(res));;
    },
    search: function (key = '') {
        vm.list([]);
        return new Promise((resolve) => {
            placeSearch.searchNearBy(key, [114.337611, 30.487903], 500, function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    // keywordSearch_CallBack(result);
                    resolve(result);
                }
            });
        })
        
    },
    /**
     * 查询回调方法
     * @param {*ArrayList} data 
     */
    search_callback: function (data) {
        map.remove(markers);
        windowsArr = [];
        markers = [];
        var poiArr = data.poiList.pois;
        var resultCount = poiArr.length;
        for (var i = 0; i < resultCount; i++) {
            var mar = this.addmarker(i, poiArr[i]);
            poiArr[i].marker = mar;
            markers.push(mar);
            vm.list.push(poiArr[i])
            AMap.event.addListener(mar, 'click', this._onClick);
        }
        map.setFitView();
    },

    addmarker: function (i, d) {
        var lngX = d.location.getLng();
        var latY = d.location.getLat();
        var markerOption = {
            map: map,
            icon: i < 10 ? "https://webapi.amap.com/theme/v1.3/markers/n/mark_b" + (i + 1) + ".png" : "",
            position: [lngX, latY],
            topWhenMouseOver: true,
            animation: "AMAP_ANIMATION_DROP"
        };
        var mar = new AMap.Marker(markerOption);

        var infoWindow = new AMap.InfoWindow({
            content: "<h3><font color=\"#00a6ac\">  " + (i + 1) + ". " + d.name + "</font></h3>" + this.createContent(d.type, d.address, d.tel),
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
    },


    createContent: function (type, address, tel) { //窗体内容
        type = this.parseStr(type);
        address = this.parseStr(address);
        tel = this.parseStr(tel);
        var s = [];
        s.push("地址：" + address);
        s.push("电话：" + tel);
        s.push("类型：" + type);
        return '<div>' + s.join("<br>") + '</div>';
    },

    parseStr: function (p) {
        if (!p || p == "undefined" || p == " undefined" || p == "tel") {
            p = "暂无";
        }
        return p;
    },



    _onZoomEnd: function (e) {
        if (map.getZoom() < 16) {
            map.add(markers);
        }
    },


    _onClick: function (e) {
        map.remove(markers);
        map.add(e.target);
        map.setFitView(e.target);
    }

}
var vm = new AppViewModel();

ko.applyBindings(vm);

mapOctopus.init();