<?php
// This script accept file renaming such as folder renaming
require_once('../pdo.php');
if (isset($_POST['newName']) && isset($_POST['id']) && !empty($_SESSION['on_plateform'])) {
  // This can be a file ID too. 
  $folder_Id = $_POST['id'];
  $newFolderName = $_POST['newName'];

  if (isValidFolderName($newFolderName)) {

    $sql = 'SELECT * FROM files WHERE id=:id';
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':id', $folder_Id);
    $stmt->execute();
    $folder = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($folder as $value) {
      // Physical path of the file to rename
      $physicalPath = str_replace('/', DIRECTORY_SEPARATOR, $_SESSION['active_directory'] . $value['name']);
      if (is_dir($physicalPath)) {
        $newPath = $_SESSION['active_directory'] . $newFolderName . DIRECTORY_SEPARATOR;
      } else {
        $newPath = $_SESSION['active_directory'] . $newFolderName;
      }

      // Check if there is not a file or a folder having this NEW name yet
      if (!is_dir($newPath) || !is_file($newPath)) {
        // rename it using rename()
        if (rename($physicalPath, $newPath)) {
          // Change backslash into slash (if exists)
          $pathToSave = str_replace('\\', '/', $newPath);
          $query = 'UPDATE files SET name=:name,path=:path WHERE id=:id';
          $nStmt = $pdo->prepare($query);
          $nStmt->bindParam(':id', $folder_Id);
          $nStmt->bindParam(':name', $newFolderName);
          $nStmt->bindParam(':path', $pathToSave);
          $nStmt->execute();
          header('Content-Type: application/json');
          echo json_encode('Renamed');
        } else {
          header('Content-Type: application/json');
          echo json_encode('AN ERROR OCCURED');
        }
      } else {
        header('Content-Type: application/json');
        echo json_encode('Folder Already exists');
      }

    }
  } else {
    header('Content-Type: application/json');
    echo json_encode('Invalid Name');
  }
} else {
  header('Content-Type: application/json');
  echo json_encode('No params');
}
/** 
 * This function Check if fileName or folderName is valid using REGEX
 * */
function isValidFolderName($str)
{
  return preg_match('/^[a-zA-Z0-9\-\_\s ]+$/', $str);
}
?>