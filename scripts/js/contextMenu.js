// This section Trigger the box-modal showing for file renaming
const editBtns = document.querySelectorAll('.single-file .rename.one-file'),
  editModal = document.querySelector('.modal-container');

editBtns.forEach(editBtn => {
  editBtn.addEventListener('click', toggleEditModal);
});

function toggleEditModal() {
  editModal.innerHTML =
    `<div class="rename-modal">
    <form class="rename-form" method="post">
      <label for="new-name" class="title">New name for this file :</label>
      <input type="text" id="new-name" placeholder="Write new filename here...">
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
  } else {
    editModal.classList.remove('show');
  }
}

// This section render/create a context menu for each file in the files list
function renderMenu() {
  const contextMenu = `
  <div class="item download-file">
    <div class="icon"></div>
    Download
  </div>
  <div class="item delete-file">
  <div class="icon"></div>
  Delete file
  </div>
  <div class="item rename-file">
  <div class="icon"></div>
  Rename file
  </div>
  <div class="item create-folder">
    <div class="icon"></div>
    Create a new folder
  </div>`;
  const _contextMenu = document.createElement('div');
  _contextMenu.classList.add('one-context-menu');
  _contextMenu.innerHTML = contextMenu;
  return _contextMenu;
}
function removeMenu() {
  const contextMenuDiv = document.querySelector('.one-context-menu');
  if (contextMenuDiv) {
    contextMenuDiv.remove();
  }
}
const files = document.querySelectorAll('.single-file');
files.forEach(file => {
  file.addEventListener('click', removeMenu);
  file.addEventListener('contextmenu', (event) => {
    event.stopPropagation();
    event.preventDefault();

    // This function render the position for the new context Menu that have been created
    function renderPosition() {
      let mouseX = event.clientX,
        mouseY = event.clientY;
      if (mouseX + 200 >= file.offsetWidth) {
        mouseX -= 210;
      }
      if (mouseY + 200 >= window.innerHeight) {
        console.log(mouseY, file.offset);
        mouseY -= 150;
      }
      const mousePosition = [mouseX, mouseY];
      return mousePosition;
    }
    // Get the position rendered by renderPosition() function
    const Position = renderPosition();
    const mouseX = Position[0],
      mouseY = Position[1];
    const contextMenuDiv = document.querySelector('.one-context-menu');

    if (contextMenuDiv) {
      contextMenuDiv.remove();
      file.appendChild(renderMenu());
      const contextMnuDiv = document.querySelector('.one-context-menu');
      contextMnuDiv.style = `top:${mouseY + 10}px;left:${mouseX + 10}px`;
    } else {
      file.appendChild(renderMenu());
      const contextMnuDiv = document.querySelector('.one-context-menu');
      contextMnuDiv.style = `top:${mouseY + 10}px;left:${mouseX + 10}px`;
    }
    const renameBtnContextMenu = document.querySelector('.single-file .item.rename-file'),
      deleteBtnMenu = document.querySelector('.single-file .item.delete-file');
    renameBtnContextMenu.addEventListener('click', () => {
      toggleEditModal();
      removeMenu();
    });
    deleteBtnMenu.addEventListener('click', () => {
      toggleDeleteModal();
      removeMenu();
    });
  })
});

// This section manage the file deleting
const deleteBtns = document.querySelectorAll('.single-file .delete.one-file');
deleteBtns.forEach(deleteBtn => {
  deleteBtn.addEventListener('click', () => {
    toggleDeleteModal();
  })
})
function toggleDeleteModal() {
  editModal.innerHTML = `
  <div class="rename-modal">
    <form class="rename-form" method="post">
    <label for="new-name" class="title">Delete this file ?</label>
      <div class="confirm-btns">
        <input type="submit" id="yes" value="YES">
        <input type="reset" id="no" value="NO" onclick="toggleEditModal()">
      </div>
    </form>
</div>`;
  if (!editModal.classList.contains('show')) {
    editModal.classList.add('show');
  } else {
    editModal.classList.remove('show');
  }
}