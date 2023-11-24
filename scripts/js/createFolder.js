// Event handler for the create Folder Buttons
const newFolderBtn = document.querySelector('.actions .new-folder');
newFolderBtn.addEventListener('click', () => {
  toggleCreateFolderModal();
})

function toggleCreateFolderModal() {
  editModal.innerHTML =
    `<div class="rename-modal">
    <form id="createFolder">
      <label for="new-name" class="title">Name of the new folder :</label>
      <input type="text" id="new-name" name="folderName" value="">
      <div class="btns">
        <input type="submit" id="ok" value="Ok">
        <input type="reset" id="cancel-edit" value="Cancel">
      </div>
    </form>
  </div>`;
  if (!editModal.classList.contains('show')) {
    editModal.classList.add('show');
  } else {
    editModal.classList.remove('show');
  }
  cancelEditBtn = document.getElementById('cancel-edit');
  cancelEditBtn.addEventListener('click', toggleEditModal);
  const createFolderForm = document.getElementById('createFolder');
  createFolderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    createFolder();
  });
}
// Check if the folder name is a valid name using REGEX
function isValidFolderName(str) {
  const regex = /^[a-zA-Z0-9\-\_\s ]+$/;
  return regex.test(str);
}

// Main REQUEST for Folder Creating using AJAX
function createFolder() {
  const folderNameInput = document.querySelector('#new-name'),
    folderName = folderNameInput.value;
  if (isValidFolderName(folderName)) {
    const url = './../scripts/php/public/createFolder.php';
    const xhr = new XMLHttpRequest(),
      params = 'folderName=' + folderName;

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = async function () {

      if (xhr.status == 200) {
        const response = JSON.parse(xhr.responseText);
        if (response === "Folder Created" && response) {
          // Show success message
          renderPopupMsg('success', 'Folder created successfully');
          folderNameInput.value = '';
          toggleCreateFolderModal();
        } else if (response === "Folder Already exists" && response) {
          // Show error message
          renderPopupMsg('error', 'This Folder Already exists, Choose another name');
        }
        console.log(typeof (response));
        console.log('Server Response: ', xhr.responseText);
      } else {
        console.error('Error: ', xhr.statusText);
      }
    }
    xhr.send(params);
  } else {
    renderPopupMsg('error', 'Error : Only letters, numbers, underscores and hyphens allowed ');
  }

}