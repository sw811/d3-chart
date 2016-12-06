<?php
/**
 * @file 第二个页面
 * @author dengxiaohong
 */

require_once('../common/header.php');

$tplData = array();

require_once('./top.php');
require_once('./left.php');
require_once('./right.php');

$smarty -> assign( 'tplData', $tplData );
$smarty -> display('second/index.tpl');

