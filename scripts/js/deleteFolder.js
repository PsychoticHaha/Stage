/**
 * This function send the delete request to the backend
 * @param int folderId 
 * @param string folderName 
 */
function deleteFolder(folderId, folderName) {
  const folder = document.getElementById(folderId);
  if (folderId && folderName) {
    const url = '/scripts/php/public/deleteFolder.php';
    // Défine data to send (parameters)
    const formData = new URLSearchParams();
    formData.append('folderId', folderId);
    formData.append('folderName', folderName);

    // Configure request object
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData
    };

    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        if (data == 'Folder Deleted') {
          toggleEditModal();//This work since the container is selected instead of the content
          folder.remove();
          renderPopupMsg('success', '<b> Success</b> : Folder Deleted !');
        }
      })
      .catch(error => {
        console.error('Error :', error);
      });
  } else {
    console.log('NO ID OR NAME');
  }
}