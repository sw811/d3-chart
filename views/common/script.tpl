<script src="http://libs.baidu.com/jquery/1.9.0/jquery.min.js"></script>
<script src="http://s1.bdstatic.com/r/www/cache/ecom/esl/1-8-2/esl.js"></script>
<script src="/src/common/d3/d3.min.js" charset="utf-8"></script>

<script>
    require.config({
        baseUrl: '{$base_url}',
        paths: {
            'd3': 'common/d3/d3.min',
            'd3-tip': 'common/d3/d3-tip'
        }
    });
</script>

<script>
    define('jquery', function (require) {
        return $;
    });
</script>
