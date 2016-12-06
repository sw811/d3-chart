/**
 * @file 第二个页面
 * @author dengxiaohong
 */
define(
    function (require) {
        var d3 = require('../common/d3/d3');
        var $ = require('jquery');

        var top = require('./top');
        var left = require('./left');
        var right = require('./right');

        return {
            init: function () {

                top.init();
                left.init();
                right.init();
            }
        };
    }
);

