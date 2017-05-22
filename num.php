<?php
$a = 0;
$b = 52;
$c = 103;
$d = 154;
$e = 205;
$i = 0;
while (true) {
    if ($i++ == 256) break;
    echo $a++ . PHP_EOL;
    if ($i++ == 256) break;
    echo $b++ . PHP_EOL;
    if ($i++ == 256) break;
    echo $c++ . PHP_EOL;
    if ($i++ == 256) break;
    echo $d++ . PHP_EOL;
    if ($i++ == 256) break;
    echo $e++ . PHP_EOL;
}
var_dump($a, $b, $c, $d);


return;
$a = 0;  //ceil(256 / 3) * 0;
$b = 86; //ceil(256 / 3) * 1;
$c = 171;//ceil(256 / 3) * 2;
$i = 0;
while (true) {
    if ($i++ == 256) break;
    echo $a++ . PHP_EOL;
    if ($i++ == 256) break;
    echo $b++ . PHP_EOL;
    if ($i++ == 256) break;
    echo $c++ . PHP_EOL;
}
var_dump($a, $b, $c);
