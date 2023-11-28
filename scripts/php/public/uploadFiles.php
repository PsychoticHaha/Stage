<?php
require_once('../pdo.php');

if (isset($_FILES['files']['name'][0]) && $_SERVER['REQUEST_METHOD'] === 'POST') {
  $parentDirectory = $_SESSION['active_directory'];
  if (is_dir($parentDirectory)) {
    // Check if it's directly in the Root folder
    if ($parentDirectory == dirname(__DIR__) . DIRECTORY_SEPARATOR . '..'.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'files'.DIRECTORY_SEPARATOR.'public'.DIRECTORY_SEPARATOR) {
      $rootContent = 1;
    } else {
      $rootContent = 0;
    }

    if (!empty($_SESSION['private'])) {
      $access_type = 'private'; // Don't forget to set this session variable when login as private
      $user_id = $_SESSION['user_id']; // AND THIS ONE
    } else {
      $access_type = 'public';
      $user_id = NULL;
    }
    $category = 'file';

    for ($i = 0; $i < count($_FILES['files']['name']); $i++) {
      // Initialize a errorCount variable to check if there is an upload fail
      $errorCount = 0;
      // Saving files
      $fileName = $_FILES['files']['name'][$i];
      $tempAddr = $_FILES['files']['tmp_name'][$i];
      $finalLocation = $_SESSION['active_directory'] . $fileName . DIRECTORY_SEPARATOR;
      // Check if there's not file with the same name yet
      if (is_file($finalLocation)) {
        $response = $errorCount . ' file(s) already exists';
      } else {
        if (move_uploaded_file($tempAddr, $finalLocation)) {

          $type = getFileExtension($fileName);

          //DATABASE SAVING HERE
           // Change backslash into slash (if exists)
          $pathToSave = str_replace('\\', '/', $finalLocation);
          $sql = 'INSERT INTO files(name, path, rootContent, access_type, category, user_id, type) VALUES(:name, :path, :rootContent, :access_type, :category, :user_id, :type)';
          $stmt = $pdo->prepare($sql);
          $stmt->bindParam(':name', $fileName);
          $stmt->bindParam(':path', $pathToSave);
          $stmt->bindParam(':rootContent', $rootContent);
          $stmt->bindParam(':access_type', $access_type);
          $stmt->bindParam(':category', $category);
          $stmt->bindParam(':user_id', $user_id);
          $stmt->bindParam(':type', $type);
          $stmt->execute();
          // Return i + 1 because it start from 0
          $response = $i + 1 . ' Files uploaded';
        } else {
          $errorCount++;
          $response = 'Error : ' . $errorCount . ' Files NOT uploaded';
        }
      }
    }
    header('Content-Type:application/json');
    echo json_encode($response);

  } else {
    header('Content-Type:application/json');
    echo json_encode('Not_dir');
  }
} else {
  header('Content-Type:application/json');
  echo json_encode('No file sent');
}
?>
<?php
/**
 * Summary of getFileExtension
 * @param mixed $string
 * @return string|null
 */
function getFileExtension($string)
{
  // Find the last occurrence of a dot inside string (filename)
  $lastDotPosition = strrpos($string, '.');

  // Check if a dot was found
  if ($lastDotPosition !== false) {
    // Extract string after the last dot (file extension)
    $extension = substr($string, $lastDotPosition + 1);
    return $extension;
  } else {
    return null;
  }
}

?>