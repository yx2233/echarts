$(function(){
    // 百度地图API功能
    var map = new BMap.Map("chart_map"); // 创建Map实例
    map.centerAndZoom(new BMap.Point(113.6657512693, 34.7578361917), 10); // 初始化地图,设置中心点坐标和地图级别
    map.setCurrentCity("赛贝电子"); // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放 
    map.setMapStyle({ 
                styleJson: [
                    {
                        'featureType': 'land',     
                        'elementType': 'geometry',
                        'stylers': {
                                'color': '#08304A'
                               
                        }
                    },
                    {
                        'featureType': 'building',   
                        'elementType': 'geometry',
                        'stylers': {
                                'color': '#04406F'
                        }
                    },
                    {
                                'featureType': 'building',   
                                'elementType': 'labels',
                                'stylers': {
                                    'visibility': 'off'
                                }
                    },
                    {
                                'featureType': 'highway',     
                                'elementType': 'geometry',
                                'stylers': {
                                    'color': '#015B99'
                                }
                    },
                    {
                                'featureType': 'highway',    
                                'elementType': 'labels',
                                'stylers': {
                                'visibility': 'off'
                                }
                    },
                    {
                                'featureType': 'arterial',   
                                'elementType': 'geometry',
                                'stylers': {
                                'color':'#003051'
                                }
                    },
                    {
                                'featureType': 'arterial',
                                'elementType': 'labels',
                                'stylers': {
                                'visibility': 'off'
                                }
                    },
                    {
                                'featureType': 'green',
                                'elementType': 'geometry',
                                'stylers': {
                                'visibility': 'off'
                                }
                    },
                    {
                                'featureType': 'water',
                                'elementType': 'geometry',
                                'stylers': {
                                        'color': '#044161'
                                }
                    },
                    {
                                'featureType': 'subway',    
                                'elementType': 'geometry.stroke',
                                'stylers': {
                                'color': '#003051'
                                }
                    },
                    {
                                'featureType': 'subway',
                                'elementType': 'labels',
                                'stylers': {
                                    'visibility': 'off'
                                }
                    },
                    {
                                'featureType': 'railway',
                                'elementType': 'geometry',
                                'stylers': {
                                    'visibility': 'off'
                                }
                    },
                    {
                                'featureType': 'railway',
                                'elementType': 'labels',
                                'stylers': {
                                    'visibility': 'off'
                                }
                    },
                    {
                                'featureType': 'all',     
                                'elementType': 'labels.text.stroke',
                                'stylers': {
                                        'color': '#313131'
                                }
                    },
                    {
                                'featureType': 'all',     
                                'elementType': 'labels.text.fill',
                                'stylers': {
                                       'color': '#FFFFFF',
                                }
                    },
                    {
                                'featureType': 'manmade',   
                                'elementType': 'geometry',
                                'stylers': {
                                    'visibility': 'off'
                                }
                    },
                    {
                                'featureType': 'manmade',
                                'elementType': 'labels',
                                'stylers': {
                                    'visibility': 'off'
                                }
                    },
                    {
                                'featureType': 'local',
                                'elementType': 'geometry',
                                'stylers': {
                                    'visibility': 'off'
                                }
                    },
                    {
                                'featureType': 'local',
                                'elementType': 'labels',
                                'stylers': {
                                    'visibility': 'off'
                                }
                    },
                    {
                                'featureType': 'subway',
                                'elementType': 'geometry',
                                'stylers': {
                                        'lightness': -65
                                }
                    },
                    {
                                'featureType': 'railway',
                                'elementType': 'all',
                                'stylers': {
                                        'lightness': -40
                                }
                    },
                    {
                                'featureType': 'boundary',
                                'elementType': 'geometry',
                                'stylers': {
                                        'color': '#8b8787',
                                        'weight': '1',
                                        'lightness': -29
                                }
                    }
                ]
            });
    createMakers(map);
});

function createMakers(map){
    var makers = [
        {pointX:113.62289,pointY:34.74693,status:'运行',sname:'裕达国贸'},   //裕达国贸
        {pointX:113.035981,pointY:34.442236,status:'异常',sname:'大润发'}, //大润发
        {pointX:113.6657512693,pointY:34.7578361917,status:'报警',sname:'丹尼斯大卫城'},   //丹尼斯大卫城
    ]
    for(var i in makers){
                var point = new BMap.Point(makers[i].pointX, makers[i].pointY);
                map.centerAndZoom(point, 10);
                var marker = new BMap.Marker(point);  // 创建标记
                map.addOverlay(marker);        // 将标注添加到地图中
                createTag(marker,makers[i]);    
    }
}

function createTag(marker,m){
    //标注
    var text = "<p style='text-align:center;'>" + m.sname + "</p><p>地址：" + 222
    + "</p><p>联系电话：" + 3333 + "</p>";

    //给标记添加点击事件以及显示窗口信息
     var info = new BMap.InfoWindow(text);
     marker.addEventListener("click", function () {
    	 this.openInfoWindow(info); 

     });   
}











