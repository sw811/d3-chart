// /*
//     canvas 实现的 饼图可视化
// */

function PieChart(drawBoard_id,title,data,configure){
    /*
        @param {string} drawBoard_id canvas元素id名 'canvas'
        @param {string} title        图表标题       'Pie charts'
        @param {array} data          饼图数据项      [{id:"name",color:"#00bbc6",percent:0.5}...]

    */
    args.push(data);
    var that = this;
    //获得canvas元素
    this.PieChart_db=document.getElementById(drawBoard_id);
    //获得绘图上下文
    this.ctx=this.PieChart_db.getContext("2d");
    var width = that.PieChart_db.width;
    var height = that.PieChart_db.height;

    // console.log(window.getComputedStyle(this.PieChart_db,null).width);
    // console.log(window.getComputedStyle(this.PieChart_db,null).height);
    this.ctx.save();
    //图表标题
    this.title=title;
    //图表数据
    this.data=data;

    //内置的一些参数配置
    var bulitIn_configure={


        circleInnerRadiu:26,//默认内圆半径
        circleOuterRadiu:46,//默认外圆半径
        circleInnerColor:"#fff",//默认底板颜色
        circleOuterColor:"#eee",//默认底板圆环颜色
        //饼图类型：可选 "tradition" "new"
        type:"new",
        //圆环头形：可选"round" "butt" "square"
        lineCap:"butt"
    };
    // this.configure=configure || bulitIn_configure;

    //配置参数和默认参数的合并
    this.configure = this.extend(bulitIn_configure,configure);

    //主要是针对多组data数据的处理需要参数
    this.index=this.data.length-1;

    this.center = {
            x  : parseInt(width/2),
            y  : parseInt(height/2)
    };//中心绘图点,以canvas的中心点作为坐标(0,0)点

    var cfg = this.configure;
    this.interval = 1.4*(cfg.circleOuterRadiu - cfg.circleInnerRadiu);

    //以圆心为基点中心点
    this.ctx.translate(this.center.x,this.center.y);
}

// inherit(PieChart,ValueChange);


PieChart.prototype = {

    constructor:PieChart,

    extend : function (source,dest) {
        var dest = dest || {} ;
        for(var i in source){
            if(!dest[i]){
                if(typeof source[i] === 'object') {
                    arguments.callee(source[i],dest[i]);
                }
                dest[i] = source[i];
            }
        }
        return dest;
    },

    getTextLength : function(str) {
        return str.replace(/[^\x00-\xff]/g, '11').length;
    },

    changeValue : function(p) {
        return this.numberToFloat(Math.sin(p * Math.PI/2));
    },

    numberToFloat : function(x) {
        return parseFloat(x.toFixed(2));
    },

    //画数据环的方法
    drawCircle:function(flag){
        /*
            @param {int}    circleOuterRadiu  外圆半径
            @param {int}    circleInnerRadiu  内圆半径
            @param {string} circleInnerColor  内圆颜色 "#cccccc"
            @param {string} circleOuterColor  外圆颜色 "#cccccc"
            @param {boolean}flag              true :自动加大半径，并作为底层大圆环
                                              false:维持圆环半径，并作为顶层圆环
        */
        var or = this.configure.circleOuterRadiu ,
            ir = this.configure.circleInnerRadiu ,
            ic = this.configure.circleInnerColor ,
            oc = this.configure.circleOuterColor ;

        this.ctx.save();

        //外圆圈

        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        if(flag){
            this.ctx.arc(0,0,or+(this.index)*this.interval,0,360,false);
        }else{
            this.ctx.arc(0,0,or,0,360,false);
        }
        this.ctx.closePath();
        this.ctx.fillStyle = oc;
        this.ctx.fill();

        //内圆圈
        this.ctx.beginPath();
        if(flag){
            this.ctx.arc(0,0,ir+(this.index)*this.interval,0,360,false);
        }else{
            this.ctx.arc(0,0,ir,0,360,false);
        }
        this.ctx.closePath();
        this.ctx.fillStyle = ic;
        this.ctx.fill();


        this.ctx.restore();
    },

    //画环形堆叠数据
    drawData:function(percent){
        /*
            @param {string} percent 数据占比 0.5
        */

        var cfg = this.configure;

        this.ctx.save();

        this.ctx.lineWidth = cfg.circleOuterRadiu - cfg.circleInnerRadiu ;
        this.ctx.lineCap=cfg.lineCap;

        var lineWidth = this.ctx.lineWidth ;
        this.ctx.beginPath();
        this.ctx.arc(
            0,
            0,
            lineWidth/2+cfg.circleInnerRadiu+this.index*this.interval,
            1.5*Math.PI,
            1.5*Math.PI+2*Math.PI*percent,
            false
        );
        this.ctx.strokeStyle=this.data[this.index].color;
        this.ctx.stroke();

        this.ctx.restore();
        this.index--;

    },

    //画饼图标题
    drawTitle:function(title,font_family,font_size,font_color){
        /*
            @param {string} title        "Pie Chart"
            @param {string} font_family
            @param {string} font_size    "16px"
            @param {string} font_color   "#000"
        */
        if(this.getTextLength(title) > 14) {
            title = "please言简意赅";
        }
        var ff = font_family || "微软雅黑",
            fs = font_size   || "18px",
            fc = font_color  || "#000";

        this.ctx.save();
        this.ctx.font      = fs+" "+ff;
        this.ctx.fillStyle = fc;


        this.ctx.fillText(
            title,
            -(this.ctx.measureText(title).width/2),
            (this.ctx.measureText('张').width/2)
        );
        this.ctx.restore();

    },

    //画传统样式“tradition”
    drawTraditionPie:function(){

        var i,
            len=this.data.length,
            start=1.5*Math.PI,
            cfg = this.configure;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(
                0,
                0,
                cfg.circleOuterRadiu,
                start,
                start+2*Math.PI,
                false
            );
            this.ctx.fillStyle = cfg.circleInnerColor;
            this.ctx.fill();

        for(i = 0;i < len; i++){

            this.ctx.save();

            this.ctx.beginPath();
            this.ctx.moveTo(0,0);
            this.ctx.lineTo(
                cfg.circleOuterRadiu*Math.cos(start),
                cfg.circleOuterRadiu*Math.sin(start)
            );

            this.ctx.arc(
                0,
                0,
                cfg.circleOuterRadiu,
                start,
                start+2*Math.PI*(this.data[i].percent),
                false
            );
            this.ctx.fillStyle = this.data[i].color;
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.restore();
            start = start+2*Math.PI*(this.data[i].percent);
        }

        this.ctx.restore();
    },

    //初始化方法，完成 饼图绘制 等方法的调用
    init:function(){

        switch(this.configure.type){

            case "tradition":
                this.drawTraditionPie();
                this.drawTitle(this.title);
                break;

            case "new":
            default:
                for(var i=0,len=this.data.length;i<len;i++){
                        this.drawCircle(true);
                        this.drawData(this.data[this.index].percent);
                    }
                this.drawTitle(this.title);
                break;
        }
        // console.log("complete");
    }

};
