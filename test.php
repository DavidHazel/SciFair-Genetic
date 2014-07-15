<?php

$mysqli = new mysqli("localhost", "root", "!melee!", "genetics");
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

if (!$mysqli->query("DROP TABLE IF EXISTS test") ||
    !$mysqli->query("CREATE TABLE test(id INT)") ||
    !$mysqli->query("INSERT INTO test(id) VALUES (1)")) {
    echo "Table creation failed: (" . $mysqli->errno . ") " . $mysqli->error;
}

$val = 2;
$stmt = $mysqli->prepare("INSERT INTO test VALUES (?)");
$stmt->bind_param('d', $val);



/* execute prepared statement */
$stmt->execute();