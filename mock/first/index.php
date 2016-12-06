<?php
/**
 * @file 第一个页面
 * @author dengxiaohong
 */

require_once('../common/header.php');

$tplData = array();

require_once('./top.php');
require_once('./left.php');
require_once('./right.php');

$smarty -> assign('tplData', $tplData);
$smarty -> display('first/index.tpl');

