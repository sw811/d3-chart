/**
 * @file 左边平行坐标图
 * @author lideqing
 */

define(
    function (require) {
        // var species = ["北京", "上海", "广州"],
        // traits = ["城市","日期", "AQI指数", "质量等级", "PM2.5", "PM10", "Co", "No2", "So2"];

        var margin = {
            top: 30,
            right: 10,
            bottom: 10,
            left: 10
        };
        var width = 600 - margin.right - margin.left;
        var height = 350 - margin.top - margin.bottom;

        var x = d3.scale.ordinal().rangePoints([0, width], 1);
        var y = {};

        var line = d3.svg.line();
        var axis = d3.svg.axis().orient('left');
        var background;
        var foreground;

        var svg = d3.select('.parallel').append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        d3.csv('data/yangfang.csv', function (error, airs) {

            // Extract the list of dimensions and create a scale for each.
            x.domain(dimensions = d3.keys(airs[0]).filter(function (d) {
                return d != 'name' && (y[d] = d3.scale.linear()
                    .domain(d3.extent(airs, function (p) {
                        return +p[d];
                    }))
                    .range([height, 0])
                );
        }));

        // Add grey background lines for context.
        background = svg.append('g')
            .attr('class', 'background')
            .selectAll('path')
            .data(airs)
            .enter().append('path')
            .attr('d', path);

        // Add blue foreground lines for focus.
        foreground = svg.append('g')
            .attr('class', 'foreground')
            .selectAll('path')
            .data(airs)
            .enter().append('path')
            .attr('d', path)
            .style('stroke', function (d) {
                if (d.name == 'bj') {
                    return '#fc8d59'; // beijing
                }
                else if (d.name == 'sh') {
                    return '#99d594'; // shanghai 淡蓝
                }
                else {
                    return '#3288bd';
                }
            });

        // Add a group element for each dimension.
        var g = svg.selectAll('.dimension')
            .data(dimensions)
            .enter().append('g')
            .attr('class', 'dimension')
            .attr('transform', function (d) {
                return 'translate(' + x(d) + ')';
            });

        // Add an axis and title.
        g.append('g')
            .attr('class', 'axis')
            .each(function (d) {
                d3.select(this).call(axis.scale(y[d]));
            })
            .append('text')
            .style('text-anchor', 'middle')
            .attr('y', -9)
            .text(function (d) {
                return d;
            });

        // Add and store a brush for each axis.
        g.append('g')
            .attr('class', 'brush')
            .each(function (d) {
                d3.select(this).call(y[d].brush = d3.svg.brush().y(y[d]).on('brush', brush));
            })
            .selectAll('rect')
            .attr('x', -8)
            .attr('width', 16);

            // console.log(airs);
        });

        // Returns the path for a given data point.
        function path(d) {
            return line(dimensions.map(function (p) {
                return [x(p), y[p](d[p])];
            }));
        }

        // Handles a brush event, toggling the display of foreground lines.
        function brush() {
            var actives = dimensions.filter(function (p) {
                return !y[p].brush.empty();
            });
            var extents = actives.map(function (p) {
                return y[p].brush.extent();
            });
            foreground.style('display', function (d) {
                return actives.every(function (p, i) {
                    return extents[i][0] <= d[p] && d[p] <= extents[i][1];
                }) ? null : 'none';
            });
        }
        return {
            init: function () {
                // ...
            }
        };
    }
);
