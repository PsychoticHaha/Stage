<?php
require_once('../pdo.php');
if (isset($_POST['fileId'])) {
  try {
    $fileId = $_POST['fileId'];
    $sql = 'SELECT * FROM files WHERE id =:fileId';
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':fileId', $fileId);
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($results as $info) {
      $id = $info['id'];
      $folderName = $info['name'];
      // fullPath containing slashes
      $fullPath = $info['path'];
      $fullPath = str_replace('/', DIRECTORY_SEPARATOR, $fullPath);
      // SET the sessions active_directory and folder_id (The last backslash is for avoiding to get the actual folder inside itself)
      $_SESSION['active_directory'] = $fullPath;
      $_SESSION['file_id'] = $id;


    }
    header('Content-Type: application/json');
    echo json_encode($fullPath);

  } catch (PDOException $e) {
    echo 'Error: ' . $e->getMessage();
  }
} else {
  header('Content-Type: application/json');
  echo json_encode('Folder name not sent');
}
?>

<?php
/**
 * This function get the last parent directory of actual directory
 * @param mixed $str
 * @return string 
 */

function extractLastParent($str)
{
  // Use dirname to get the full path to parent directory of actual directory ($path - fileName)
  $parentDir = dirname($str);

  // Use basename to get the name of the last parent 
  $folderSub = basename($parentDir);

  return $folderSub;
}

?>