/**
 * @file 右边南丁格尔玫瑰图
 * @author sunwei
 */

define(
    function (require) {
        var d3 = require('d3');
        var d3Tip = require('d3-tip');
        function meigui(city) {
          // 定义svg中各元素的大小
            var width = 350;
            var height = 500;
            var radius = Math.min(width, height) / 2;
            var innerRadius = 0.2 * radius;

            var pie = d3.layout.pie()
                .sort(null)
                .value(function (d) {
                    return d.width;
                });
            // 设置浮层属性
            var tip = d3Tip()
              .attr('class', 'd3-tip')
              .offset([0, 0])
              .html(function (d) {
                  return d.data.label + ': <span style="color:yellow">' + d.data.averageAQI + '</span>';
              });
            // 设置内半径与外半径
            var arc = d3.svg.arc()
                .innerRadius(innerRadius)
                .outerRadius(function (d) {
                    if (d.data.averageAQI < 100) {
                        return (radius - innerRadius) * (d.data.averageAQI / 180.0) + innerRadius;
                    }
                    else if (d.data.averageAQI > 200) {
                        return (radius - innerRadius) * (d.data.averageAQI / 240.0) + innerRadius;
                    }

                    return (radius - innerRadius) * (d.data.averageAQI / 200.0) + innerRadius;

                });

            var outlineArc = d3.svg.arc()
                    .innerRadius(innerRadius)
                    .outerRadius(radius);
            // 开始添加svg
            var svg = d3.select('.meigui').append('svg')
                .attr('width', width)
                .attr('height', height)
                .append('g')
                .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

            svg.call(tip);

            var str = '';

            // 读取文件开始回执南丁格尔玫瑰图
            if (city === '北京') {
                str = 'data/beijing_meigui.csv';
            }
            else if (city === '上海') {
                str = 'data/shanghai_meigui.csv';
            }
            else {
                str = 'data/guangzhou_meigui.csv';
            }
            d3.csv(str, function (error, data) {

                data.forEach(function (d) {
                    d.id     =  d.id;
                    d.days  = +d.days;
                    d.color  =  d.color;
                    d.averageAQI = +d.averageAQI;
                    d.width  = +d.days;
                    d.label  =  d.label;

                });
              // for (var i = 0; i < data.score; i++) { console.log(data[i].id) }

                var path = svg.selectAll('.solidArc')
                .data(pie(data))
                .enter().append('path')
                .attr('fill', function (d) {
                    return d.data.color;
                })
                .attr('class', 'solidArc')
                .attr('stroke', 'gray')
                .attr('d', arc)
                .on('mouseover', tip.show)
                .on('mouseout', tip.hide);

                var outerPath = svg.selectAll('.outlineArc')
                .data(pie(data))
                .enter().append('path')
                .attr('fill', 'none')
                .attr('stroke', 'gray')
                .attr('class', 'outlineArc')
                .attr('d', outlineArc);


                // 计算score的过程
                var score = data.reduce(function (a, b) {

                    return a + (b.days * b.averageAQI);
                }, 0) /
                data.reduce(function (a, b) {
                    return a + b.days;
                }, 0);

                // 圆心的AQI平均值的计算过程
                svg.append('svg:text')
                .attr('class', 'aster-score')
                .attr('dy', '.35em')
                .attr('text-anchor', 'middle') // text-align: right
                .text(Math.round(score));

            });

                // 添加标题
            svg.append('text')
            .attr('class', 'title')
            .attr('x', -120)
            .attr('y', -200)
            .attr('text-anchor', 'top')
            .style('font-size', '16px')
            .style('text-decoration', 'underline')
            .text('' + city + '空气质量等级分析');
        }
        return {
            init: function (city) {
                $('.meigui').html('');
                meigui(city || '北京');
            }
        };
    }
);
