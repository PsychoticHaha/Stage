// Event handler for the create Folder Buttons
const newFolderBtn = document.querySelector('.actions .new-folder');
newFolderBtn.addEventListener('click', () => {
  toggleCreateFolderModal();
})


/**
 * This function Show / Hide the "Name" Prompt for the new folder
 */
function toggleCreateFolderModal() {
  editModal.innerHTML =
    `<div class="rename-modal">
    <form id="createFolder" class="rename-form">
      <label for="folder-name" class="title">Name of the new folder :</label>
      <input type="text" id="folder-name" class="new-name" name="folderName" value="">
      <div class="btns">
        <input type="submit" id="ok" value="Create">
        <input type="reset" id="cancel-edit" value="Cancel">
      </div>
    </form>
  </div>`;
  if (!editModal.classList.contains('show')) {
    editModal.classList.add('show');
    document.getElementById('folder-name').focus();
  } else {
    editModal.classList.remove('show');
  }
  // Cancel Event Handler
  cancelEditBtn = document.getElementById('cancel-edit');
  cancelEditBtn.addEventListener('click', toggleEditModal);

  // Create Folder Button event handler
  const createFolderForm = document.getElementById('createFolder');
  createFolderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    createFolder();
  });
}


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
    // Send request to the backend to create the physical folder and store it information into database
    fetch(url, options)
      .then(response => response.json())
      .then(async data => {
        console.log('Server Response :', data);
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