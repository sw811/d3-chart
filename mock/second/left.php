<?php
/**
 * @file 左边平行坐标图
 * @author lideqing
 */

$tplData['test'] = 'xxxx';
$tplData['testjson'] = json_decode(
    file_get_contents(
        './data/test.json'
    ),
    TRUE
);
