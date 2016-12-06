<?php /* Smarty version Smarty-3.1.19, created on 2015-08-31 20:01:35
         compiled from "../../views/first/index.tpl" */ ?>
<?php /*%%SmartyHeaderCode:100268567955e4421fc4e5f6-04305986%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'f8e9ddf58825bf190bfee9a76afad8678529cc20' => 
    array (
      0 => '../../views/first/index.tpl',
      1 => 1441001440,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '100268567955e4421fc4e5f6-04305986',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'module_host' => 0,
    'tplData' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.19',
  'unifunc' => 'content_55e4421fc95998_19224619',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_55e4421fc95998_19224619')) {function content_55e4421fc95998_19224619($_smarty_tpl) {?><!DOCTYPE html><html><head><meta charset="utf-8" /><title>D3可视化</title><?php echo $_smarty_tpl->getSubTemplate ("../common/conf.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array('module'=>"first"), 0);?>
<link href="<?php echo $_smarty_tpl->tpl_vars['module_host']->value;?>
/css/index.less" rel="stylesheet" /><link href="http://www.baidu.com/favicon.ico" rel="shortcut icon" /><!-- <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script> --></head><body><div class="wrapper"><!-- header --><?php echo $_smarty_tpl->getSubTemplate ("../common/header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>
<div class="container"><div class="content-top"><!-- 地图＋日历图 --><?php echo $_smarty_tpl->getSubTemplate ("./top.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>
</div><div class="content-bottom"><!-- 堆叠柱状图 --><div class="content-left"><?php echo $_smarty_tpl->getSubTemplate ("./left.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>
</div><!-- 南丁格尔图 --><div class="content-right"><?php echo $_smarty_tpl->getSubTemplate ("./right.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>
</div></div></div><!-- footer --><?php echo $_smarty_tpl->getSubTemplate ("../common/footer.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>
</div><?php echo $_smarty_tpl->getSubTemplate ("../common/script.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>
<!--  <script>define('global/chinamapdata', "<?php echo $_smarty_tpl->tpl_vars['tplData']->value['chinamapdata'];?>
");</script> --><script>require(['first/index'], function (page) {page.init();});</script></body></html>
<?php }} ?>
