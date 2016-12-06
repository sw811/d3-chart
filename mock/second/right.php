<?php
/**
 * @file 右边饼图
 * @author zhangxuanjian
 */

$tplData['test'] = 'xxxx';
$tplData['testjson'] = json_decode(
    file_get_contents(
        './data/test.json'
    ),
    TRUE
);
