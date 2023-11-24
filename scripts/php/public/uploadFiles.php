<?php
$uploadFolder = '../../files/public/'; 

if(isset($_FILES['files']['name'][0])) {
    for($i = 0; $i < count($_FILES['files']['name']); $i++) {
        $nomFichier = $_FILES['files']['name'][$i];
        $tempAddr = $_FILES['files']['tmp_name'][$i];
        $finalLocation = $uploadFolder . $nomFichier;
        move_uploaded_file($tempAddr, $finalLocation);
    }
    echo 'Les fichiers ont été uploadés avec succès.';
} else {
    echo 'Aucun fichier n\'a été soumis.';
}
?>
