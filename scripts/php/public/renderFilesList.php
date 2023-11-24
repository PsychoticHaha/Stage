<?php
require_once('../pdo.php');
try {
  $sql = 'SELECT * FROM folders WHERE access_type="public"';
  $stmt = $pdo->prepare($sql);
  $stmt->execute();
  $response = $stmt->fetchAll(PDO::FETCH_ASSOC);

  header('Content-Type: application/json');
  echo json_encode($response);
} catch (PDOException $e) {
  echo 'Error: ' . $e->getMessage();
}
?>