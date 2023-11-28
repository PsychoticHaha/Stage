/**
 * This function send the delete request to the backend
 * @param int folderId 
 * @param string folderName 
 */ 
function deleteFolder(folderId, folderName) {
  const folder = document.getElementById(folderId);
  if (folderId && folderName && folderName != '') {
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
      .then(async data => {
        if (data == 'Deleted') {
          toggleEditModal();//This work since the container is selected instead of the content
          
          const currentPath = await actualPath();
          // Replace backslashes into slashes
          const pathToRender = currentPath.replace(/\\/g, '/');
          // Render the new content of the open folder
          renderFileList(pathToRender);

          renderPopupMsg('success', '<b> Success :</b> Deleted !');
        } else {
          renderPopupMsg('error', data);
        }
      })
      .catch(error => {
        console.error('Error :', error);
      });
  } else {
    console.log('NO ID OR NAME');
  }
}