(function () {
    require.config({
        paths: {
            echarts: 'echarts',
        } 
    });
    require(
        [	
        	'echarts',
        	'echarts/chart/main',
        	'echarts/chart/map',    
        ],
        function (echarts, BMapExtension) {
            var BMapExt = new BMapExtension($('#chart_map')[0], BMap, echarts,{
                enableMapClick: false
            });
            var map = BMapExt.getMap();
            var container = BMapExt.getEchartsContainer();
            var startPoint = {
                x: 113.035981, 
                y: 34.442236
            };    
            var point = new BMap.Point(startPoint.x, startPoint.y);
            map.centerAndZoom(point, 15);
            map.enableScrollWheelZoom(true);
            // map.setMapStyle({style:'midnight'});
            map.setMapStyle({ 
                styleJson: [
                    // {    
                    //     'featureType': 'land',     //陆地  
                    //     'elementType': 'all',
                    //     'stylers': {
                    //             'color': '#08304A'
                    //     }   
                    // },
                ]
            });
            var geoCoordMap = {
                '裕达国贸': [113.62289,34.74693],
                '大润发': [113.035981,34.442236],
                '丹尼斯大卫城': [113.6657512693,34.7578361917],
            };
            var data = [
                {name:'裕达国贸', value: 120},
                {name:'大润发', value: 152},
                {name:'丹尼斯大卫城', value: 130},
            ];
            var uploadedURL= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAvUlEQVRYR+2VsQ0CMQxFnzdhFxaBDSiv5Eq6u01ggxuEgtuAEqogS0SiQYrsIAvJrhP9pxfbEYJLgvNJgDTwnwYKXIGtwOqdIpOBAgV4AIPA7IHwANTcG7AXWCwgPQBqrgIoiAI1V0+AGnoEZoF7C8UvADR3FdhEAYzAFGHgAhwiekB3wS5iCp7vPTC1vPW3M54mPAkMnnC96wEYBXTkXJUAaSANWA3oT6fb7+yaQese8IZ+3jcZSIA00NPAC8f3QSEsVT0lAAAAAElFTkSuQmCC';
            option = {
                color:['#fff'],
                series : [
                    {
                        type:'map',
                        mapType: 'none',
                        data:[],
                        markPoint:{
                            symbol:uploadedURL,
                            symbolSize:40,
                            itemStyle:{
                                normal:{
                                    label:{
                                        show:true,
                                        position:'bottom',
                                        formatter:'{b}',
                                        textStyle:{ fontSize:30, color:'#fff',}
                                    },
                                },
                                emphasis: {
                                    label:{  show: false,  }  
                                } 
                            },
                            data:data,
                        },
                        geoCoord:geoCoordMap
                    },

                ]
            };  
            var myChart = BMapExt.initECharts(container);
            window.onresize = myChart.onresize;
            BMapExt.setOption(option);
            myChart.on('click', function (params) {
                /*alert(1);
                console.log(params);*/
                var event = params.event;
                var offsetX = event.offsetX;
                var offsetY = event.offsetY;
                console.log(offsetX);
                console.log(offsetY);
                $('#box').css("display",'block');       
                $('#box').css('left',(offsetX+5)+'px');    
                $('#box').css('top',(offsetY+5)+'px');     
            });
            

            
        }
    );
})();

    // {
                    //     "featureType": "land",      陆地
                    //     "elementType": "geometry",
                    //     "stylers": {
                    //         "color": "#08304A",
                    //         "visibility": "on"
                    //     }
                    // }, {
                    //     "featureType": "water",
                    //     "elementType": "geometry",
                    //     "stylers": {
                    //         "color": "#b06077ff",
                    //         "visibility": "on"
                    //     }
                    // },{
                    //     "featureType": "water",      水
                    //     "elementType": "labels.text.fill",
                    //     "stylers": {
                    //         "color": "#071b4bff",
                    //         "visibility": "on"
                    //     }
                    // }, {
                    //     "featureType": "water",
                    //     "elementType": "labels.text.stroke",
                    //     "stylers": {
                    //         "color": "#32b1be00",
                    //         "visibility": "on"
                    //     }
                    // },  {
                    //     "featureType": "building",     建筑物 
                    //     "elementType": "geometry.fill",
                    //     "stylers": {
                    //         "color": "#000f3cff",
                    //         "visibility": "on"
                    //     }
                    // }, {
                    //     "featureType": "building",
                    //     "elementType": "geometry.stroke",
                    //     "stylers": {
                    //         "color": "#000023ff",
                    //         "visibility": "on"
                    //     }
                    // },  
                    // {
                    //     "featureType": "village",    村庄
                    //     "elementType": "labels",
                    //     "stylers": {
                    //         "visibility": "off"
                    //     }
                    // }, {
                    //     "featureType": "town",       城镇
                    //     "elementType": "labels",
                    //     "stylers": {
                    //         "visibility": "off"
                    //     }
                    // }, {
                    //     "featureType": "district",   区 地区 第九区
                    //     "elementType": "labels",
                    //     "stylers": {
                    //         "visibility": "off"
                    //     }
                    // }, {
                    //     "featureType": "country",    国家 乡村 家园
                    //     "elementType": "labels.text.fill",
                    //     "stylers": {
                    //         "color": "#b06077ff",
                    //         "visibility": "on"
                    //     }
                    // },{
                    //     "featureType": "country",
                    //     "elementType": "labels.text.stroke",
                    //     "stylers": {
                    //         "color": "#2751b6ff",
                    //         "visibility": "on",
                    //         "weight": 1
                    //     }
                    // }, {
                    //     "featureType": "city",           城市
                    //     "elementType": "labels.text.fill",
                    //     "stylers": {
                    //         "color": "#b06077ff",
                    //         "visibility": "on"
                    //     }
                    // },{
                    //     "featureType": "city",
                    //     "elementType": "labels.text.stroke",
                    //     "stylers": {
                    //         "color": "#2751b6ff",
                    //         "visibility": "on",
                    //         "weight": 1
                    //     }
                    // }, {
                    //     "featureType": "city",
                    //     "elementType": "labels.icon",
                    //     "stylers": {
                    //         "visibility": "off"
                    //     }
                    // }, {
                    //     "featureType": "continent",   大洲 大陆
                    //     "elementType": "labels.text.fill",
                    //     "stylers": {
                    //         "color": "#b06077ff",
                    //         "visibility": "on"
                    //     }
                    // }, {
                    //     "featureType": "continent",
                    //     "elementType": "labels.text.stroke",
                    //     "stylers": {
                    //         "color": "#2751b6ff",
                    //         "visibility": "on",
                    //         "weight": 1
                    //     }
                    // }, {
                    //     "featureType": "poilabel",    所有文字
                    //     "elementType": "labels",
                    //     "stylers": {
                    //         "visibility": "off"
                    //     }
                    // }, {
                    //     "featureType": "poilabel",
                    //     "elementType": "labels.icon",
                    //     "stylers": {
                    //         "visibility": "off"
                    //     }
                    // }, {
                    //     "featureType": "scenicspots",   景点
                    //     "elementType": "geometry",
                    //     "stylers": {
                    //         "color": "#071b4bff",
                    //         "visibility": "on"
                    //     }
                    // }, {
                    //     "featureType": "scenicspots",        景区
                    //     "elementType": "labels",
                    //     "stylers": {
                    //         "visibility": "on"
                    //     }
                    // }, {
                    //     "featureType": "scenicspots",
                    //     "elementType": "labels.text.fill",
                    //     "stylers": {
                    //         "color": "#b06077ff",
                    //         "visibility": "on"
                    //     }
                    // }, {
                    //     "featureType": "scenicspots",
                    //     "elementType": "labels.text.stroke",
                    //     "stylers": {
                    //         "weight": 1,
                    //         "color": "#2751b6ff",
                    //         "visibility": "on"
                    //     }
                    // },{
                    //     "featureType": "scenicspotslabel",
                    //     "elementType": "labels",
                    //     "stylers": {
                    //         "visibility": "off"
                    //     }
                    // },  {
                    //     "featureType": "scenicspotslabel",   风景区
                    //     "elementType": "labels.icon",
                    //     "stylers": {
                    //         "visibility": "off"
                    //     }
                    // }, {
                    //     "featureType": "scenicspotslabel",
                    //     "elementType": "labels.text.fill",
                    //     "stylers": {
                    //         "color": "#b06077ff",
                    //         "visibility": "on"
                    //     }
                    // },{
                    //     "featureType": "scenicspotslabel",
                    //     "elementType": "labels.text.stroke",
                    //     "stylers": {
                    //         "color": "#2751b6ff",
                    //         "visibility": "on",
                    //         "weight": 1
                    //     }
                    // },  {
                    //     "featureType": "transportationlabel",  交通 运输 交通运输
                    //     "elementType": "labels.text.fill",
                    //     "stylers": {
                    //         "color": "#b06077ff",
                    //         "visibility": "on"
                    //     }
                    // }, {
                    //     "featureType": "transportationlabel",
                    //     "elementType": "labels.icon",
                    //     "stylers": {
                    //         "visibility": "off"
                    //     }
                    // }, {
                    //     "featureType": "transportationlabel",
                    //     "elementType": "labels.text.stroke",
                    //     "stylers": {
                    //         "color": "#2751b6ff",
                    //         "visibility": "on",
                    //         "weight": 1
                    //     }
                    // }, {
                    //     "featureType": "airportlabel",       飞机场
                    //     "elementType": "labels.text.fill",
                    //     "stylers": {
                    //         "color": "#b06077ff",
                    //         "visibility": "on"
                    //     }
                    // }, {
                    //     "featureType": "airportlabel",
                    //     "elementType": "labels.icon",
                    //     "stylers": {
                    //         "visibility": "off"
                    //     }
                    // }, {
                    //     "featureType": "airportlabel",
                    //     "elementType": "labels.text.stroke",
                    //     "stylers": {
                    //         "color": "#2751b6ff",
                    //         "visibility": "on",
                    //         "weight": 1
                    //     }
                    // }, {
                    //     "featureType": "road",       道路 路 公路
                    //     "elementType": "geometry.fill",
                    //     "stylers": {
                    //         "color": "#18408aff",
                    //         "visibility": "on"
                    //     }
                    // }, {
                    //     "featureType": "road",
                    //     "elementType": "geometry.stroke",
                    //     "stylers": {
                    //         "color": "#001d62ff",
                    //         "visibility": "on"
                    //     }
                    // }, {
                    //     "featureType": "road",
                    //     "elementType": "geometry",
                    //     "stylers": {
                    //         "weight": 3
                    //     }
                    // },{
                    //     "featureType": "road",
                    //     "elementType": "labels.text.fill",
                    //     "stylers": {
                    //         "color": "#b06077ff",
                    //         "visibility": "on",
                    //         "weight": 90
                    //     }
                    // }, {
                    //     "featureType": "road",
                    //     "elementType": "labels.text.stroke",
                    //     "stylers": {
                    //         "color": "#2751b6ff",
                    //         "visibility": "on",
                    //         "weight": 1
                    //     }
                    // }, {
                    //     "featureType": "road",
                    //     "stylers": {
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "6"
                    //     }
                    // }, {
                    //     "featureType": "road",
                    //     "stylers": {
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "7"
                    //     }
                    // }, {
                    //     "featureType": "road",
                    //     "stylers": {
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "8"
                    //     }
                    // }, {
                    //     "featureType": "road",
                    //     "stylers": {
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "9"
                    //     }
                    // }, {
                    //     "featureType": "road",
                    //     "elementType": "geometry",
                    //     "stylers": {
                    //         "visibility": "off",
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "6"
                    //     }
                    // }, {
                    //     "featureType": "road",
                    //     "elementType": "geometry",
                    //     "stylers": {
                    //         "visibility": "off",
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "7"
                    //     }
                    // }, {
                    //     "featureType": "road",
                    //     "elementType": "geometry",
                    //     "stylers": {
                    //         "visibility": "off",
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "8"
                    //     }
                    // }, {
                    //     "featureType": "road",
                    //     "elementType": "geometry",
                    //     "stylers": {
                    //         "visibility": "off",
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "9"
                    //     }
                    // }, {
                    //     "featureType": "road",
                    //     "elementType": "labels",
                    //     "stylers": {
                    //         "visibility": "off",
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "6"
                    //     }
                    // }, {
                    //     "featureType": "road",
                    //     "elementType": "labels",
                    //     "stylers": {
                    //         "visibility": "off",
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "7"
                    //     }
                    // }, {
                    //     "featureType": "road",
                    //     "elementType": "labels",
                    //     "stylers": {
                    //         "visibility": "off",
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "8"
                    //     }
                    // }, {
                    //     "featureType": "road",
                    //     "elementType": "labels",
                    //     "stylers": {
                    //         "visibility": "off",
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "9"
                    //     }
                    // }, {
                    //     "featureType": "road",
                    //     "elementType": "labels.text",
                    //     "stylers": {
                    //         "fontsize": 24
                    //     }
                    // }, {
                    //     "featureType": "green",    绿地
                    //     "elementType": "geometry",
                    //     "stylers": {
                    //         "color": "#32b1beff",
                    //         "visibility": "on"
                    //     }
                    // }, 
                    // {
                    //     "featureType": "railway",  铁路
                    //     "elementType": "geometry",
                    //     "stylers": {
                    //         "visibility": "off"
                    //     }
                    // }, {
                    //     "featureType": "subway",    地铁
                    //     "elementType": "geometry",
                    //     "stylers": {
                    //         "visibility": "off"
                    //     }
                    // }, {
                    //     "featureType": "tertiarywaysign",   三级公路
                    //     "elementType": "labels",
                    //     "stylers": {
                    //         "visibility": "off"
                    //     }
                    // }, {
                    //     "featureType": "tertiarywaysign",
                    //     "elementType": "labels.icon",
                    //     "stylers": {
                    //         "visibility": "off"
                    //     }
                    // }, {
                    //     "featureType": "subwaylabel",    地铁标签
                    //     "elementType": "labels",
                    //     "stylers": {
                    //         "visibility": "off"
                    //     }
                    // }, {
                    //     "featureType": "subwaylabel",
                    //     "elementType": "labels.icon",
                    //     "stylers": {
                    //         "visibility": "off"
                    //     }
                    // }, {
                    //     "featureType": "shopping",     购物
                    //     "elementType": "geometry",
                    //     "stylers": {
                    //         "visibility": "off"
                    //     }
                    // },{
                    //     "featureType": "manmade",  
                    //     "elementType": "geometry",
                    //     "stylers": {
                    //         "visibility": "off"
                    //     }
                    // }, {
                    //     "featureType": "manmade",
                    //     "elementType": "labels",
                    //     "stylers": {
                    //         "visibility": "off"
                    //     }
                    // },{
                    //     "featureType": "highway",
                    //     "elementType": "labels.text.fill",
                    //     "stylers": {
                    //         "color": "#b06077ff",
                    //         "visibility": "on"
                    //     }
                    // },  {
                    //     "featureType": "highway",
                    //     "elementType": "labels.text.stroke",
                    //     "stylers": {
                    //         "color": "#2751b6ff",
                    //         "visibility": "on",
                    //         "weight": 1
                    //     }
                    // }, {
                    //     "featureType": "highway",
                    //     "elementType": "geometry.fill",
                    //     "stylers": {
                    //         "color": "#18408aff",
                    //         "visibility": "on"
                    //     }
                    // }, {
                    //     "featureType": "highway",
                    //     "elementType": "geometry.stroke",
                    //     "stylers": {
                    //         "color": "#1c4f7eff"
                    //     }
                    // }, {
                    //     "featureType": "highway",
                    //     "elementType": "geometry",
                    //     "stylers": {
                    //         "weight": 3
                    //     }
                    // }, {
                    //     "featureType": "highway",
                    //     "stylers": {
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "6"
                    //     }
                    // }, {
                    //     "featureType": "highway",
                    //     "stylers": {
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "7"
                    //     }
                    // }, {
                    //     "featureType": "highway",
                    //     "stylers": {
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "8"
                    //     }
                    // }, {
                    //     "featureType": "highway",
                    //     "stylers": {
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "9"
                    //     }
                    // }, {
                    //     "featureType": "highway",
                    //     "elementType": "geometry",
                    //     "stylers": {
                    //         "visibility": "off",
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "6"
                    //     }
                    // }, {
                    //     "featureType": "highway",
                    //     "elementType": "geometry",
                    //     "stylers": {
                    //         "visibility": "off",
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "7"
                    //     }
                    // }, {
                    //     "featureType": "highway",
                    //     "elementType": "geometry",
                    //     "stylers": {
                    //         "visibility": "off",
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "8"
                    //     }
                    // }, {
                    //     "featureType": "highway",
                    //     "elementType": "geometry",
                    //     "stylers": {
                    //         "visibility": "off",
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "9"
                    //     }
                    // }, {
                    //     "featureType": "highway",
                    //     "elementType": "labels",
                    //     "stylers": {
                    //         "visibility": "off",
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "6"
                    //     }
                    // }, {
                    //     "featureType": "highway",
                    //     "elementType": "labels",
                    //     "stylers": {
                    //         "visibility": "off",
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "7"
                    //     }
                    // }, {
                    //     "featureType": "highway",
                    //     "elementType": "labels",
                    //     "stylers": {
                    //         "visibility": "off",
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "8"
                    //     }
                    // }, {
                    //     "featureType": "highway",
                    //     "elementType": "labels",
                    //     "stylers": {
                    //         "visibility": "off",
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "9"
                    //     }
                    // }, {
                    //     "featureType": "highwaysign",    高速公路标志
                    //     "elementType": "labels",
                    //     "stylers": {
                    //         "visibility": "off"
                    //     }
                    // },{
                    //     "featureType": "highwaysign",
                    //     "elementType": "labels.icon",
                    //     "stylers": {
                    //         "visibility": "off"
                    //     }
                    // }, {
                    //     "featureType": "nationalway",
                    //     "elementType": "geometry.fill",
                    //     "stylers": {
                    //         "color": "#18408aff",
                    //         "visibility": "on"
                    //     }
                    // }, {
                    //     "featureType": "nationalway",
                    //     "elementType": "geometry.stroke",
                    //     "stylers": {
                    //         "color": "#1c4f7eff"
                    //     }
                    // }, {
                    //     "featureType": "nationalway",
                    //     "elementType": "labels.text.fill",
                    //     "stylers": {
                    //         "color": "#b06077ff",
                    //         "visibility": "on"
                    //     }
                    // }, {
                    //     "featureType": "nationalway",
                    //     "elementType": "labels.text.stroke",
                    //     "stylers": {
                    //         "color": "#2751b6ff",
                    //         "visibility": "on",
                    //         "weight": 1
                    //     }
                    // }, {
                    //     "featureType": "nationalway",
                    //     "elementType": "geometry",
                    //     "stylers": {
                    //         "weight": 3
                    //     }
                    // }, {
                    //     "featureType": "nationalway",
                    //     "stylers": {
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "6"
                    //     }
                    // }, {
                    //     "featureType": "nationalway",
                    //     "stylers": {
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "7"
                    //     }
                    // }, {
                    //     "featureType": "nationalway",
                    //     "stylers": {
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "8"
                    //     }
                    // }, {
                    //     "featureType": "nationalway",
                    //     "stylers": {
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "9"
                    //     }
                    // }, {
                    //     "featureType": "nationalway",
                    //     "elementType": "geometry",
                    //     "stylers": {
                    //         "visibility": "off",
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "6"
                    //     }
                    // }, {
                    //     "featureType": "nationalway",
                    //     "elementType": "geometry",
                    //     "stylers": {
                    //         "visibility": "off",
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "7"
                    //     }
                    // }, {
                    //     "featureType": "nationalway",
                    //     "elementType": "geometry",
                    //     "stylers": {
                    //         "visibility": "off",
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "8"
                    //     }
                    // }, {
                    //     "featureType": "nationalway",
                    //     "elementType": "geometry",
                    //     "stylers": {
                    //         "visibility": "off",
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "9"
                    //     }
                    // }, {
                    //     "featureType": "nationalway",
                    //     "elementType": "labels",
                    //     "stylers": {
                    //         "visibility": "off",
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "6"
                    //     }
                    // }, {
                    //     "featureType": "nationalway",
                    //     "elementType": "labels",
                    //     "stylers": {
                    //         "visibility": "off",
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "7"
                    //     }
                    // }, {
                    //     "featureType": "nationalway",
                    //     "elementType": "labels",
                    //     "stylers": {
                    //         "visibility": "off",
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "8"
                    //     }
                    // }, {
                    //     "featureType": "nationalway",
                    //     "elementType": "labels",
                    //     "stylers": {
                    //         "visibility": "off",
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "9"
                    //     }
                    // },  {
                    //     "featureType": "nationalwaysign",  国家路标志
                    //     "elementType": "labels",
                    //     "stylers": {
                    //         "visibility": "off"
                    //     }
                    // }, {
                    //     "featureType": "nationalwaysign",
                    //     "elementType": "labels.icon",        图标
                    //     "stylers": {
                    //         "visibility": "off"
                    //     }
                    // }, {
                    //     "featureType": "arterial",      干道
                    //     "elementType": "geometry.fill",
                    //     "stylers": {
                    //         "color": "#18408aff",
                    //         "visibility": "on"
                    //     }
                    // },{
                    //     "featureType": "arterial",
                    //     "elementType": "geometry.stroke",
                    //     "stylers": {
                    //         "color": "#001d62ff",
                    //         "visibility": "on"
                    //     }
                    // }, {
                    //     "featureType": "arterial",
                    //     "elementType": "labels.text.fill",
                    //     "stylers": {
                    //         "color": "#b06077ff",
                    //         "visibility": "on"
                    //     }
                    // }, {
                    //     "featureType": "arterial",
                    //     "elementType": "labels.text.stroke",
                    //     "stylers": {
                    //         "color": "#2751b6ff",
                    //         "visibility": "on",
                    //         "weight": 1
                    //     }
                    // }, {
                    //     "featureType": "arterial",
                    //     "elementType": "geometry",
                    //     "stylers": {
                    //         "weight": 3
                    //     }
                    // },  {
                    //     "featureType": "arterial",
                    //     "stylers": {
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "9,9",
                    //         "level": "9"
                    //     }
                    // }, {
                    //     "featureType": "arterial",
                    //     "elementType": "geometry",
                    //     "stylers": {
                    //         "visibility": "off",
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "9,9",
                    //         "level": "9"
                    //     }
                    // }, {
                    //     "featureType": "arterial",
                    //     "elementType": "labels",
                    //     "stylers": {
                    //         "visibility": "off",
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "9,9",
                    //         "level": "9"
                    //     }
                    // } {
                    //     "featureType": "tertiaryway",
                    //     "elementType": "geometry.fill",
                    //     "stylers": {
                    //         "color": "#18408aff",
                    //         "visibility": "on"
                    //     }
                    // }, {
                    //     "featureType": "fourlevelway",
                    //     "elementType": "geometry.fill",
                    //     "stylers": {
                    //         "color": "#18408aff",
                    //         "visibility": "on"
                    //     }
                    // }, {
                    //     "featureType": "local",
                    //     "elementType": "geometry.fill",
                    //     "stylers": {
                    //         "color": "#18408aff",
                    //         "visibility": "on"
                    //     }
                    // }, {
                    //     "featureType": "tertiaryway",
                    //     "elementType": "geometry.stroke",
                    //     "stylers": {
                    //         "color": "#001d62ff",
                    //         "visibility": "on"
                    //     }
                    // }, {
                    //     "featureType": "fourlevelway",
                    //     "elementType": "geometry.stroke",
                    //     "stylers": {
                    //         "color": "#001d62ff",
                    //         "visibility": "on"
                    //     }
                    // }, {
                    //     "featureType": "local",
                    //     "elementType": "geometry.stroke",
                    //     "stylers": {
                    //         "color": "#001d62ff",
                    //         "visibility": "on"
                    //     }
                    // }, {
                    //     "featureType": "local",
                    //     "elementType": "labels.text.fill",
                    //     "stylers": {
                    //         "color": "#b06077ff",
                    //         "visibility": "on"
                    //     }
                    // }, {
                    //     "featureType": "local",
                    //     "elementType": "labels.text.stroke",
                    //     "stylers": {
                    //         "color": "#2751b6ff",
                    //         "visibility": "on",
                    //         "weight": 1
                    //     }
                    // }, {
                    //     "featureType": "fourlevelway",
                    //     "elementType": "labels.text.fill",
                    //     "stylers": {
                    //         "color": "#b06077ff",
                    //         "visibility": "on"
                    //     }
                    // }, {
                    //     "featureType": "tertiaryway",
                    //     "elementType": "labels.text.fill",
                    //     "stylers": {
                    //         "color": "#b06077ff",
                    //         "visibility": "on"
                    //     }
                    // }, {
                    //     "featureType": "tertiaryway",
                    //     "elementType": "labels.text.stroke",
                    //     "stylers": {
                    //         "color": "#2751b6ff",
                    //         "visibility": "on",
                    //         "weight": 1
                    //     }
                    // }, {
                    //     "featureType": "fourlevelway",
                    //     "elementType": "labels.text.stroke",
                    //     "stylers": {
                    //         "color": "#2751b6ff",
                    //         "visibility": "on",
                    //         "weight": 1
                    //     }
                    // }, {
                    //     "featureType": "fourlevelway",
                    //     "elementType": "geometry",
                    //     "stylers": {
                    //         "weight": 1
                    //     }
                    // }, {
                    //     "featureType": "tertiaryway",
                    //     "elementType": "geometry",
                    //     "stylers": {
                    //         "weight": 1
                    //     }
                    // }, {
                    //     "featureType": "local",
                    //     "elementType": "geometry",
                    //     "stylers": {
                    //         "weight": 1
                    //     }
                    // },{
                    //     "featureType": "provincialway",
                    //     "elementType": "geometry.fill",
                    //     "stylers": {
                    //         "color": "#18408aff",
                    //         "visibility": "on"
                    //     }
                    // }, {
                    //     "featureType": "provincialway",
                    //     "elementType": "geometry.stroke",
                    //     "stylers": {
                    //         "color": "#001d62ff",
                    //         "visibility": "on"
                    //     }
                    // },  {
                    //     "featureType": "provincialway",
                    //     "elementType": "geometry",
                    //     "stylers": {
                    //         "weight": 3
                    //     }
                    // }, {
                    //     "featureType": "provincialway",
                    //     "elementType": "labels.text.fill",
                    //     "stylers": {
                    //         "color": "#b06077ff",
                    //         "visibility": "on"
                    //     }
                    // }, {
                    //     "featureType": "provincialway",
                    //     "elementType": "labels.text.stroke",
                    //     "stylers": {
                    //         "color": "#2751b6ff",
                    //         "visibility": "on",
                    //         "weight": 1
                    //     }
                    // }, {
                    //     "featureType": "provincialway",
                    //     "stylers": {
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "8,10",
                    //         "level": "8"
                    //     }
                    // }, {
                    //     "featureType": "provincialway",
                    //     "stylers": {
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "8,10",
                    //         "level": "9"
                    //     }
                    // }, {
                    //     "featureType": "provincialway",
                    //     "elementType": "geometry",
                    //     "stylers": {
                    //         "visibility": "off",
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "8,10",
                    //         "level": "8"
                    //     }
                    // }, {
                    //     "featureType": "provincialway",
                    //     "elementType": "geometry",
                    //     "stylers": {
                    //         "visibility": "off",
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "8,10",
                    //         "level": "9"
                    //     }
                    // }, {
                    //     "featureType": "provincialway",
                    //     "elementType": "labels",
                    //     "stylers": {
                    //         "visibility": "off",
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "8,10",
                    //         "level": "8"
                    //     }
                    // }, {
                    //     "featureType": "provincialway",
                    //     "elementType": "labels",
                    //     "stylers": {
                    //         "visibility": "off",
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "8,10",
                    //         "level": "9"
                    //     }
                    // },{
                    //     "featureType": "provincialwaysign",    省路标志
                    //     "elementType": "labels",
                    //     "stylers": {
                    //         "visibility": "off"
                    //     }
                    // }, {
                    //     "featureType": "provincialwaysign",
                    //     "elementType": "labels.icon",
                    //     "stylers": {
                    //         "visibility": "off"
                    //     }
                    // }, {
                    //     "featureType": "cityhighway",        城市高架桥
                    //     "elementType": "geometry.stroke",
                    //     "stylers": {
                    //         "color": "#001d62ff",
                    //         "visibility": "on"
                    //     }
                    // }, {
                    //     "featureType": "cityhighway",
                    //     "elementType": "geometry.fill",
                    //     "stylers": {
                    //         "color": "#18408aff",
                    //         "visibility": "on"
                    //     }
                    // }, {
                    //     "featureType": "cityhighway",
                    //     "elementType": "labels.text.fill",
                    //     "stylers": {
                    //         "color": "#b06077ff",
                    //         "visibility": "on"
                    //     }
                    // }, {
                    //     "featureType": "cityhighway",
                    //     "elementType": "labels.text.stroke",
                    //     "stylers": {
                    //         "color": "#2751b6ff",
                    //         "visibility": "on",
                    //         "weight": 1
                    //     }
                    // }, {
                    //     "featureType": "cityhighway",
                    //     "elementType": "geometry",
                    //     "stylers": {
                    //         "weight": 3
                    //     }
                    // },  {
                    //     "featureType": "cityhighway",
                    //     "stylers": {
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "6"
                    //     }
                    // }, {
                    //     "featureType": "cityhighway",
                    //     "stylers": {
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "7"
                    //     }
                    // }, {
                    //     "featureType": "cityhighway",
                    //     "stylers": {
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "8"
                    //     }
                    // }, {
                    //     "featureType": "cityhighway",
                    //     "stylers": {
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "9"
                    //     }
                    // }, {
                    //     "featureType": "cityhighway",
                    //     "elementType": "geometry",
                    //     "stylers": {
                    //         "visibility": "off",
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "6"
                    //     }
                    // }, {
                    //     "featureType": "cityhighway",
                    //     "elementType": "geometry",
                    //     "stylers": {
                    //         "visibility": "off",
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "7"
                    //     }
                    // }, {
                    //     "featureType": "cityhighway",
                    //     "elementType": "geometry",
                    //     "stylers": {
                    //         "visibility": "off",
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "8"
                    //     }
                    // }, {
                    //     "featureType": "cityhighway",
                    //     "elementType": "geometry",
                    //     "stylers": {
                    //         "visibility": "off",
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "9"
                    //     }
                    // }, {
                    //     "featureType": "cityhighway",
                    //     "elementType": "labels",
                    //     "stylers": {
                    //         "visibility": "off",
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "6"
                    //     }
                    // }, {
                    //     "featureType": "cityhighway",
                    //     "elementType": "labels",
                    //     "stylers": {
                    //         "visibility": "off",
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "7"
                    //     }
                    // }, {
                    //     "featureType": "cityhighway",
                    //     "elementType": "labels",
                    //     "stylers": {
                    //         "visibility": "off",
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "8"
                    //     }
                    // }, {
                    //     "featureType": "cityhighway",
                    //     "elementType": "labels",
                    //     "stylers": {
                    //         "visibility": "off",
                    //         "curZoomRegionId": "0",
                    //         "curZoomRegion": "6,9",
                    //         "level": "9"
                    //     }
                    // }



















// (function () {
//     require.config({
//         paths: {
//             echarts: "echarts",
//         },
//     });
//     require(
//         [
//             "echarts",
//             "echarts/chart/main",
//             "echarts/chart/map",    
//         ],
//         function (echarts, BMapExtension) {
//             var BMapExt = new BMapExtension($('#chart_map')[0], BMap, echarts,{
//                 enableMapClick: false
//             });

//             console.log(BMapExt);

//             var map = BMapExt.getMap();
//             var container = BMapExt.getEchartsContainer();
//             var startPoint = {
//                 x: 113.035981, //大润发
//                 y: 34.442236
//             };    
//             var point = new BMap.Point(startPoint.x, startPoint.y);
//             map.centerAndZoom(point, 15);
//             map.enableScrollWheelZoom(true);
//             // 地图自定义样式
//             map.setMapStyle({ 
//                 styleJson: [
//                     {
//                         'featureType': 'land',     //调整土地颜色
//                         'elementType': 'geometry',
//                         'stylers': {
//                                 'color': '#08304A'
//                                 // 'color': '#0C1F33'
//                                 // 'color': '#fff'
//                         }
//                     },
//                     {
//                                 'featureType': 'building',   //调整建筑物颜色
//                                 'elementType': 'geometry',
//                                 'stylers': {
//                                         'color': '#04406F'
//                                 }
//                     },
//                     {
//                                 'featureType': 'building',   //调整建筑物标签是否可视
//                                 'elementType': 'labels',
//                                 'stylers': {
//                                     'visibility': 'off'
//                                 }
//                     },
//                     {
//                                 'featureType': 'highway',     //调整高速道路颜色
//                                 'elementType': 'geometry',
//                                 'stylers': {
//                                     'color': '#015B99'
//                                 }
//                     },
//                     {
//                                 'featureType': 'highway',    //调整高速名字是否可视
//                                 'elementType': 'labels',
//                                 'stylers': {
//                                 'visibility': 'off'
//                                 }
//                     },
//                     {
//                                 'featureType': 'arterial',   //调整一些干道颜色
//                                 'elementType': 'geometry',
//                                 'stylers': {
//                                 'color':'#003051'
//                                 }
//                     },
//                     {
//                                 'featureType': 'arterial',
//                                 'elementType': 'labels',
//                                 'stylers': {
//                                 'visibility': 'off'
//                                 }
//                     },
//                     {
//                                 'featureType': 'green',
//                                 'elementType': 'geometry',
//                                 'stylers': {
//                                 'visibility': 'off'
//                                 }
//                     },
//                     {
//                                 'featureType': 'water',
//                                 'elementType': 'geometry',
//                                 'stylers': {
//                                         'color': '#044161'
//                                 }
//                     },
//                     {
//                                 'featureType': 'subway',    //调整地铁颜色
//                                 'elementType': 'geometry.stroke',
//                                 'stylers': {
//                                 'color': '#003051'
//                                 }
//                     },
//                     {
//                                 'featureType': 'subway',
//                                 'elementType': 'labels',
//                                 'stylers': {
//                                     'visibility': 'off'
//                                 }
//                     },
//                     {
//                                 'featureType': 'railway',
//                                 'elementType': 'geometry',
//                                 'stylers': {
//                                     'visibility': 'off'
//                                 }
//                     },
//                     {
//                                 'featureType': 'railway',
//                                 'elementType': 'labels',
//                                 'stylers': {
//                                     'visibility': 'off'
//                                 }
//                     },
//                     {
//                                 'featureType': 'all',     //调整所有的标签的边缘颜色
//                                 'elementType': 'labels.text.stroke',
//                                 'stylers': {
//                                         'color': '#313131'
//                                 }
//                     },
//                     {
//                                 'featureType': 'all',     //调整所有标签的填充颜色
//                                 'elementType': 'labels.text.fill',
//                                 'stylers': {
//                                         'color': '#FFFFFF'
//                                         // color:'#eee'
//                                 }
//                     },
//                     {
//                                 'featureType': 'manmade',   
//                                 'elementType': 'geometry',
//                                 'stylers': {
//                                     'visibility': 'off'
//                                 }
//                     },
//                     {
//                                 'featureType': 'manmade',
//                                 'elementType': 'labels',
//                                 'stylers': {
//                                     'visibility': 'off'
//                                 }
//                     },
//                     {
//                                 'featureType': 'local',
//                                 'elementType': 'geometry',
//                                 'stylers': {
//                                     'visibility': 'off'
//                                 }
//                     },
//                     {
//                                 'featureType': 'local',
//                                 'elementType': 'labels',
//                                 'stylers': {
//                                     'visibility': 'off'
//                                 }
//                     },
//                     {
//                                 'featureType': 'subway',
//                                 'elementType': 'geometry',
//                                 'stylers': {
//                                         'lightness': -65
//                                 }
//                     },
//                     {
//                                 'featureType': 'railway',
//                                 'elementType': 'all',
//                                 'stylers': {
//                                         'lightness': -40
//                                 }
//                     },
//                     {
//                                 'featureType': 'boundary',
//                                 'elementType': 'geometry',
//                                 'stylers': {
//                                         'color': '#8b8787',
//                                         'weight': '1',
//                                         'lightness': -29
//                                 }
//                     }
//                 ]
//             });

//             var geoCoordMap = {
//                 // '赛贝电子': [113.57368,34.818262],
//                 '裕达国贸': [113.62289,34.74693],
//                 '大润发': [113.035981,34.442236],
//                 '丹尼斯大卫城': [113.6657512693,34.7578361917],
//             };
//             var data = [
//                 // {name:'赛贝电子', value: 199},
//                 {name:'裕达国贸', value: 120},
//                 {name:'大润发', value: 152},
//                 {name:'丹尼斯大卫城', value: 130},
//             ];
//             var uploadedURL= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAvUlEQVRYR+2VsQ0CMQxFnzdhFxaBDSiv5Eq6u01ggxuEgtuAEqogS0SiQYrsIAvJrhP9pxfbEYJLgvNJgDTwnwYKXIGtwOqdIpOBAgV4AIPA7IHwANTcG7AXWCwgPQBqrgIoiAI1V0+AGnoEZoF7C8UvADR3FdhEAYzAFGHgAhwiekB3wS5iCp7vPTC1vPW3M54mPAkMnnC96wEYBXTkXJUAaSANWA3oT6fb7+yaQese8IZ+3jcZSIA00NPAC8f3QSEsVT0lAAAAAElFTkSuQmCC';
//             option = {
//                 // color: ['gold','aqua','lime'],
//                 // color:['#fff'],
//                 // title : {
//                 //     text: '',
//                 //     subtext: '',
//                 //     x:'center',
//                 //     textStyle : { color: '#fff', fontSize:20,  fontWeight:'bold' }
//                 // },
//                 // tooltip : {
//                 //     show: true,
//                 //     trigger:'item',
//                 //     hideDelay:4000,
//                 //     formatter:function(p){
//                 //         // console.log(p);
//                 //         let dataCon=p.data;
//                 //         let txtCon= dataCon.name + ':'+ '<br/>' 
//                 //             + '纬度：' + dataCon.name + '<br/>'
//                 //             + '经度：' + dataCon.name;
//                 //         return txtCon;
//                 //     }
//                 // },    //地图缩小时显示的startPoint(天河城)的坐标值
//                 color:['#fccb05'],
//                 series : [
//                     {
//                         type:'map',
//                         mapType: 'none',
//                         data:[],
//                         markPoint:{
//                             symbol:uploadedURL,
//                             // symbol:'circle',
//                             symbolSize:40,
//                             // symbolSize:function(v){
//                             //     return v/7
//                             // },
//                             itemStyle:{
//                                 normal:{
//                                     label:{
//                                         show:true,
//                                         position:'bottom',
//                                         formatter:'{b}',
//                                         textStyle:{
//                                             fontSize:30,
//                                             // color:'#FF6C00',
//                                             color:'#FFFF43',
//                                             // color:'#FFFF00',
//                                             // color:'#FFFF00',

//                                         }
//                                     },
//                                 },
//                                 emphasis: {
//                                     label:{  show: false,  }  
//                                 } 
//                             },
//                             data:data,
//                         },
//                         geoCoord:geoCoordMap
//                     },

//                 ]
//             };
//             var myChart = BMapExt.initECharts(container);
//             window.onresize = myChart.onresize;
//             BMapExt.setOption(option);
//             // document.oncontextmenu = function(){ return false; };
//             myChart.on('click', function (params) {
//                 // alert(1);
//                 // console.log(params);
//                 var event = params.event;
//                 var offsetX = event.offsetX;
//                 var offsetY = event.offsetY;
//                 console.log(offsetX);
//                 console.log(offsetY);
//                 $('#box').css("display",'block');       
//                 $('#box').css('left',(offsetX+5)+'px');    //offsetX  
//                 $('#box').css('top',(offsetY+5)+'px');     //offsetY
//             });
            

            
//         }
//     );
// }
// )();


