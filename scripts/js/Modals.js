// This section Trigger the box-modal showing for file renaming and deleting
const editModal = document.querySelector('.modal-container');


/**
 * Show / Hide Delete Confirmation Modal. *
 * It pass the id and FolderName to the deleteFolder() function
 * @param {string} [folderName=""] 
 * @param {string} [id=""] 
 */
function toggleDeleteModal(id = "", folderName ="") {
  const folderId = id;
  
  editModal.innerHTML = `
  <div class="rename-modal">
    <div class="rename-form" method="post">
    <label for="new-name" class="title">Delete this folder and all its content ?</label>
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
function toggleEditModal() {
  editModal.innerHTML =
    `<div class="rename-modal">
    <form class="rename-form" method="post">
      <label for="new-name" class="title">New name for this file :</label>
      <input type="text" id="new-name" class="new-name" placeholder="Write new filename here...">
      <div class="btns">
        <input type="submit" id="ok" value="Ok">
        <input type="reset" id="cancel-edit" value="Cancel">
        </div>
        </form>
        </div>`;
  
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