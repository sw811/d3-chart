{strip}
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />

    <title>D3可视化</title>
    {include file="../common/conf.tpl" module="first"}
    <link href="{$module_host}/css/index.less" rel="stylesheet" />
    <link href="http://www.baidu.com/favicon.ico" rel="shortcut icon" />
    <!-- <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script> -->


</head>

<body>

    <div class="wrapper">
        <!-- header -->
        {include file="../common/header.tpl"}
        <div class="container">
            <div class="content-top">
                <!-- 地图＋日历图 -->
                {include file="./top.tpl"}
            </div>
            <div class="content-bottom">
                <!-- 堆叠柱状图 -->
                <div class="content-left">
                    {include file="./left.tpl"}
                </div>
                <!-- 南丁格尔图 -->
                <div class="content-right">
                    {include file="./right.tpl"}
                </div>
            </div>
        </div>
        <!-- footer -->
        {include file="../common/footer.tpl"}
    </div>

    {include file="../common/script.tpl"}
   <!--  <script>
        define('global/chinamapdata', "{$tplData.chinamapdata}");
    </script> -->
    <script>
        require(['first/index'], function (page) {
            page.init();
        });

    </script>
</body>
</html>
{/strip}
