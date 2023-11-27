<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>

  <body style="height: 100vh;">
    <a href="/">HOMEEEEEEEEEEEEE</a>
    <?php
    function fetchFolderContent()
    {
      $main_path = 'files/public/';
      $contents = scandir($main_path);
      if ($contents) {
        foreach ($contents as $element) {
          if ($element != '.' && $element != '..') {
            $elementPath = $main_path . '/' . $element;
            if (is_dir($elementPath)) {
              $subfolders = scandir($elementPath);
              foreach ($subfolders as $element) {
                if ($element != '.' && $element != '..') {
                  $elementPath = $main_path . '/' . $element;
                }
              }
            } else {
              // Not folder anymore
            }
          }
        }
      } else {
        echo 'no content';
      }
    }
    $newTestFolder = dirname(__DIR__) . '\\Stage\\test renamed';
    function renameFileORFolder()
    {
      fetchFolderContent();
      var_dump((dirname(__DIR__)));
      $testFolder = dirname(__DIR__) . '\\Stage\\test';
      // rename($testFolder, $newTestFolder);
    }
    var_dump(is_dir($newTestFolder . '\\'));
    ?>

  </body>

</html>