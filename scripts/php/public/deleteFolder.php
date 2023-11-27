<?php
require_once('../pdo.php');
try {
  if (isset($_POST['folderId']) && isset($_POST['folderName'])) {
    // Setting the id, path and folder name for physical delete
    $folder_id = $_POST['folderId'];
    $folderName = $_POST['folderName'];
    $path = $_SESSION['active_directory'] . $folderName .'/';

    // Deleting from the database
    $sql = 'DELETE FROM files WHERE id=:id';
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':id', $folder_id);
    $stmt->execute();

    // Deleting physically
    $windowsPath = str_replace('/', '\\', $path);
    deleteFolder($windowsPath);
    header('Content-Type: application/json');
    echo json_encode('Folder Deleted');
  }
} catch (PDOException $e) {
  header('Content-Type: application/json');
  echo json_encode('Error: ' . $e->getMessage());
}

?>
<?php
/**
 * This function delete the physical folder
 * @param string $path
 * @return void
 */
function deleteFolder($path)
{
  // Check if the path is a directory
  if (is_dir($path)) {
    // Get the contents of the directory
    $contents = scandir($path);

    // Iterate through each element in the directory
    foreach ($contents as $element) {
      // Skip the current and parent directory entries
      if ($element != '.' && $element != '..') {
        // Construct the full path to the element
        $elementPath = $path . '/' . $element;

        // If the element is a directory, recursively delete it
        if (is_dir($elementPath)) {
          deleteFolder($elementPath);
        } else {
          // If the element is a file, unlink (delete) it
          unlink($elementPath);
        }
      }
    }
    // After deleting all contents, remove the directory itself
    rmdir($path);
  }
}
?>