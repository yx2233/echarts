$(function(){
    $.ajax({       
        url:'http://dev.cnsbdz.com:8080/analysisbalance/datalist2',
        dataType:'json',
        success:function(data){
            // console.log(data);   
            echart_7(data);       //三相平衡
        },
        error:function(error){
            // console.log("失败"+error);
        }
    })  
    $.ajax({    
        url:'http://dev.cnsbdz.com:8080/data/daylist',
        dataType:'json',
        success:(data)=>{
            // console.log(data);
            var arrsdata1 = data.arrsdata1;                 //日电量表格数据,今日用电,昨日用电,用电趋势
            var arrsdata2 = data.arrsdata2;                 //横轴日期
            var doubledata = data.doubledata;               //昨日负荷
            var doubledata1 = data.doubledata1;             //今日负荷
            // console.log(arrsdata2);
            // console.log("昨日负荷"+doubledata);
            // console.log("今日负荷"+doubledata1);
            var doubledata2 = data.doubledata2;             //今日电量
            var doubledata3 = data.doubledata3;             //今日电量
            var today = data.mapdata.today;                 //今日日期
            var yesterday = data.mapdata.yesterday;         //昨日日期
            // var dayload = data.mapdata.dayload;
            // console.log(dayload);
            var max_w_today = data.mapdata.max_w_today;          //今日最大负荷
            var time_today = data.mapdata.time_today;            //发生时间
            var max_w_yesterday = data.mapdata.max_w_yesterday;  //昨日最大负荷
            var time_yesterday = data.mapdata.time_yesterday;    //发生时间

            // console.log(max_w_today);
            // console.log(time_today);

            var html=[];
html= "<tr>"+                  //title='今日最大负荷'  title='发生时间'   
    "<td><img src='img/today.png' alt='今日最大负荷' title='发生时间' style='width:20px;height:20px;margin-left:15px;'></td>"+
    "<td>"+max_w_today +"</td>"+
    "<td><img src='img/time.png' alt='发生时间' title='发生时间'  style='width:20px;height:23px;margin-left:30px;'></td>"+
    "<td>"+time_today +"</td>"+
"</tr>";
html+="<tr>"+
    "<td><img src='img/yesterday.png' alt='昨日最大负荷' title='昨日最大负荷' style='width:20px;height:20px;margin-left:15px;'></td>"+
    "<td>"+max_w_yesterday +"</td>"+
    "<td><img src='img/time.png' alt='发生时间' title='发生时间' style='width:20px;height:20px;margin-left:30px;'></td>"+
    "<td>"+time_yesterday +"</td>"+
"</tr>";
            $('#tabletest').append(html);

            var html1=[];
            html1="<tr>"+
                        "<td><img src='img/today.png' alt='今日用电' title='今日用电' style='width:20px;height:20px;'></td>"+
                        "<td><img src='img/yesterday.png' alt='昨日用电' title='昨日用电' style='width:20px;height:20px;'></td>"+
                        "<td><img src='img/ydqushi.png' alt='用电趋势' title='用电趋势' style='width:20px;height:20px;'></td>"+
                    "</tr>"+
                    "<tr>"+
                        "<td>"+arrsdata1[0]+"</td>"+
                        "<td>"+arrsdata1[1]+"</td>"+
                        "<td>"+arrsdata1[2]+"</td>"
                    "</tr>"
            $('#tabledianliang').append(html1);
            
            // console.log(html);

            // 将2017-08-07 变为2018-8-7
            var today = today.replace(/-0/g,"-");
            var yesterday = yesterday.replace(/-0/g,"-");

            echart_1(arrsdata2,doubledata,doubledata1,today,yesterday);    //日负荷折线图
            echart_3(arrsdata2,doubledata2,doubledata3,today,yesterday);   //日电量柱状图
        },
        error:function(error){
            // console.log("失败"+error);
        }
    })
    $.ajax({
        url:'http://dev.cnsbdz.com:8080/data/mylist',
        dataType:'json',
        success:(res)=>{
            // console.log(res);
            //分时电量   
            var data= res.data;      // 尖峰平谷数据
            var sum_e_month = res.mapdata.sum_e_month ;            // 本月总用电量
            var sum_e_lastmonth = res.mapdata.sum_e_lastmonth ;    // 上月总用电量
            var trend_m_sume = res.mapdata.trend_m_sume ;          // 用电趋势
            // console.log(data);
            
            var data2= res.data2;    // 功率因数
            var data1= res.data1;    // 三相温度
            // console.log(data1);
            var arrsdata = res.arrsdata;
            var doubledata= res.doubledata;      // 前六个月最大需量
            var doubledata1= res.doubledata1;    // 前六个月平均需量
            // console.log(arrsdata);
            // console.log(doubledata);
            // console.log(doubledata1);

            // 负荷率数据
            var year_load_rate  = res.mapdata.year_load_rate  ;    // 年负荷率
            var month_load_rate = res.mapdata.month_load_rate ;    // 月负荷率
            var day_load_rate = res.mapdata.day_load_rate ;        // 月负荷率

            var max_w_month = res.mapdata.max_w_month ;            // 本月最大需量  最大需量的表格
            var max_w_year = res.mapdata.max_w_year ;              // 本年最大需量
            // console.log(max_w_month);
            // console.log(max_w_year);

            echart_load(day_load_rate,month_load_rate,year_load_rate);      //负荷率
            echart_4(data);      //分时电量
            echart_2(data2);     //功率因数
            echart_6(arrsdata,doubledata,doubledata1);     //最大需量
            echart_5(data1);     //三相温度
            var html3=[];
            html3= "<tr>"+
                    "<td><img src='img/current.png' alt='本月用电量' title='本月用电量' style='width:20px;height:20px;'></td>"+
                    "<td><img src='img/last.png' alt='上月用电量' title='上月用电量' style='width:20px;height:20px;'></td>"+
                    "<td><img src='img/ydqushi.png' alt='用电趋势' title='用电趋势' style='width:20px;height:20px;'></td>"+
                    "</tr>"+
                "<tr>"+
                        "<td>"+sum_e_month+"</td>"+
                        "<td>"+sum_e_lastmonth+"</td>"+
                        "<td>"+trend_m_sume+"</td>"+
                "</tr>"
            ;
            $('#tableSum').append(html3);
                    
            var html2=[];
            html2=
            "<tr>"+
                    "<td><img src='img/month.png' alt='本月最大负荷' title='本月最大负荷' style='width:25px;height:25px;'></td>"+
                    "<td><img src='img/year.png' alt='本年最大负荷' title='本年最大负荷' style='width:25px;height:25px;'></td>"+     
            "</tr>"+       
            "<tr>"+
                    "<td>"+month_load_rate+'%'+"</td>"+                         
                    "<td>"+year_load_rate+'%'+"</td>"
            "</tr>";
            $('#tableLoad').append(html2);   
            
            var html3=[];
            html3=
                "<tr>"+     //本月最大需量
                    "<td><img src='img/month.png' alt='本月最大需量' title='本月最大需量' style='width:25px;height:25px;'></td>"+
                    "<td><img src='img/year.png' alt='本年最大需量' title='本年最大需量' style='width:25px;height:25px;'></td>"+
                    "</tr>"+
                "<tr>"+    //本年最大需量
                    "<td>"+max_w_month+"</td>"+                     
                    "<td>"+max_w_year+"</td>"+
                "</tr>"
            $('#tableXuliang').append(html3);
        }
    })
})


    //三相温度
    function echart_5(data1){
        // console.log(data1);
        var myChart=echarts.init(document.getElementById('chart_5'));
        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {  type: 'shadow' }  // 坐标轴指示器，坐标轴触发有效  坐标轴指示器，坐标轴触发有效
            },
            grid: {
                left: '2%',
                right: '8%',
                bottom: '2%',
                top:'16%',
                containLabel: true
            },
            legend: {
                data: ['A相温度', 'B相温度','C相温度'],
                right: 10,
                top:17,
                textStyle: {  color: "#fff"  },
                itemWidth: 25,
                itemHeight: 10,
                // itemGap: 25
            },
            xAxis: {
                name:'(时)',
                type: 'category',
                data: ["00-06","06-12","12-18","18-24"],
                axisLine: {  lineStyle: { color: '#fff'}  },
                axisLabel: {  textStyle: {  color:'#fff', fontFamily: 'Microsoft YaHei' }  },
            },
            yAxis: {
                name:'℃',
                type: 'value',
                max:'50',
                axisLine: {  lineStyle: { color: '#fff'}  },
                splitLine: {
                    show: true,
                    lineStyle: {  color: 'rgba(255,255,255,0.2)' }
                },
            },
            series: [
                    {
                    name: 'A相温度',
                    type: 'bar',     //条形图
                    barWidth: '15%',     
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#fccb05'
                            }, {
                                offset: 1,
                                color: '#f5804d'
                            }]),
                            barBorderRadius: 12,
                        },
                    },
                    data: [31, 32, 34, 36]
                    
                },
                {
                    name: 'B相温度',
                    type: 'bar',
                    barWidth: '15%',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#8bd46e'
                            }, {
                                offset: 1,
                                color: '#09bcb7'
                            }]),
                            barBorderRadius: 11,
                        }
                    },
                    data: [25, 35, 25, 28]
                },
                {
                    name: 'C相温度',
                    type: 'bar',
                    barWidth: '15%',
                    itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#248ff7'
                        }, {
                            offset: 1,
                            color: '#6851f1'
                        }]),
                    barBorderRadius: 11,
                    }
                    },
                    data: [26, 34, 38, 30]
                }]
        };
        var app = {
            currentIndex: -1,
        };
        setInterval(function () {
            var dataLen = option.series[0].data.length; 
            // 取消之前高亮的图形
            myChart.dispatchAction({
                type: 'downplay',        
                seriesIndex: 0,
                dataIndex: app.currentIndex
            });
            app.currentIndex = (app.currentIndex + 1) % dataLen;
            // 高亮当前图形
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: app.currentIndex,
            });
            // 显示 tooltip
            myChart.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: app.currentIndex
            });
        }, 5000);
        myChart.setOption(option);
    }


    //最大需量
    function echart_6(arrsdata,doubledata,doubledata1){
        // console.log(arrsdata);
        // console.log(doubledata);    // 前六个月最大需量
        // console.log(doubledata1);   // 前六个月平均需量
        var arr=[];
        for(var i=0;i<arrsdata.length;i++){
            var arrItem={month:arrsdata[i],value:doubledata[i],ratio:doubledata1[i]};
            arr.push(arrItem);
        }
        // console.log(arr);
        
        var myChart=echarts.init(document.getElementById('chart_6')); 
        let data = {
            "chart": arr
        //     [{
        //         month: "1月",
        //         value: 138,
        //         ratio: 14.89
        //     },
        //     {
        //         month: "2月",
        //         value: 138,
        //         ratio: 79.49
        //     },
    
        //     {
        //         month: "3月",
        //         value: 138,
        //         ratio: 75.8
        //     },
    
        //     {
        //         month: "4月",
        //         value: 138,
        //         ratio: 19.8
        //     },
    
        //     {
        //         month: "5月",
        //         value: 138,
        //         ratio: 44.5
        //     },
    
    
        //     {
        //         month: "6月",
        //         value: 328,
        //         ratio: 87.3
        //     }
    
        // ]
        }
        
        let xAxisMonth = [],   //日期
            barData = [],      //三角形
            lineData = [];     //折线
        for (let i = 0; i < data.chart.length; i++) {
            xAxisMonth.push(data.chart[i].month);
            barData.push({
                "name": xAxisMonth[i],
                "value": data.chart[i].value
            });
            lineData.push({
                "name": xAxisMonth[i],
                "value": data.chart[i].ratio
            });
        }
        
        option = {
            // backgroundColor: "#020d22",
            title: '',
            grid: {
                top: '15%',
                left: '2%',
                right:'5%',
                bottom: 0,
                right:'3',
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'none'
                },
                formatter: function(params) {
                    // console.log(params);
                    return params[0]["data"].name + "<br/>" + 
                    '最大需量: ' + params[1]["data"].value + "<br/>" + 
                    '平均负荷: ' + params[0]["data"].value;
                }
            },
            xAxis: [
                {
                    type: 'category',
                    show: false,
                    data: ['3月', '4月', '5月', '6月', '7月', '8月'],
                    axisLabel: {
                        interval:0 ,
                        textStyle: {
                            color: '#b6b5ab',
                        }
                    }
                },
                {
                    type: 'category',
                    position: "bottom",
                    data: xAxisMonth,
                    textStyle:{
                        fontSize:10,
                    },
                    boundaryGap: true,
                    axisTick: {
                        show: true,
                        lineStyle:{ color:'#fff' }
                    },
                    axisLine: {
                        show: true,
                        lineStyle:{
                            color:'#fff'
                        }
                    },
                    axisLabel: {
                        interval:0,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                }
        
            ],
            yAxis: [{
                show: true,
                offset: 0,
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: "rgba(255,255,255,0.2)"
                    }
                },
                axisTick: {
                    show: true
                },
                axisLine: {
                    show: true,
                    lineStyle:{
                        color:'#fff'
                    }
                },
                axisLabel: {
                    show: true,
                    color: '#fff'
                }
            }, {
                show: false,
                type: "value",
                name: "合格率(%)",
                nameTextStyle: {
                    color: '#ccc'
                },
                axisLabel: {
                    color: '#ccc'
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            }],
            color: ['#e54035'],
            series: [{
                    name: '装机容量',
                    type: 'pictorialBar',
                    xAxisIndex: 1,
                    barCategoryGap: '-80%',
                    // barCategoryGap: '-5%',
                    symbol: 'path://d="M150 50 L130 130 L170 130  Z"',
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                let colorList = [
                                    'rgba(13,177,205,0.8)', 'rgba(29,103,182,0.6)',
                                    'rgba(13,177,205,0.8)', 'rgba(29,103,182,0.6)',
                                    'rgba(13,177,205,0.8)', 'rgba(29,103,182,0.6)'
                                ];
                                return colorList[params.dataIndex];
                            }
                        },
                        emphasis: {
                            opacity: 1
                        }
                    },
                    data: barData,
                },
                {
                    symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAvCAYAAABzJ5OsAAAGDUlEQVRogbWaPWxcRRDHf/fO92Ffgk2MrXygBEJACCiQkCgQcoPSIAVXoYCKFBRIKegpQJHSBokehIgoiBBFrEiAQuEKgoQiPiIQEIRANnFI7ODYvvP5fBQ74zdvb/e9y9keafV27+3Hf2ZnZmf2XYlulx2kClAFVqS9V57LO7mIUmmb4H2wO90/l7YLfru0LWYGAd8A1oF2dM4wFS1UB8oFc3sLbV/yMbD9kF1cd6EDNPtbuBh8BUiAVmacP09+21+kqN0XDSL5UuQZ+w2y4LqRp18fwalPVIWGckBWvIE+yJJXz2PKAg3VtV0y9TbOBgYCnwSA+4ATD7zPSAj8pgFui+1XokDqrlOx2oQkbIEnpsQYUICb5rkZ+C2kUnWp9xixL/kKbqu0Ywh44pWy97SMPQ78A9w2ADsGfEf6bRqwm/KbqlHTMJAhX/INUleVB7xsypCpPwncBO6QlbyCfQyYkz6dQMnbhULw2Xdx4EOmPCiLLRtGtK8u3hVwG15pm7plwNqFZaAsfYC4wYY8iwVeMeUO7nBpSFsZ0HEKXMG3cafoOnAMuAEsBDBYVQqS9SiNAAMxqU8CR3G6OIzzyS8DM8B9wMPAi8DzwCjwEHAROCnrjMi4FeB+w7Rv+BYLGKn74Ne9jpYBX+qTOCkq8HEB+ouA7QA/AX8BYzJmBjgF7DEMNHH6XyVVw5DnslSX+YI6H5K4gq4CNbISfwd4Hxe7q4dQr6WeZEOE0wLWgNPA18Cn0j6M80i/Sz+1Aav/yFM1ZCXvkFJGfJVRJurA2x7IESMZH3wLJ+khATkNXJL3i2S9loJWDFbC69KHEt2uH1P7qlI2gI+JhEZw278fp7Mdaasuqxoo+LYAX5N17uK807LU7wKr8r5Ferpa9+mHEwzJQr6+W10Lucgq8BZwXvo0BHxjCg6/Ac895YyWFqx/AVffhW9uOAkjoNoilBeAT2TeI8BvZFXXlzy43W0mIomiAEwZmDcMPC3jEplseAqOnIOTChygBtUT8Ox5eIV0Z4bdKxrAa6QqM0q+sWYoyXvpTXKY7A58Rurra0DtLJyouV3poQMwftoxXMP1qeJs4XtS9bxJ2FVaPCDhS0Ka4cc6an0f2Z24gjlpp+DgWHwuAI7DE2ZMWcCfM4CXcoD3UEzyscGx8Lc0FgmeLHXDYfQlD/CeAgxK5YTwnUroSP6B1OI/Bm6Zdnepj7yzFI7nIeBJIhgypMYWIj/LOYQzqC7wAc7oEiSwmoW5ecdQlL6Ea/QGYl8FGOorN02QozaHAS0jwIQsOIPb1iGcx2kBrTPweSt1uxm6DnPvwVXpq4FZGzhLNqL8L4cB+1snoTfV8iWuWz0vE6vkTgHP4NSlCazNwp9vwoUf4Q+dYAmWL8KVl5yq6UG0Jq+Pk4bFe4ED5BxKhurgJGd1VWMTO1CP6n9xJ+EIqdSmgcuYUGAWrs/C3+SfsGsyZp+Zaz9O7fpRoQrQ1MCsTjb102KzJQ3KxmWBhpRDpL69n9hmlTREWJGiO9I0zKhd6M6rcLeoKDCzybKfCWnGdAv4ELiAixSbEfDrMt/rAvYMaSyjgP10sAewJfXzvpvzt82CXyQb3t4GvsPlp9pnSfotSn0Jl3FtAI8C35JKegJ4hGwYHFIZrW8lTbEcNi+L0gjzKE5aa0h4gDO6j6RcJk1SpoFXSb1My5QJYXKBXumHdmDrMsyCt7e/NrrUE9Hqv2ZTkzjjrJLGOf3msJM4r+TreCgJj0g4BR+L64tuDypeu5/bg3Gc3i9wb7cHUfC973qZiN3bPAAcBH41fWxsMopTj2uGiXu9t6mRvakOgq+TJguD3piN4/z2z4QNfzNQt8At6B5dzwOvurtqgPsMWFvY7bvKKPV7P18KPEPhbSwDsmBit8Qh16ifeoLfrIoOKT15bdhgSS9KLWD/6YP36yEp+7cFQSqSfOh6OQ9k6LcYsCLQhTToBzUfXFG7KNGw7dA3sAiI/sHXSCPE7ByD00CSUyq6PbDUQm6qAgD6yYDyjLNC70VvIW3nO2zRx+Rdp536fB/9bhShHWF8t/574P/bY1d26X/PtooMr/p/9AAAAABJRU5ErkJggg==',
                    symbolSize: 42,
                    name: "最大需量",
                    type: "line",
                    yAxisIndex: 1,
                    data: lineData,
                    itemStyle: {
                        normal: {
                            borderWidth: 5,
                            color: {
                                colorStops: [{
                                        offset: 0,
                                        color: '#821eff'
                                    },
        
                                    {
                                        offset: 1,
                                        color: '#204fff'
                                    }
                                ],
                            }
                        }
                    }
                }
            ]
        }
        myChart.setOption(option);
    }


    //分时电量
    function echart_4(data){
        // console.log(data);
        var myChart = echarts.init(document.getElementById('chart_4'));   
        var arr1=[];  //日期
        var arr2=[];  //尖电量
        var arr3=[];  //峰电量
        var arr4=[];  //平电量  
        var arr5=[];  //谷电量
        for(var i=0;i<data.length;i++){   
            arr1.push(data[i].date);         //日期
            arr2.push(data[i].fesharp);      //尖
            arr3.push(data[i].fepeak);       //峰
            arr4.push(data[i].feflat);       //平
            arr5.push(data[i].fevalley);     //谷       
        }
        // console.log( arr1 );  
        var idx=0;
        var arr_sub1=[];
        var arr_sub2=[];
        var arr_sub3=[];
        var arr_sub4=[];
        var arr_sub5=[];
        for(var i=0;i<5;i++){     //一次显示5个
            arr_sub1.push(arr1[i]);
            arr_sub2.push(arr2[i]);     
            arr_sub3.push(arr3[i]);
            arr_sub4.push(arr4[i]);
            arr_sub5.push(arr5[i]);
            idx=i;
        }
        // console.log(arr_sub1);
        // console.log(arr_sub2);
        // console.log(arr_sub3);
        // console.log(arr_sub4);
        // console.log(arr_sub5);
        option = {
            grid: {
                top: '15%',
                left: '13%',
                right: '8%',
                bottom: '15%',
                containLabel: false
            },
            tooltip: {
                trigger: 'axis',
            },
            color:["#37b70c", "#fae521", "#f29c00", "#dd3f36"],
            legend:{
                top:20,
                right:10,
                textStyle:{  fontSize: 13, color:'#fff' },
                data:["尖电量", "峰电量", "平电量", "谷电量"],
                itemGap:10,     //间隙
                itemWidth:20,   
                itemHeight:12   
            },
            xAxis:[{
                name:'(天)',
                type:'category',
                axisPointer: {type: 'shadow'}, // 坐标轴指示器，坐标轴触发有效
                axisTick:{ show:true },         // alignWithLabel:false
                data:arr_sub1,
                // data:['08-04','08-05','08-06','08-07'],
                axisLine:{ lineStyle:{ color:'#fff' }  },  //x轴的颜色
                splitLine:{ show:false, lineStyle:{  color:'rgba(255,255,255,.1)' } },   //分割线与y轴平行的线
                axisLabel:{ color:"#fff", fontSize:18 },
            }],
            yAxis:[{
                type:'value',
                name:'单位(kwh)',
                axisLine:{ lineStyle:{  color:'#fff' } },
                splitLine:{ show:false, lineStyle:{  color:'rgba(255,255,255,.1)' } },
                axisLabel:{ color:"#fff", fontSize:18  },
            }],
            series:[
                {
                    data: arr_sub2,
                    // data: [5, 2, 5, 7],
                    name:'尖电量',
                    stack:'one',
                    type:'bar',
                    barWidth: '26%',
                    
                },
                {
                    data: arr_sub3,
                    // data: [2, 5, 7, 5],
                    name: "峰电量",
                    stack: "one",
                    type: "bar",
                    barWidth: '26%',  
                },
                {
                    data: arr_sub4,
                    // data: [5, 7, 5, 6],
                    name: "平电量",
                    stack: "one",
                    type: "bar",
                    barWidth: '26%',  
                },
                {   
                    data:arr_sub5,
                    // data: [7, 5, 6, 5],
                    name: "谷电量",
                    stack: "one",
                    type: "bar",
                    barWidth: '26%', 
                    itemStyle:{ 
                        barBorderRadius:2   
                    }  
                }
            ]
        };
        myChart.setOption(option);
        setInterval(function(){
            idx++;
            if(idx>=data.length){
                idx=0;    //数据循环完，从第一个数据开始循环。
            }       
                arr_sub1.shift();
                arr_sub1.push(arr1[idx]);
                arr_sub2.shift();
                arr_sub2.push(arr2[idx]);
                arr_sub3.shift();
                arr_sub3.push(arr3[idx]);
                arr_sub4.shift();
                arr_sub4.push(arr4[idx]);
                arr_sub5.shift();
                arr_sub5.push(arr5[idx]);   
            myChart.setOption({
                xAxis: {
                    data:arr_sub1,
                },  
                series: [
                    {
                        data: arr_sub2,
                    },{
                        data: arr_sub3
                    },{
                        data: arr_sub4
                    },{
                        data: arr_sub5
                    }
                ]
            });	
        }, 5000)

    } 
    
    // echart_power();  功率因数
    function echart_2(data2){
        // console.log(data2);
        var arr6=[];
        for(var i=0;i<data2.length;i++){
            arr6.push(data2[i].fcosa.toFixed(3));
            arr6.push(data2[i].fcosb.toFixed(3));
            arr6.push(data2[i].fcosc.toFixed(3));
            arr6.push(data2[i].fcos.toFixed(3));
        }
        // console.log(arr6);
        var index=0;
        var arr_sub=[];
        for(var i=0;i<4;i++){
            arr_sub.push(arr6[4*index+i]);   
        }           
        var myChart= echarts.init(document.getElementById("chart_power"));
        // var data = [0.713, 0.325, 0.664, 0.756];
        // var data = [data2[0].fcosa, data2[0].fcosb, data2[0].fcosc, data2[0].fcos]
        var titlename = ['A相', 'B相', 'C相', '合相'];
        var valdata = [1.0, 1.0, 1.0, 1.0];
        var arr=[];
        for(var i=0;i<valdata.length;i++){
            arr.push( valdata[i].toFixed(1));
        }       
        // console.log(arr);        
        var myColor = ['#F8B448','#56D0E3', '#F57474', '#1089E7', ];
        // var myColor = ['#1089E7', '#F57474', '#56D0E3', '#F8B448'];
        option = {
            title: {
                textStyle: {  color: '#FFF'  },
                left: '6%',
                top: '10%'
            },
            //图标位置
            grid: { top: '10%',  left: '15%' },
            xAxis: { show: false },
            yAxis: [
            {
                show: true,
                data: titlename,
                inverse: true,
                axisLine: {  show: false  },
                splitLine: { show: false },
                axisTick: {  show: false },
                axisLabel: {
                    color: '#fff',
                    rich: {
                        lg: {
                            backgroundColor: '#339911',
                            color: '#fff',
                            borderRadius: 15,
                            align: 'center',
                            width: 15,
                            height: 15
                        },
                    }
                },
            }, {
                show: true,
                inverse: true,
                data: arr,
                axisLabel: {  textStyle: { fontSize: 12, color: '#fff', }  },
                axisLine: {   show: false  },
                splitLine: { show: false },
                axisTick: { show: false },
            }],
            series: [
                {
                name: '条',
                type: 'bar',
                yAxisIndex: 0,
                // data: [0.713, 0.325, 0.664, 0.756],
                data: arr_sub,
                barWidth: 10,
                itemStyle: {
                    normal: {
                        barBorderRadius: 20,
                        color: function(params) {
                            var num = myColor.length;
                            return myColor[params.dataIndex % num]
                        },
                    }
                },
                label: {
                    normal: {
                        show: true,
                        position: 'inside',
                        formatter: '{c}'
                    }
                },
            }, {
                name: '框',
                type: 'bar',
                yAxisIndex: 1,
                barGap: '-100%',
                data: [1.0, 1.0, 1.0, 1.0],
                barWidth: 15,
                itemStyle: {
                    normal: {
                        color: 'none',
                        borderColor: '#00c1de',
                        borderWidth: 3,
                        barBorderRadius: 15,
                    }
                }
            }, ]
        };      
        myChart.setOption(option);

        setInterval(function(){
            index++;
            if(index>=data2.length){
                index=0;
            }
            // console.log(data2.length);
            for(var i=0;i<4;i++){
                arr_sub.shift();
                arr_sub.push(arr6[4*index+i]);   
            }
            // arr_sub.push(data2[index]);
            // console.log(arr_sub);
            // console.log(index);
            myChart.setOption({
                series: [{
                    data: arr_sub
                }]
            })
        },5000)
    }

    


    //年月日负荷率表　　year_load_rate,month_load_rate,day_load_rate
    function echart_load(day_load_rate,month_load_rate,year_load_rate){
        // console.log(year_load_rate);
        // console.log(month_load_rate);
        // console.log(day_load_rate);
        var value1= day_load_rate/100;
        var value2= month_load_rate/100;
        var value3= year_load_rate/100;
        var data1 = [value1,value1,value1,value1];
        var data2 = [value2,value2,value2,value2];
        var data3 = [value3,value3,value3,value3];
        
        var bgColor = '#E3F7FF';
        var containers = document.getElementsByClassName('chart_load');
        var options = [
            {
                series: [{
                    type: 'liquidFill',
                    data:data1,
                    // data:[0.7,0.6,0.5,0.4],
                    radius: '70%',
                    // phase: 0,
                    // period: 5000,
                    outline: {  show: false },
                    label: { normal: { formatter: (value1 * 100) .toFixed(1) + '%', } }
                }]
            }, 
            {
                series: [{
                    type: 'liquidFill',
                    // data: [0.2614, {
                    //     value: 0.5,
                    //     direction: 'left'
                    // }, 0.4, {
                    //     value: 0.3,
                    //     direction: 'left'
                    // }],
                    data:data2,
                    radius: '70%',
                    outline: {  show: false },
                    label: {  normal: { formatter: (value2 * 100) .toFixed(1) + '%',  }  }
                }]
            }, 
            {
                series: [{
                    type: 'liquidFill',
                    // data: [0.6, 0.5, {
                    //     value: 0.4,
                    //     amplitude: 15
                    // }, {
                    //     value: 0.3,
                    //     amplitude: 20,
                    //     waveLength: 100
                    // }],
                    data:data3,
                    radius: '70%',
                    amplitude: 10,
                    outline: { show: false },
                    label: { normal: {  formatter: (value3 * 100) .toFixed(1) + '%'  } }
                }]
            }, 
        
        ];
        
        // console.log(options);
        var charts = [];
        for (var i = 0; i < options.length; ++i) {
            var chart = echarts.init(containers[i]);

            if (i > 0) {
                options[i].series[0].silent = true;
            }
            chart.setOption(options[i]);
            chart.setOption({
                baseOption: options[i],
                media: [{
                    query: { maxWidth: 300 },
                    option: {
                        series: [{ label: {  fontSize: 26  }  }]
                    }
                }]
            });
            // console.log(chart);
            charts.push(chart);
        }

        window.onresize = function () {
            for (var i = 0; i < charts.length; ++i) {
                charts[i].resize();
            }
        };
    } 
           
    //三相平衡
    function echart_7(data){
        // console.log(data);
        var myChart=echarts.init(document.getElementById('chart_7')); 
        var arr=[];
        for(var i=0;i<data.length;i++){
            var arrItem={};
            arrItem.name = data[i].cdevname;
            arrItem.sales= data[i].unbalancefi;
            arrItem.services= data[i].unbalancefu;
            arr.push(arrItem);  
        }
        // console.log(arr);
        var sourceData =arr;
        // var sourceData = [
        //     {
        //         name:"智能组合式电气火灾探测器1#",
        //         sales: 0.39,
        //         services: 0.5
        //     }, {
        //         name: "智能组合式电气火灾探测器2#",
        //         sales: 0.39,
        //         services: 0.21
        //     }, {
        //         name: "智能组合式电气火灾探测器3#",
        //         sales: 100,
        //         services: 0.03
        //     }, {
        //         name: "智能组合式电气火灾探测器4#",
        //         sales: 1.75,
        //         services: 0.28
        //     }, {
        //         name: "智能组合式电气火灾探测器5#",
        //         sales: 100,
        //         services: 0.28
        //     }
        // ]
        var seriesData = sourceData.map(function(item, index, array) {
            return {
                name: item['name'],
                value: [item['sales'], item['services']]
            }
        })
        var computeServicesAvgLine = function() {
            let sum = 0
            sourceData.forEach(function(item) {
                sum += item['services']
            })
            return sum / sourceData.length
        }          
        var computeSalesAvgLine = function() {
            let sum = 0
            sourceData.forEach(function(item) {
                sum += item['sales']
            })
            return sum / sourceData.length
        }
        var avg = {
            servicesAvgLine: computeServicesAvgLine(),
            salesAvgLine: computeSalesAvgLine()
        }
            option = {
                grid: {
                    left: '1%',
                    top:'26%',
                    right: '9%',
                    bottom: '8%',
                    containLabel: true
                },
                tooltip: {
                    trigger: 'item',
                    axisPointer: {
                        show: true,
                        type: 'cross',
                        lineStyle: {
                            type: 'dashed',
                            width: 1
                        }
                    },
                    formatter: function(obj) {
                        // console.log(obj);
                        if (obj.componentType == "series") {
                            return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' +
                                obj.name +
                                '</div>' +
                                '<span>' +
                                '电流不平衡' +
                                '</span>' +
                                ' : ' + obj.data.value[0] + '%' +
                                '<br/>' +
                                '<span>' +
                                '电压不平衡' +
                                '</span>' +
                                ' : ' + obj.data.value[1] + '%'
                        }
                    }
                },
                label: {
                    normal: {
                        show: true,
                        position: 'bottom',
                        formatter: function(params) {
                            return params.name
                        }
                    },
                    emphasis: {
                        show: true,
                        position: 'bottom',
                    }
                },
                xAxis: {
                    name: '电流',
                    type: 'value',
                    scale: true,
                    axisLabel: {
                        color:'#fff',
                        formatter: '{value}'
                    },
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#3259B8'
                        }
                    }
                },
                yAxis: {
                    name: '电压',
                    type: 'value',
                    scale: true,
                    axisLabel: {
                        color:'#fff',
                        formatter: '{value}'
                    },
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#3259B8'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        dataZoom: {}
                    }
                },
                visualMap: {
                    min: 0,
                    max: 800,
                    dimension: 0,
                    left: '45%',
                    top: '-10%',
                    text: ['高', '低'], // 文本，默认为数值文本
                    calculable: true,
                    itemWidth: 18,
                    itemHeight: 160,
                    textStyle: {
                        color: '#fff',
                        height: 56,
                        fontSize: 11,
                        lineHeight: 60,
                    },
                    inRange: {
                        color: ['#7AB7F7', '#b45ef7']
                    },
                    padding: [50, 20],
                    orient: 'horizontal',
                },
                series: [{
                    type: 'scatter',
                    data: seriesData,
                    symbolSize: 20,
                    markLine: {
                        label: {
                            normal: {
                                formatter: function(params) {
                                    if (params.dataIndex == 0) {
                                        return params.value + "A";
                                    } else if (params.dataIndex == 1) {
                                        return params.value + "U";
                                    }
                                    return params.value;
                                }
                            }
                        },
                    lineStyle: {
                        normal: {
                            color: "#626c91",
                            type: 'solid',
                            width: 1,
                        },
                        emphasis: {
                            color: "#d9def7"
                        }
                    },
                    data: [{
                        xAxis: avg.salesAvgLine,
                        name: '电流平均线',
                        itemStyle: {
                            normal: {
                                color: "#b84a58",
                            }
                        }
                    }, {
                        yAxis: avg.servicesAvgLine,
                        name: '电压平均线',
                        itemStyle: {
                            normal: {
                                color: "#b84a58",
                            }
                        }
                    }]
                },
                    markArea: {
                        silent: true,
                        data: [
                            [{
                                name: '异常',
                                itemStyle: {
                                    normal: {
                                        color: 'transparent'
                                    },
                                },
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'insideTopLeft',
                                        fontStyle: 'normal',
                                        color: "#409EFF",
                                        fontSize: 20,
                                    }
                                },
                                coord: [avg.salesAvgLine, avg.servicesAvgLine],
                            }, {
                                coord: [Number.MAX_VALUE, 0],
                            }],
                            [{
                                name: '安全',
                                itemStyle: {
                                    normal: {
                                        color: 'transparent',
                                    },
                                },
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'insideTopRight',
                                        fontStyle: 'normal',
                                        color: "#409EFF",
                                        fontSize: 20,
                                    }
                                },
                                coord: [0, 0],
                            }, {
                                coord: [avg.salesAvgLine, avg.servicesAvgLine],
                            }],
                            [{
                                name: '危险',
                                itemStyle: {
                                    normal: {
                                        color: 'transparent',
                                    },
                                },
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'insideBottomLeft',
                                        fontStyle: 'normal',
                                        color: "#409EFF",
                                        fontSize: 20,
                                    }
                                },
                                coord: [avg.salesAvgLine, avg.servicesAvgLine],
                            }, {
                                coord: [Number.MAX_VALUE, Number.MAX_VALUE],
                            }],
                            [{
                                name: '异常',
                                itemStyle: {
                                    normal: {
                                        color: 'transparent',
                                    },
                                },
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'insideBottomRight',
                                        fontStyle: 'normal',
                                        color: "#409EFF",
                                        fontSize: 20,
                                    }
                                },
                                coord: [0, Number.MAX_VALUE],
                            }, {
                                coord: [avg.salesAvgLine, avg.servicesAvgLine],
                            }],
                    ]
                    }
                }]
            };
            myChart.setOption(option);
        
        
        
        
        
    
    }
        
    //echart_1 日负荷折线图
    function echart_1(arrsdata2,doubledata,doubledata1,today,yesterday) {
        // console.log(doubledata);
        // console.log(doubledata1);
        console.log(arrsdata2);
        // console.log(today);
        // console.log(yesterday);
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart_1'));
        option = {
            title: {
                text: ''
            },
            tooltip: {    // 提示信息
                trigger: 'axis'
            },
            legend: {   // 说明
                data:[yesterday,today],
                // data:[today,yesterday],
                textStyle:{
                    color: '#fff',
                    fontSize:15
                },
                top: '8%'
            },
            grid: {
                top: '25%',
                left: '2%',
                right: '5%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                name: 'h',
                type: 'category',
                boundaryGap: false,    //分界线
                // data: ['00','01','02','03','04','05','06','07','08','09','10','12','13','14','15','16','17','18','19','20','21','22','23'],
                data:arrsdata2,
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color:'#fff'
                        // color: 'rgba(255,255,255,.2)'  //x轴颜色
                    }
                },
                axisLabel:{    //x轴上文字的颜色
                    color:'#fff',
                    fontSize:15,
                    interval:2
                    // color:'rgba(255,255,255,.7)'
                }       
            },
            yAxis: {
                name: '单位(kw)',
                type: 'value',
                splitLine: {
                    show: false  //分割线
                },
                axisLine: {  //y轴颜色
                    lineStyle: {
                        color:'#fff'  
                    }
                },
                axisLabel:{    //y轴上文字的颜色
                    color:'#fff',
                    fontSize:15
                }
            },
            series: [
            {
                    name:yesterday,
                    type:'line',
                    smooth:true,
                    symbol:'circle',
                    symbolSize:2,
                    showSymbol:false,
                    lineStyle:{
                        normal:{
                            width:1
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                // color: 'rgba(152, 192, 133, 0.7)'
                                //color: 'rgba(140, 184, 223, 1)',
                                color: 'rgba(226, 247, 250, 0.5)',
                            }, {
                                offset: 0.8,
                                //color: 'rgba(152, 192, 133, 0.6)'
                                //color: 'rgba(140, 184, 223, 0.9)',
                                color: 'rgba(226, 247, 250, 0.4)',
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                            shadowBlur: 15
                        }
                    },
                    itemStyle: {
                        normal: {
                            //color: 'rgb(152, 192, 133 )',
                            //color: 'rgb(140, 184, 223 )',
                            color: 'rgb(226, 247, 250 )',
                            // borderColor: 'rgba(152, 192, 133, 0.7)',
                            // borderColor: 'rgba(140, 184, 223, 0.1)',
                            borderColor: 'rgba(226, 247, 250, 0.1)',
                            borderWidth: 12
            
                        }
                    },
                    // data:[243 , 245 , 248 , 449 , 424 , 496 , 490 , 496 , 243 , 243 , 243 , 243 , 243  , 
                    //     243 , 233 , 224 , 211 , 243 , 254 , 236 , 253 , 223 , 263 ,]
                    data:doubledata
                },
                {
                    name:today,
                    type:'line',
                    smooth:true,
                    symbol:'circle',
                    symbolSize:2,
                    showSymbol:false,
                    lineStyle:{
                        normal:{
                            width:1
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, 
                                [{ 
                                    offset: 0,
                                    color: 'rgba(255, 108, 0, 1)'   //填充物颜色
                                    //color: 'rgba(255, 255, 0, 1)'   //填充物颜色
                                }, {
                                    offset: 0.8,
                                    color: 'rgba(255, 108, 0, 0.9)'
                                    //color: 'rgba(255, 255, 0, 1)'
                                }],
                                false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 15
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgba(255, 108, 0)',     //线条颜色
                            //color: 'rgba(255, 255, 0 )',     //线条颜色
                            borderColor: 'rgba(255, 108, 0,1)',
                            //borderColor: 'rgba(255, 255, 0 )',
                            borderWidth: 12
                        }
                    },
                    // data:[391, 423, 413, 433, 304,396, 423, 483, 363, 404,391, 333, 
                    //     343, 433.01, 354.47,391, 423, 413, 433.01,304,396, 423, 483]
                    data:doubledata1
                },
                
                
            ]
        };
        myChart.setOption(option);
    }
        
    //echart_3日电量柱状图
    function echart_3(arrsdata2,doubledata2,doubledata3,today,yesterday) {
        // console.log(doubledata3);
        var myChart = echarts.init(document.getElementById('chart_3'));
        option = {
            grid: {
                top: '25%',
                left: '10%',
                right: '10%',
                bottom: '15%',
                containLabel: false
            },
            legend: {
                top:20,
                textStyle:{
                    fontSize: 18,
                    color:'rgba(255,255,255)'
                },
                data:[yesterday,today],
                // data:[today,yesterday],
            },
            xAxis: [
                {   
                    name:'(时)',
                    type: 'category',
                    axisLine:{
                        lineStyle:{  color:'#fff' }
                    },
                    splitLine:{
                        show:false,
                        lineStyle:{  color:'rgba(255,255,255,.1)'  }
                    },
                    axisLabel:{
                        color:"#fff",
                        fontSize: 18,
                        interval:2
                    },
                    // data: ['00','01','02','03','04','05','06','07','08','09','10','12','13','14','15','16','17','18','19','20','21','22','23'],
                    data:arrsdata2,
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            ],
            yAxis: [
                {
                    name: '单位(kWh)',
                    type: 'value',
                    min: 0,
                    // max: 250,
                    // interval: 70,
                    axisLine:{
                        lineStyle:{  color:'#fff'  }
                    },
                    splitLine:{
                        show:false,
                        lineStyle:{  color:'rgba(255,255,255,.01)'  }
                    },
                    axisLabel: {
                        formatter: '{value}',
                        fontSize: 18,
                    }
                }
            ],
            series: [
                {
                    name:yesterday,
                    // name:today,
                    type:'bar',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#b266ff'},
                                    {offset: 1, color: '#00a0e9'}
                                ]
                            )
                        }
                    },
                    // data:[2.0,  4.9,  7.0,  23.2,  25.6,  76.7,  135.6, 162.2, 32.6, 20.0, 6.4,  3.3,
                    //     23.2, 25.6, 76.7,2.0, 4.9, 7.0,162.2, 32.6,76.7, 135.6, 162.2 ]
                    data:doubledata2
                },
                {
                    name:today,
                    type:'bar',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#00f0ff'},
                                    {offset: 1, color: '#fff799'}
                                ]
                            )
                        }
                    },
                    // data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,
                    //     7.0, 23.2, 25.6, 7.0, 23.2, 25.6, 76.7,32.6, 20.0, 6.4,76.7]
                    data:doubledata3
                }       
            ]
        };
        myChart.setOption(option);
    }
    
        


