/**
 * @file 上边气泡图
 * @author zhangxuanjian
 */

define(
  function (require) {
    var d3 = require('../common/d3/d3');
    function fn() {

      //定义绘图区距包裹容器的边距
      var margin = {top: 20, right: 100, bottom: 20, left: 100},
          width = 1200 - margin.right,
          height = 450 - margin.top - margin.bottom;

      // 定义一些 值域缩放变化函数，使结点可以更好的展示在固定表栏中
      var xScale = d3.scale.linear().domain([1, 31]).range([0, width]),
          yScale = d3.scale.linear().domain([0, 200]).range([height, 0]),
          radiusScale = d3.scale.sqrt().domain([0, 100]).range([0,height/15]);

      // 定义 x/y 坐标轴
      var xAxis = d3.svg.axis().orient("bottom").scale(xScale).orient('bottom').ticks(31),
          yAxis = d3.svg.axis().scale(yScale).orient("left");

      // 添加 svg 容器
      var svg = d3.select("#chart").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // 添加 x 轴
      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      // 添加 y 轴.
      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);

      // 添加 x 轴 标签
      svg.append("text")
          .attr("class", "x label")
          .attr("text-anchor", "end")
          .attr("x", width)
          .attr("y", height - 6)
          .text("2014/12月");

      // 添加 y 轴 标签
      svg.append("text")
          .attr("class", "y label")
          .attr("text-anchor", "end")
          .attr("y", 6)
          .attr("dy", ".75em")
          .attr("transform", "rotate(-90)")
          .text("当日AQI指数");

      // 加载 数据 ，并绘制 数据结点
      d3.json("data/BJdata.json", function(datas) {

        // 添加 北京天气质量 节点数据
        var dot = svg.append("g")
              .attr("class", "dots")
              .selectAll(".dot")
              .data(datas)
              .enter()
              .append("circle")
              .attr("class", "dot")
              .style("fill", function(d) {
                return '#fc8d59'; //PM2.5含量，绿色越深，质量越好
              })
              .attr("cx", function(d,i) {
                return xScale(d[0]); //对应12月份的每一天
              })
              .attr("cy", function(d) {
                return yScale(d[1]); //AQI指数，数值越低，空气质量越高
              })
              .attr("r", function(d) {
                return radiusScale(d[7]);//SO2含量，半径约小，空气质量越好
              });

      // Add a title.
      dot.append("title")
          .text(function(d) {
            return "2014/12/"+d[0]+"\n北京空气质量等级："+d[8]+"\nAQI指数："+d[1]+"\nAQI排放："+d[2]+"\nPM2.5："+d[3]+"\nPM10："+d[4]+"\nCO："+d[5]+"\nNO2："+d[6]+"\nSO2："+d[7]+"";
        });
      });

    d3.json("data/SHdata.json", function(datas) {

        // 添加 上海天气质量 节点数据
        var dot = svg.append("g")
              .attr("class", "dots")
              .selectAll(".dot")
              .data(datas)
              .enter()
              .append("circle")
              .attr("class", "dot")
              .style("fill", function(d) {
                return '#99d594';
              })
              .attr("cx", function(d,i) {
                return xScale(d[0]); //对应12月份的每一天
              })
              .attr("cy", function(d) {
                return yScale(d[1]); //AQI指数，数值越低，空气质量越高
              })
              .attr("r", function(d) {
                return radiusScale(d[7]);//SO2含量，半径约小，空气质量越好
              });

      // Add a title.
      dot.append("title")
          .text(function(d) {
            return "2014/12/"+d[0]+"\n上海空气质量等级："+d[2]+"\nAQI指数："+d[1]+"\nPM2.5："+d[3]+"\nPM10："+d[4]+"\nCO："+d[5]+"\nNO2："+d[6]+"\nSO2："+d[7]+"";
        });
      });

    d3.json("data/GZdata.json", function(datas) {

        // 添加 广州天气质量 节点数据
        var dot = svg.append("g")
              .attr("class", "dots")
              .selectAll(".dot")
              .data(datas)
              .enter()
              .append("circle")
              .attr("class", "dot")
              .style("fill", function(d) {
                return '#3288bd';
              })
              .attr("cx", function(d,i) {
                return xScale(d[0]); //对应12月份的每一天
              })
              .attr("cy", function(d) {
                return yScale(d[1]); //AQI指数，数值越低，空气质量越高
              })
              .attr("r", function(d) {
                return radiusScale(d[7]);//SO2含量，半径约小，空气质量越好
              });

      // Add a title.
      dot.append("title")
          .text(function(d) {
            return "2014/12/"+d[0]+"\n广州空气质量等级："+d[2]+"\nAQI指数："+d[1]+"\nPM2.5："+d[3]+"\nPM10："+d[4]+"\nCO："+d[5]+"\nNO2："+d[6]+"\nSO2："+d[7]+"";
        });
      });

    }

    return {
        init: function () {
            fn();
        }
    };
  }
);
