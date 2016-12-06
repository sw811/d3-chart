<?php
// mock公用配置

// timezone warning
date_default_timezone_set("PRC");

ini_set('error_reporting', E_ALL & ~E_NOTICE);
ini_set('display_errors', 'On');

define('root_dir', '../../src');
define('mock_dir', '../../mock/');
define('views_dir', '../../views/');

require('../libs/Smarty.class.php');

$smarty = new Smarty;
$smarty->assign('root', root_dir);
$smarty->compile_dir = mock_dir . "templates_c";
$smarty->template_dir = views_dir;
