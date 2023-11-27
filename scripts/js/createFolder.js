/** 
 * Check if the folder name is a valid name using REGEX
 * */
function isValidFolderName(str) {
  const regex = /^[a-zA-Z0-9\-\_\s ]+$/;
  return regex.test(str);
}


/**
 * Main API REQUEST for Folder Creating using FetchAPI
*/
function createFolder() {
  const folderNameInput = document.querySelector('#folder-name'),
    folderName = folderNameInput.value;
  if (isValidFolderName(folderName)) {
    const url = './../scripts/php/public/createFolder.php';

    const formData = new URLSearchParams();
    formData.append('folderName', folderName);

    // Configure request object
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData
    };
    // Send request to the backend to create the physical folder and store its information into database
    fetch(url, options)
      .then(response => response.json())
      .then(async data => {
        if (data === "Folder Created") {
          // Show success message
          renderPopupMsg('success', 'Folder created successfully');
          folderNameInput.value = '';
          toggleCreateFolderModal();

          const currentPath = await actualPath();
          // Replace backslashes into slashes
          const pathToRender = currentPath.replace(/\\/g, '/');
          // Render the new content of the open folder
          renderFileList(pathToRender);

        } else if (data === "Folder Already exists") {
          // Show error message
          renderPopupMsg('error', 'This Folder Already exists, Choose another name');
        }

      })
      .catch(error => {
        console.error('Error :', error);
      });
  } else {
    renderPopupMsg('error', 'Error : Only letters, numbers, underscores and hyphens allowed ');
  }
}