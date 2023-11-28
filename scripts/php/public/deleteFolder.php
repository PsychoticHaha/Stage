<?php
require_once('../pdo.php');
try {
  if (isset($_POST['folderId']) && isset($_POST['folderName'])) {
    $folder_id = $_POST['folderId'];
    $folderName = $_POST['folderName'];
    if ($folderName != '') {

      // Deleting from the database
      $sql = 'DELETE FROM files WHERE id=:id';
      $stmt = $pdo->prepare($sql);
      $stmt->bindParam(':id', $folder_id);
      $stmt->execute();

      // Setting the path and folder name for physical delete
      $actualPath = $_SESSION['active_directory'] . $folderName . DIRECTORY_SEPARATOR;
      $path = $actualPath;

      // Deleting physically
      header('Content-Type: application/json');
      if(deletePhysicalFolder($path, $folderName, $pdo)){
        echo json_encode('Deleted');
      } else {
        echo json_encode('Backend Delete Error');
      };
    }
  }
} catch (PDOException $e) {
  header('Content-Type: application/json');
  echo json_encode('Error: ' . $e->getMessage());
}

?>
<?php
/**
 * This function delete the physical folder or file
 * @param string $path
 * @return mixed
 */
function deletePhysicalFolder($path, $name, $pdo)
{
  if (!is_dir($path)) {
    $path = str_replace('\\', DIRECTORY_SEPARATOR, $path);
    $separator = DIRECTORY_SEPARATOR;
    $path = rtrim($path, $separator);
  }
  if (is_file($path)) {
    // Si c'est un fichier, supprimer directement
    if (unlink($path)) {
      // Supprimer aussi dans la base de données
      deleteDbFolder($name, $pdo);
      return 'A file : directly deleted'; // Réussite
    } else {
      return 'A file : but not deleted'; // Échec lors de la suppression du fichier
    }
  } elseif (is_dir($path)) {
    // Si c'est un répertoire, obtenir le contenu
    $content = scandir($path);

    foreach ($content as $value) {
      // Ignorer les entrées '.' et '..'
      if ($value != '.' && $value != '..') {
        $elementPath = $path . DIRECTORY_SEPARATOR . $value;

        if (is_dir($elementPath)) {
          // Si l'élément est un répertoire, supprimer récursivement
          if (!deletePhysicalFolder($elementPath, $name, $pdo)) {
            return 'Recursive delete FAIL !'; // Échec lors de la suppression récursive
          }
        } else {
          // Si l'élément est un fichier, le supprimer
          if (!unlink($elementPath)) {
            return 'Inside a folder, FAIL to delete'; // Échec lors de la suppression du fichier
          }

          // Supprimer aussi dans la base de données
          deleteDbFolder($elementPath, $pdo);
        }
      }
    }

    // Après avoir supprimé le contenu, supprimer le répertoire lui-même
    if (rmdir($path)) {
      return 'Folder deleted with content'; // Réussite
    } else {
      return 'Fail to delete folder'; // Échec lors de la suppression du répertoire
    }
  } else {
    if (unlink($path)) {

      return 'File deleted';
    } else {
      // Le chemin n'est ni un fichier ni un répertoire
      return 'Path not a folder';
    }
    ;
  }
}

/**
 * This function delete the file from DB
 * @param string $name
 * @param mixed $pdo
 * @return bool
 */
function deleteDbFolder($name, $pdo)
{
  if (is_file($name)) {
    $query = 'DELETE FROM files WHERE path=:path';
    $nStmt = $pdo->prepare($query);
    $nStmt->bindParam(':path', $name);
    $nStmt->execute();
    return true;
  } else {
    $query = 'DELETE FROM files WHERE name=:name';
    $nStmt = $pdo->prepare($query);
    $nStmt->bindParam(':name', $name);
    $nStmt->execute();
    return true;
  }
}

?>