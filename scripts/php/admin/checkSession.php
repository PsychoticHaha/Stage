<?php
require_once('./scripts/php/pdo.php');
if (empty($_SESSION['active_directory'])) {
  $_SESSION['active_directory'] = dirname(__DIR__) . DIRECTORY_SEPARATOR . '..'.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'files'.DIRECTORY_SEPARATOR.'public'.DIRECTORY_SEPARATOR;
   // Change backslash into slash (if exists) because we'll always use slash inside DB
  $active_directory = str_replace('\\', '/', $_SESSION['active_directory'] );

  $sql = 'SELECT * FROM files WHERE path = :active_directory';
  $stmt = $pdo->prepare($sql);
  $stmt->bindParam(':active_directory', $active_directory);
  $stmt->execute();
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  if (empty($result)) {
    $query = "INSERT INTO files(name, path, rootContent, access_type, category) VALUES('public', :path, 0, 'public','folder')";
    $prep = $pdo->prepare($query);
    $prep->bindParam(':path', $active_directory);
    $prep->execute();
  }
}
$_SESSION['on_plateform'] = 'ok';
?>