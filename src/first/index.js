/**
 * @file 第一个页面
 * @author dengxiaohong
 */

define(
    function (require) {

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

