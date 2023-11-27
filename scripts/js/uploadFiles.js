const uploadBtn = document.querySelector('.actions .icon.upload'),
 fileListDiv = document.querySelector('.selected-files-list'),
  filesInput = document.getElementById('filesInput');

filesInput.addEventListener('change', displaySelectedFiles);

function displaySelectedFiles() {
  fileListDiv.innerHTML = ''; 

  for (let i = 0; i < filesInput.files.length; i++) {
    const fileName = filesInput.files[i].name;
    const listItem = document.createElement('div');
    listItem.classList.add('item');
    listItem.textContent = fileName;

    // Pass the file Index to delete as argument
    listItem.innerHTML += `<div class="close-btn" onclick="removeFile(${i})">&times;</div>`;

    fileListDiv.appendChild(listItem);
    console.log((filesInput.files[i]));
  }
}

// Remove a file in the fileList
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

function toggleUploadModal() {
  fileListDiv.innerHTML = '';
  const modal = document.querySelector('.modal-upload');
  if (!modal.classList.contains('show')) {
    modal.classList.add('show');
  } else {
    modal.classList.remove('show');
  }
}

// Upload files using FetchAPI
function uploadFiles() {
  const form = document.getElementById('uploadForm');
  const formData = new FormData(form);

  fetch('scripts/php/public/uploadFiles.php', {
    method: 'POST',
    body: formData
  })
    .then(response => response.text())
    .then(data => {
      console.log(data);
      // Traiter la réponse du serveur ici
    })
    .catch(error => {
      console.error('Erreur lors de la requête :', error);
    });
}