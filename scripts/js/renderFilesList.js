const FileListDiv = document.querySelector('.body .content');

/**
 * This function is for rendering the ROOT files (and folders) List
 */
function renderRootFileList() {
  renderFileList('public /');
}

/**
 * This function should render any file list in any directories, 
 *  includes folders and subfolders
 *  for each opened directory
 * @param folderPath string 
 */
function renderFileList(folderPath) {
  const url = '/scripts/php/public/renderFilesList.php';

  // Défine data to send (parameters)
  const formData = new URLSearchParams();
  formData.append('folderPath', folderPath);

  // Configure request object
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData
  };

  // Fecth the file Lists 
  fetch(url, options)
    .then(response => response.json())
    .then(async dat => {
      const data = await dat;
      FileListDiv.innerHTML = '';

      // Check if it's an empty directory
      // It should show the name of the last folder (tree) in the navigation Menu (NOT FINISHED YET)
      if (data.length < 1) {
        const navigationDiv = document.querySelector('.right .navigation');
        // navigationDiv.innerHTML = ``;
        FileListDiv.innerHTML = `<h2 style="margin:40px 0 0 20px">Empty Directory</h2>`;
      } else {
        for (let i = 0; i < data.length; i++) {
          // Create single file elements and show data in the page
          const element = data[i],
            folder_id = element.id,
            folderName = element.name,
            folderPath = element.path,
            category = element.category,
            date = element.date;

          FileListDiv.innerHTML += `
            <div class="single-file" id="${folder_id}">
              <div class="name">
                <input type="checkbox" class="check" name="" id="">
                <span class="category ${category}"></span>
                <span class="folder-name" id="${folder_id + 181818}" ondblclick="openFolder('${folderName}','${folder_id}','${category}')">${folderName}</span>
              </div>
              <div class="add-date">
                ${date}
              </div>
              <div class="file-action">
                <div class="rename one-file" onclick="toggleEditModal(${folder_id})" title="Rename"></div>
                <div class="delete one-file" onclick="toggleDeleteModal(${folder_id}, '${folderName}')" title="Delete"></div>
                <div class="download one-file" title="Download"></div>
            </div>
          </div>`;


          // Declare the Actions buttons and one Single File in the file List
          const files = document.querySelectorAll('.single-file');

          // Create a context Menu for each single File in the file list
          files.forEach(file => {

            file.addEventListener('click', removeMenu);

            // Context Menu and Options functionality for each file and folder
            file.addEventListener('contextmenu', (event) => {
              event.preventDefault();

              /**
              *  This function render the position for the new context Menu that have been created.
              *  It's only work inside files.forEach() CallBack
              */
              function renderPosition() {
                let mouseX = event.clientX,
                  mouseY = event.clientY;
                if (mouseX + 200 >= file.offsetWidth) {
                  mouseX -= 210;
                }
                if (mouseY + 200 >= window.innerHeight) {
                  mouseY -= 150;
                }
                const mousePosition = [mouseX, mouseY];
                return mousePosition;
              }
              // Get the position rendered by renderPosition() function
              const Position = renderPosition(),
                mouseX = Position[0],
                mouseY = Position[1];
              const contextMenuDiv = document.querySelector('.one-context-menu');

              // Check if there is an existing context menu
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

              // These are event Handlers for the contextMenu Options
              const renameBtnContextMenu = document.querySelector('.single-file .item.rename-file'),
                deleteBtnMenu = document.querySelector('.single-file .item.delete-file'),
                fileListContainer = document.querySelector('.right div.body');
              fileListContainer.addEventListener('click', removeMenu);
              fileListContainer.addEventListener('contextmenu', (event) => {
                event.preventDefault();
              })

              renameBtnContextMenu.addEventListener('click', () => {
                toggleEditModal(parseInt(deleteBtnMenu.parentElement.parentElement.id), (deleteBtnMenu.parentElement.parentElement.firstElementChild.firstElementChild.nextElementSibling.innerHTML).toString());
                removeMenu();
              });

              deleteBtnMenu.addEventListener('click', () => {
                toggleDeleteModal(parseInt(deleteBtnMenu.parentElement.parentElement.id), (deleteBtnMenu.parentElement.parentElement.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.innerHTML).toString());
                removeMenu();
              });

            });
          })
        }
      }

    })
    .catch(error => {
      console.error('Error :', error);
    });
}