<?php
require_once('../pdo.php');
/** 
 * This function Check if fileName or folderName is valid using REGEX
 * */
function isValidFolderName($str)
{
  return preg_match('/^[a-zA-Z0-9\-\_\s ]+$/', $str);
}

if (isset($_POST['folderName']) && !empty($_SESSION['active_directory'])) {
  $parentDirectory = $_SESSION['active_directory'];
  $folderName = $_POST['folderName'];

  // Check if it's directly in the Root folder
  if ($parentDirectory == dirname(__DIR__) . DIRECTORY_SEPARATOR . '..'.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'files'.DIRECTORY_SEPARATOR.'public'.DIRECTORY_SEPARATOR) {
    $rootContent = 1;
  } else {
    $rootContent = 0;
  }
  
  // Check if it's a valid filename
  if (isValidFolderName($folderName)) {
    // Set the path to save
    $path = $parentDirectory . $folderName .DIRECTORY_SEPARATOR;
     // Change backslash into slash (if exists) because we'll save it to DB
    $path = str_replace('\\', '/', $path);
    if (!empty($_SESSION['private'])) {
      $access_type = 'private'; // Don't forget to set this session variable when login as private
      $user_id = $_SESSION['user_id']; // AND THIS ONE
    } else {
      $access_type = 'public';
      $user_id = NULL;
    }
    $category = 'folder';
    try {
      if (!is_dir($path)) {
        $fileType = 'folder';
        $sql = 'INSERT INTO files(name, path, rootContent, access_type, category, user_id, type) VALUES (:_name, :_path, :rootContent, :access_type, :category, :user_id, :type)';
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':_name', $folderName);
        $stmt->bindParam(':_path', $path);
        $stmt->bindParam(':rootContent', $rootContent);
        $stmt->bindParam(':access_type', $access_type);
        $stmt->bindParam(':category', $category);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->bindParam(':type', $fileType);
        $stmt->execute();
        mkdir($path, 0777);
        
        header('Content-Type: application/json');
        echo json_encode('Folder Created');
      } else {
        header('Content-Type: application/json');
        echo json_encode('Folder Already exists');
      }
    } catch (PDOException $e) {
      echo "Error: " . $e->getMessage();
    }
  } else {
    header('Content-Type: application/json');
    echo json_encode("Invalid filename");
  }
}
?>