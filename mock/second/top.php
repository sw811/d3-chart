<?php
/**
 * @file 上边气泡图
 * @author zhangxuanjian
 */

function readJson($module) {
    $filePath = dirname(__FILE__) . '/' . $module . '.json';
    $json = file_get_contents($filePath);
    $p = json_decode($json, true);
    return $p;
}

$tplData[ 'testjson' ] = readJson('./data/test');
$tplData[ 'test' ] = 'test';

