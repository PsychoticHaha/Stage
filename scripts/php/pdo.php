<?php
session_start();
$dsn = 'mysql:host=localhost;dbname=fileshares';
$pdo = new PDO($dsn,'root','');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
?>