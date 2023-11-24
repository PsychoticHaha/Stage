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

// Main function of Folder Creating using AJAX
function createFolder() {
  const folderNameInput = document.querySelector('#new-name'),
    folderName = folderNameInput.value;
  const url = 'scripts/php/createFolder.php';
  const xhr = new XMLHttpRequest(),
    params = 'folderName=' + folderName;

  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function () {
    if (xhr.status == 200 && xhr.status < 300) {
      const response = xhr.responseText;
      console.log('Server Response: ', xhr.responseText);
      if (response == 'Folder Created') {
        // Show success message
        folderNameInput.value = '';
        toggleCreateFolderModal();
      } else if (response == 'Folder Already exists') {
        // Show error message
      }
    } else {
      console.error('Error: ', xhr.statusText);
    }
  }
  xhr.send(params);

}