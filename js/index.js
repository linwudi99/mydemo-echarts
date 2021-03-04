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
  var myColor = ["#00f2f1", "#ed3f35"]
  var data = [
    [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
    [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
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
        stack: '总量',
        data: data[0],
        // 是否让线条圆滑显示
        smooth: true,
      },
      {
        name: '联盟广告',
        type: 'line',
        stack: '总量',
        data: data[1],
        smooth: true,
      }
    ]
  };
  myChart.setOption(option);
  window.addEventListener("resize", function () {
    myChart.resize();
  });
})();