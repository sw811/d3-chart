/**
 * @file 右边饼图
 * @author zhangxuanjian
 */

define(
    function (require) {

        function fn() {
            // var args = [];

            var piedata =  (function(){
                var Bj = [55,25,56,33,42,82,74,78,267,185,39,41,64,108,108,33,94,186,57,22,39,94,99,31,42,154,234,160,134,52,46];

                var Sh = [91,65,83,109,106,117,106,89,53,80,117,99,95,116,108,134,79,71,97,84,87,104,87,168,65,39,39,93,188,174,187];

                var Gz = [32,83,73,22,40,57,62,53,76,91,83,62,69,79,108,75,58,63,89,76,76,83,94,101,144,112,82,55,81,107,149];

                //对 北京、上海、广州 优/良/污染天气 进行分类并计算其值
                function cases(arr){
                    var obj = {};

                    obj.better = 0; //空气质量优质天数
                    obj.good = 0;   //空气质量良好天数
                    obj.worse = 0;  //空气质量为污染天数

                    for(var i = 0, l = arr.length; i < l;i++){
                        var value = arr[i];
                        if(value < 50){
                            obj.better++;
                        }else if(value >= 50 && value < 100){
                            obj.good++;
                        }else{
                            obj.worse++
                        }
                    }
                    var sum = l;
                    return {
                        "better" : parseFloat(+(obj.better/sum).toFixed(1)),
                        "good" : parseFloat(+(obj.good/sum).toFixed(1)),
                        "worse" : parseFloat(+(obj.worse/sum).toFixed(1)),
                    }
                }
                // < 50、51－100、>101
                return {
                    bjcase : cases(Bj),
                    shcase : cases(Sh),
                    gzcase : cases(Gz)
                };
            })()


            //绘制北京天气质量图
            var pie1 = new PieChart('canvas-1',
                                    '天气质量统计图',
                                    [
                                        {
                                            id:"优",color:"#0289C3",percent:piedata.bjcase.better
                                        },
                                        {
                                            id:"良",color:"#76C0EF",percent:piedata.bjcase.good
                                        },
                                        {
                                            id:"污染天气",color:"#F09837",percent:piedata.bjcase.worse
                                        }
                                    ]);
            pie1.init();

            //绘制上海天气质量图
            var pie2 = new PieChart('canvas-2',
                                    '天气质量统计图',
                                    [
                                        {
                                            id:"优",color:"#0289C3",percent:piedata.shcase.better
                                        },
                                        {
                                            id:"良",color:"#76C0EF",percent:piedata.shcase.good
                                        },
                                        {
                                            id:"污染天气",color:"#F09837",percent:piedata.shcase.worse
                                        }
                                    ]);
            pie2.init();

            //绘制广州天气质量图
            var pie3 = new PieChart('canvas-3',
                                    '天气质量统计图',
                                    [
                                        {
                                            id:"优",color:"#0289C3",percent:piedata.gzcase.better
                                        },
                                        {
                                            id:"良",color:"#76C0EF",percent:piedata.gzcase.good
                                        },
                                        {
                                            id:"污染天气",color:"#F09837",percent:piedata.gzcase.worse
                                        }
                                    ]);
            pie3.init();

            //Tab 切换相关操作
            var cmd = document.getElementById('cmd');
            var aCmd = cmd.children;
            var aTab = document.getElementsByClassName('pie-tabs')[0].getElementsByTagName('div');

            //legend图例
            function drawLegend (arr) {
                for(var k = 0,al = arr.length; k < al; k++){
                    var ele = document.getElementById(arr[k]);
                    var html = '';
                    for(var j = 0,len = args[k].length;j < len;j++) {
                        html += "<li>";
                        html += "<i style='background:"+args[k][j].color+"'></i><span>"+args[k][j].id+"</span><label>:</label><em>"+(args[k][j].percent*100).toFixed(1)+"%</em>";
                        html += "</li>";
                    }
                    ele.innerHTML = html;
                }
            }
            drawLegend(['legend-1','legend-2','legend-3']);

            //点击切换Tab页
            cmd.addEventListener('click',function(event){
                for(var i = 0,l=aCmd.length; i < l;i++) {
                    aCmd[i].classList.remove('active');
                    aTab[i].style.display = 'none';
                }
                var k = parseInt(event.target.getAttribute('data-id'));
                aCmd[k].classList.add('active');
                aTab[k].style.display = 'block';
            },false);
        }


        return {
            init: function () {
                fn();
            }
        };
    }
);
