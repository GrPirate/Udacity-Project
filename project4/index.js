var map = new AMap.Map('container', {
    resizeEnable: true,
    zoom: 15,
    center: [114.333652, 30.489841]
});


AMap.plugin(['AMap.ToolBar','AMap.Scale'],
    function () {
        map.addControl(new AMap.ToolBar({
            position: 'RT'
        }));
        
        map.addControl(new AMap.Scale());
    });