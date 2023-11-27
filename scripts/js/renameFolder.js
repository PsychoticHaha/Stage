/**
 * Main API REQUEST for Folder and file Renaming using FetchAPI
*/
function renameFolder(id, newName) {
  
  const url = './../scripts/php/public/renameFolder.php';

  const formData = new URLSearchParams();
  formData.append('id', id);
  formData.append('newName', newName);

  // Configure request object
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData
  };
  // Send request to the backend to rename the physical folder and store its information into database
  fetch(url, options)
    .then(response => response.json())
    .then(async data => {
      
      if (data === "Renamed") {
        // Show success message
        renderPopupMsg('success', 'Renaming success !');
        const folderNameInput = document.getElementById('new-name');
        folderNameInput.value = '';
        toggleEditModal();

        const currentPath = await actualPath();
        // Replace backslashes into slashes
        const pathToRender = currentPath.replace(/\\/g, '/');
        // Render the new content of the open folder
        renderFileList(pathToRender);

      } else if (data === "Folder Already exists") {
        // Show error message
        renderPopupMsg('error', 'This Name is Already used');
      } else {
        renderPopupMsg('error', data);
      }

    })
    .catch(error => {
      console.error('Error :', error);
    });
}