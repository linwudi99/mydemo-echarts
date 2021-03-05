// 获取当前时间
function getCurrentTime() {
  let date = new Date();
  let y = date.getFullYear();
  let M = date.getMonth() + 1; 
  let d = date.getDate();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  M = checkTime(M);
  d = checkTime(d);
  h = checkTime(h);
  m = checkTime(m);
  s = checkTime(s);
  // var week = "星期" + "日一二三四五六".charAt(date.getDay());
  
  let curTime = y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s;
  document.querySelector(".time").innerHTML = curTime
  
  setTimeout(getCurrentTime,1000)
}
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
getCurrentTime();

// 柱状图1
(function() {
  // 设置x轴数据
  var category = ['旅游行业', '教育培训', '游戏行业', '医疗行业', '社交行业', '电商行业', '金融行业']
  // 设置2019年和2020年数据
  var dataAll = [
    {
      year: "2019",
      data: [100, 200, 300, 900, 1500, 1200, 600]
    },
    {
      year: "2020",
      data: [400, 600, 600, 800, 1800, 1400, 700]
    }
  ];
  // 1.实例化对象
  var myChart = echarts.init(document.querySelector('.bar .chart'))
  // 2.指定配置项和数据
  var option = {
    color: ['#2f89cf'],
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '0%',
      right: '0%',
      top: '10px',
      bottom: '4%',
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      data: category,
      // 不显示刻度
      axisTick: {
        // alignWithLabel: true
        show: false
      },
      // 修改刻度标签样式
      axisLabel: {
        color: 'rgba(255,255,255,.6)',
        fontSize: '12px'
      },
      // 不显示坐标轴样式
      axisLine: {
        show: false
      }
    }],
    yAxis: [{
      type: 'value',
      // 修改刻度标签样式
      axisLabel: {
        color: 'rgba(255,255,255,.6)',
        fontSize: '12px'
      },
      // 修改坐标轴样式
      axisLine: {
        lineStyle: {
          color: "rgba(255,255,255,.3)",
          width: 2
        }
      },
      // y轴分割线样式
      splitLine: {
        lineStyle: {
          color: "rgba(255,255,255,.2)"
        }
      }
    }],
    series: [{
      name: '直接访问',
      type: 'bar',
      // 修改柱状图柱子宽度
      barWidth: '40%',      
      itemStyle: {
        // 修改柱子圆角
        barBorderRadius: 5,
      },    
      data: dataAll[0].data
    }]
  };
  // 3.把配置项给实例对象
  myChart.setOption(option);
  // 4.让图标跟随屏幕大小自适应
  window.addEventListener('resize',function(){
    myChart.resize();
  });

  // 2019和2020数据切换
  $(".bar h2 ").on("click", "a", function () {
    option.series[0].data = dataAll[$(this).index()].data;
    myChart.setOption(option);
  });
})();

// 柱状图2 
(function() {
  // 设置颜色数组，设置柱子颜色时用到
  var myColor = ['#1089e7','#f57474','#56d0e3','#f8b448','#8b78f6'];  
  // 柱子类名
  var titlename = ["HTML5", "CSS3", "javascript", "VUE", "NODE"];
  // 第一组柱子数据
  var barData = [70, 34, 60, 78, 69];
  // 右侧数据
  var valData = [702, 350, 610, 793, 664];
  var myChart = echarts.init(document.querySelector('.bar2 .chart'));
  var option = {
    grid: {
      top: '10%',
      left: '22%',
      bottom: '10%',
      // containLabel: true
    },
    // 不显示x轴相关信息
    xAxis: {
      show: false
    },
    // 不显示y轴线和刻度
    yAxis: [
      {        
        data: titlename,
        inverse: true,
        // 不显示刻度
        axisTick: {
          show: false
        },
        // 不显示分隔线
        splitLine: {
          show: false
        },
        // 不显示坐标轴样式
        axisLine: {
          show: false
        },
        // 刻度标签文字设为白色
        axisLabel: {
          color: '#fff',
        },
      },
      {       
        inverse: true,
        data: valData,
        // 不显示刻度
        axisTick: {
          show: false
        },
        // 不显示分隔线
        splitLine: {
          show: false
        },
        // 不显示坐标轴样式
        axisLine: {
          show: false
        },
        // 刻度标签文字设置
        axisLabel: {
          color: '#fff'
        },
      },
    ],
    series: [
      {
        name: '第一组柱子',
        type: 'bar',
        data: barData,
        // 柱子之间距离
        barCategoryGap: 50,
        // 柱子宽度
        barWidth: 10,
        yAxisIndex: 0,
        // 修改第一组柱子圆角和颜色
        itemStyle: {         
          barBorderRadius: 20,
          // 设置多个颜色，先定义一个颜色数组，通过以下方法设置
          color: function(params) {
            // params表示所有柱子对象，其中dataIndex是柱子索引号
            console.log(params)
            return myColor[params.dataIndex];
          }             
        },
        // 显示柱子内文字
        label: {
          show: true,
          position: 'inside',
          formatter: "{c}%", // {c}会自动解析data中数据
        }
      },
      {
        name: '第二组柱子',
        type: 'bar',
        barCategoryGap: 50,         
        barWidth: 15,
        yAxisIndex: 1,
        itemStyle: {
          color: 'none',
          borderColor: '#00c1de',
          borderWidth: 3,
          barBorderRadius: 15
        },
        data: [100, 100, 100, 100, 100]
      }
    ]
  };
  myChart.setOption(option);
  window.addEventListener("resize", function () {
    myChart.resize();
  });
})();

// 折线图1
(function() {
  var myColor = ["#00f2f1", "#ed3f35", "#FCED83"]
  var dataAll = [
    {
      year:'2020',
      data: [
        [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
        [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
        [50, 86, 99, 110, 129, 133, 189, 256, 338, 286, 223, 196]       
      ]
    },
    {
      year: '2021',
      data: [
        [30, 40, 120, 144, 180, 210, 210, 250, 187, 229, 238, 300],
        [50, 64, 200, 224, 290, 300, 310, 280, 210, 189, 174, 88],
        [50, 86, 181, 96, 220, 240, 258, 276, 293, 348, 296, 222]
      ]
    }
  ]
  var month = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
  var myChart = echarts.init(document.querySelector('.line .chart'))
  var option = {
    color: myColor,
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      // 修饰图例文字的颜色
      textStyle: {
        color: "#4c9bfd"
      }
      // 如果series 里面设置了name，此时图例组件的data可以省略
      // data: ["邮件营销", "联盟广告"]
    },
    grid: {
      top: "20%",
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
      show: true,
      borderColor: '#012f4a'
    },
    toolbox: {
      feature: {
        saveAsImage: {
          title:'下载',
          type:'png',
          connectedBackgroundColor:'#fff', // 保存的图片的背景色
        }
      }
    },
    xAxis: {
      type: 'category',
      // 去除轴内间距
      boundaryGap: false,
      data: month,
      // 去除刻度
      axisTick: {
        show: false
      },
      // 修饰刻度标签的颜色
      axisLabel: {
        color: "rgba(255,255,255,.7)"
      },
      // 去除x坐标轴的颜色
      axisLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      // 去除刻度
      axisTick: {
        show: false
      },
      // 修饰刻度标签的颜色
      axisLabel: {
        color: "rgba(255,255,255,.7)"
      },
      // 修改y轴分割线的颜色
      splitLine: {
        lineStyle: {
          color: "#012f4a"
        }
      }
    },
    series: [{
        name: '邮件营销',
        type: 'line',
        // stack: '总量',
        data: dataAll[0].data[0],
        // 是否让线条圆滑显示
        smooth: true,
      },
      {
        name: '联盟广告',
        type: 'line',
        // stack: '总量',
        data: dataAll[0].data[1],
        smooth: true,
      },
      {
        name: '搜索引擎',
        type: 'line',
        // stack: '总量',
        data: dataAll[0].data[2],
        smooth: true,
      },
    ]
  };
  myChart.setOption(option);
  window.addEventListener("resize", function () {
    myChart.resize();
  });
  // 2020,2021数据切换
  $(".line h2 ").on("click", "a", function () {
    option.series[0].data = dataAll[$(this).index()].data[0];
    option.series[1].data = dataAll[$(this).index()].data[1];
    option.series[2].data = dataAll[$(this).index()].data[2];
    myChart.setOption(option);
  });
})();

// 折线图2
(function () {
  var date = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"]
  var myChart = echarts.init(document.querySelector('.line2 .chart'))
  var option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: "#dddc6b"
        }
      }
    },
    legend: {
      top: "0%",
      textStyle:{
        color:'rgba(255,255,255,.5)'
      }
    },
    grid: {
      top:'20%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      // 去除轴内间距
      boundaryGap: false,
      // 去除刻度
      axisTick: {
        show: false
      },
      // 修饰刻度标签的颜色
      axisLabel: {
        color: "rgba(255,255,255,.6)"
      },
      // 去除x坐标轴的颜色
      axisLine: {
        show: false
      },
      data: date,
    },
    yAxis: [{
      type: 'value',
      axisTick: {
        show: false
      },
      axisLabel: {       
        color: "rgba(255,255,255,.6)",          
      },
      splitLine: {
        lineStyle: {
          color: "rgba(255,255,255,.1)"
        }
      }
    }],
    series: [{
        name: '播放量',
        type: 'line',
        smooth: true,
        lineStyle: {          
          color: "#0184d5",
          width: 2          
        },
        // 区域填充，设置渐变色
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0,0,0,1,
            [
              {
                offset: 0,
                color: "rgba(1, 132, 213, 0.4)" // 渐变的起始颜色
              },
              {
                offset: 0.8,
                color: "rgba(1, 132, 213, 0.1)" // 渐变的结束颜色
              }
            ],
            false
          ),
          shadowColor: "rgba(0, 0, 0, 0.1)"          
        },
        // 设置拐点小圆点
        symbol: "circle",
        // 拐点大小
        symbolSize: 10,
        // 开始不显示拐点，鼠标经过才显示
        showSymbol: false,
        // 设置拐点颜色和边框
        itemStyle:{
          color: '#0184d5',
          borderColor:'rgba(221,220,107,.1)',
          borderWidth:12
        },
        data: [30,40,30,40,30,40,30,70,20,40,20,40,30,40,30,40,30,40,30,60,20,40,20,40,30,60,20,40,20,40]
      },
      {
        name: '点赞量',
        type: 'line',
        smooth: true,
        lineStyle: {
          color: "#00d887",
          width: 2
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0,0,0,1,
            [
              {
                offset: 0,
                color: "rgba(0, 216, 135, 0.4)"
              },
              {
                offset: 0.8,
                color: "rgba(0, 216, 135, 0.1)"
              }
            ],
            false
          ),
          shadowColor: "rgba(0, 0, 0, 0.1)"
        },
        symbol: "circle",
        symbolSize: 10,
        showSymbol: false,
        itemStyle: {
          color: '#00d887',
          borderColor: 'rgba(221,220,107,.1)',
          borderWidth: 12
        },
        // emphasis: {
        //   focus: 'series'
        // },
        data: [50,30,50,60,10,50,30,50,60,30,40,70,58,30,50,60,10,50,30,70,20,50,10,40,50,30,70,20,50,10,40]
      }
    ]
  };
  myChart.setOption(option);
  window.addEventListener("resize", function () {
    myChart.resize();
  });
})();

// 饼图1
(function () {
  var myChart = echarts.init(document.querySelector('.pie .chart'))
  var option = {
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)",
      position: function (p) {
        //其中p为当前鼠标的位置
        return [p[0] + 10, p[1] - 10];
      }
    },
    legend: {
      bottom: "0%",
      // 设置小图标宽高
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: "12"
      }
    },
    series: [{ 
      name:'年龄分布',     
      type: 'pie',
      // 内圆、外圆半径
      radius: ['40%', '60%'],
      // 饼图位置
      center:['50%','40%'],      
      itemStyle: {
        borderRadius: 5,
      },
      // 不显示标签文字
      label: {
        show: false
      },
      // 不显示连接图形和标签的线
      labelLine: {
        show: false
      },
      data: [
        {value: 1,name: "0岁以下"},
        {value: 4,name: "20-29岁"},
        {value: 2,name: "30-39岁"},
        {value: 2,name: "40-49岁"},
        {value: 1,name: "50岁以上"}
      ]
    }]
  };
  myChart.setOption(option);
  window.addEventListener("resize", function () {
    myChart.resize();
  });
})();

// 饼图2
(function () {
  var myChart = echarts.init(document.querySelector('.pie2 .chart'))
  var option = {
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)",
      position: function (p) {
        //其中p为当前鼠标的位置
        return [p[0] + 10, p[1] - 10];
      }
    },
    legend: {
      top:'0%',
      // 设置小图标宽高
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: "rgba(255,255,255,.6)",
        fontSize: "12"
      }
    },
    series: [{
      name: '面积模式',
      type: 'pie',
      radius: [10, 60],
      center: ['50%', '55%'],
      roseType: 'radius',
      label:{
        fontSize:10,
        color: 'rgba(255,255,255,.6)'
      },
      // 图形和标签的连接线
      labelLine:{
        length: 6, // 连接图形的线
        length2: 8 // 连接标签的线
      },
      data: [{
          value: 40,
          name: '北京'
        },
        {
          value: 38,
          name: '上海'
        },
        {
          value: 32,
          name: '江苏'
        },
        {
          value: 30,
          name: '安徽'
        },
        {
          value: 28,
          name: '河南'
        },
        {
          value: 26,
          name: '四川'
        },
        {
          value: 22,
          name: '福建'
        },
        {
          value: 18,
          name: '云南'
        }
      ]
    }]
  };
  myChart.setOption(option);
  window.addEventListener("resize", function () {
    myChart.resize();
  });
})();