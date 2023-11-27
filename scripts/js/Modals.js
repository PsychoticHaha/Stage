// This section Trigger the box-modal showing for file renaming and deleting
const editModal = document.querySelector('.modal-container');

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
        <input type="submit" id="create" class="ok" value="Create">
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
 * Show / Hide Delete Confirmation Modal. *
 * It pass the id and FolderName to the deleteFolder() function
 * @param {string} [folderName=""] 
 * @param {string} [id=""] 
 */
function toggleDeleteModal(id = "", folderName = "") {
  const folderId = id;

  editModal.innerHTML = `
  <div class="rename-modal">
    <div class="rename-form" method="post">
    <label for="new-name" class="title">Delete folder AND all its content ?</label>
      <div class="confirm-btns">
        <input type="submit" id="yes" onclick="deleteFolder('${folderId}', '${folderName}')" value="YES">
        <input type="reset" id="no" value="NO" onclick="toggleEditModal()">
      </div>
    </div>
</div>`;
  if (!editModal.classList.contains('show')) {
    editModal.classList.add('show');
  } else {
    editModal.classList.remove('show');
  }
}

/**
 * Show / Hide Rename Modal
 */
function toggleEditModal(id) {

  editModal.innerHTML =
    `<div class="rename-modal">
      <form class="rename-form" method="post">
        <label for="new-name" class="title">New name for this file :</label>
        <input type="text" id="new-name" class="new-name" placeholder="Write new filename here...">
        <div class="btns">
          <input type="submit" id="save-edit" class="ok" value="Save">
          <input type="reset" id="cancel-edit" value="Cancel">
        </div>
      </form>
    </div>`;
  
  if (id) {
    const saveBtn = document.getElementById('save-edit');
    saveBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const input = document.getElementById('new-name'),
        newName = input.value;
      if (isValidFolderName(newName)) {
        renameFolder(id, newName);
      } else {
        renderPopupMsg('error', 'Invalid name, use letters and numbers only');
      }
    })
  }
  cancelEditBtn = document.getElementById('cancel-edit');
  cancelEditBtn.addEventListener('click', toggleEditModal);

  if (!editModal.classList.contains('show')) {
    editModal.classList.add('show');
    document.getElementById('new-name').focus();
  } else {
    editModal.classList.remove('show');
  }
}

/** 
* This function render/create a context menu for each file in the files list
*/
function renderMenu() {
    const contextMenu = `
    <div class="item download-file">
    <div class="icon"></div>
    Download
  </div>
  <div class="item delete-file">
  <div class="icon"></div>
  Delete
  </div>
  <div class="item rename-file">
  <div class="icon"></div>
  Rename
  </div>
  <div class="item create-folder" onclick="toggleCreateFolderModal()">
  <div class="icon"></div>
  Create a new folder
  </div>`;
    const _contextMenu = document.createElement('div');
    _contextMenu.classList.add('one-context-menu');
    _contextMenu.innerHTML = contextMenu;
    return _contextMenu;
  }


/** 
 * Function to remove the context menu created by renderMenu()
 */
function removeMenu() {
  const contextMenuDiv = document.querySelector('.one-context-menu');
  if (contextMenuDiv) {
    contextMenuDiv.remove();
  }
}