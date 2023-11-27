<?php
require_once('../pdo.php');
try {
  if (isset($_POST['folderPath'])) {
    if ($_POST['folderPath'] == 'public /') {

      $sql = 'SELECT * FROM files WHERE rootContent = 1';
      $stmt = $pdo->prepare($sql);
      $stmt->execute();
      $contents = $stmt->fetchAll(PDO::FETCH_ASSOC);
      header('Content-Type: application/json');
      echo json_encode($contents);

    } else {
      $fullPath = $_POST['folderPath'];
      // $fullPath = $_SESSION['active_directory'];

      // Get every subfolders and files inside this directory using scandir()
      if (!is_dir($fullPath)) {
        header('Content-Type: application/json');
        echo json_encode('renderFilesList.php:19 : NOT A FOLDER');
      } else {
        $contents = scandir($fullPath);
        $subfolders = array();
        for ($i = 0; $i < count($contents); $i++) {
          $directory = $contents[$i];
          if ($directory == '.' || $directory == '..') {
            continue;
          } else {
            $subfolders[] = $directory;
          }
        }

        $fileList = array();
        // Render an array containing the files and subfolders list
        for ($i = 0; $i < count($subfolders); $i++) {
          $fullPath = $_POST['folderPath'] . $subfolders[$i] . '\\';
          $fullPath = str_replace('\\', '/', $fullPath);

          $sql = 'SELECT * FROM files WHERE path =:fullPath';
          $stmt = $pdo->prepare($sql);
          $stmt->bindParam(':fullPath', $fullPath);
          $stmt->execute();
          $response = $stmt->fetchAll(PDO::FETCH_ASSOC);
          foreach ($response as $value) {
            // You can process for data filtering here
            $fileList[] = $value;
          }

        }

        header('Content-Type: application/json');
        echo json_encode($fileList);
      }
    }
  } else {
    echo json_encode('NO PARAMETERS');
  }
} catch (PDOException $e) {
  echo 'Error: ' . $e->getMessage();
}
?>