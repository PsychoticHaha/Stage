const FileListDiv = document.querySelector('.body .content');
document.addEventListener('DOMContentLoaded', () => {
  renderFileList();
})

function renderFileList() {
  const url = '/scripts/php/public/renderFilesList.php';

  // Fecth the folderList
  fetch(url)
    .then(response => response.json())
    .then(data => {
      FileListDiv.innerHTML = '';
      let id;
      // Create element and show data in the page
      for (let i = 0; i < data.length; i++) {
        const element = data[i],
          folder_id = element.id,
          folderName = element.folder_name,
          folderPath = element.folder_path,
          add_date = element.add_date;

        FileListDiv.innerHTML += `
      <div class="single-file" id="${folder_id}">
          <div class="name">
            <input type="checkbox" class="check" name="" id="">
             <span class="folder-name" id="${folder_id + 1818}">${folderName}</span>
          </div>
          <div class="add-date">
            ${add_date}
          </div>
          <div class="file-action">
            <div class="rename one-file" title="Rename"></div>
            <div class="delete one-file" onclick="toggleDeleteModal(${folder_id}, '${folderName}')" title="Delete"></div>
            <div class="download one-file" title="Download"></div>
        </div>
      </div>`;
      }


      // Declare the Actions buttons and one Single File in the file List
      const editBtns = document.querySelectorAll('.single-file .rename.one-file'),
        files = document.querySelectorAll('.single-file');
      // Actions for the edit and Delete Buttons
      editBtns.forEach(editBtn => {
        editBtn.addEventListener('click', toggleEditModal);
      });
      // Create a context Menu for each single File in the file list
      files.forEach(file => {
        file.addEventListener('click', removeMenu);
        file.addEventListener('contextmenu', (event) => {

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
            if (newFolder_Menu_Btn) {
              newFolder_Menu_Btn.addEventListener('click', () => {
                toggleCreateFolderModal();
              })
            }
          } else {
            file.appendChild(renderMenu());
            const contextMnuDiv = document.querySelector('.one-context-menu');
            contextMnuDiv.style = `top:${mouseY + 10}px;left:${mouseX + 10}px`;
          }

          // These are event Handlers for the contextMenu Options
          const renameBtnContextMenu = document.querySelector('.single-file .item.rename-file'),
            deleteBtnMenu = document.querySelector('.single-file .item.delete-file');

          renameBtnContextMenu.addEventListener('click', () => {
            toggleEditModal();
            removeMenu();
          });

          deleteBtnMenu.addEventListener('click', () => {
            toggleDeleteModal(parseInt(deleteBtnMenu.parentElement.parentElement.id), (deleteBtnMenu.parentElement.parentElement.firstElementChild.firstElementChild.nextElementSibling.innerHTML).toString());
            removeMenu();
          });
        });
      })
    })
    .catch(error => {
      console.error('Error :', error);
    });

}