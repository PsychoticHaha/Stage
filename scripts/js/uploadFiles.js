const uploadBtn = document.querySelector('.actions .icon.upload'),
  selectedFilesDiv = document.querySelector('.selected-files-list'),
  filesInput = document.getElementById('filesInput');

filesInput.addEventListener('change', displaySelectedFiles);

/**
 * Display Selected files in the Upload Modal to permit an ajustment
 */
function displaySelectedFiles() {
  selectedFilesDiv.innerHTML = '';

  for (let i = 0; i < filesInput.files.length; i++) {
    const fileName = filesInput.files[i].name;
    const listItem = document.createElement('div');
    listItem.classList.add('item');
    listItem.textContent = fileName;

    // Pass the file Index to delete as argument
    listItem.innerHTML += `<div class="close-btn" onclick="removeFile(${i})">&times;</div>`;

    selectedFilesDiv.appendChild(listItem);
    // console.log((filesInput.files[i]));
  }
}

/**
 *  Remove a file in the fileList
 */
function removeFile(indexToRemove) {
  const filesArray = Array.from(filesInput.files);

  if (indexToRemove >= 0 && indexToRemove < filesArray.length) {
    filesArray.splice(indexToRemove, 1);
    updateFileInput(filesArray);
    displaySelectedFiles();
  } else {
    console.log("The Index not found in the FileList.");
  }
}
// Update the fileList after deleting
function updateFileInput(newFiles) {
  const newFileList = new DataTransfer();

  newFiles.forEach((file) => {
    newFileList.items.add(file);
  });

  filesInput.files = newFileList.files;
}

// Toggle the modal when click on Upload Button
uploadBtn.addEventListener('click', () => {
  toggleUploadModal();
})

/**
 * Show / Hide the upload Modal
 */
function toggleUploadModal() {
  selectedFilesDiv.innerHTML = `<h4>Wait for the window to open...</h4>`;
  const modal = document.querySelector('.modal-upload');
  if (!modal.classList.contains('show')) {
    modal.classList.add('show');
  } else {
    modal.classList.remove('show');
  }
}

/**
 *  Upload files using FetchAPI
 */ 
function uploadFiles() {
  const form = document.getElementById('uploadForm');
  const formData = new FormData(form);

  fetch('scripts/php/public/uploadFiles.php', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(async data => {
      console.log(data);
      if (data == 'Not_dir') {
        renderPopupMsg('error', 'Please, select a directory');
      } else if (data.includes('Files uploaded')) {
        renderPopupMsg('success', data);
        const currentPath = await actualPath();
        // Replace backslashes into slashes
        const pathToRender = currentPath.replace(/\\/g, '/');
        // Render the new content of the open folder
        renderFileList(pathToRender);

        toggleUploadModal();
      } else {
        renderPopupMsg('error', 'Error:' + data);
      }

    })
    .catch(error => {
      console.error('Request error :', error);
    });
}