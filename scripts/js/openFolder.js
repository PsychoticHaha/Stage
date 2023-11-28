function openFolder(folderName, fileId, category) {
  if (category == 'folder') {
    const navigationDiv = document.querySelector('.right .navigation');
    const url = '/scripts/php/public/getPath.php';

    // Défine data to send (parameters)
    const formData = new URLSearchParams();
    formData.append('fileId', fileId);

    // Configure request object (options for fetch())
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData
    };
    // Set the active path to root Folder
    if (folderName == 'public /') {
      fetch(url, options).catch(error => {
        console.error('Error :', error);
      });
    } else {
      navigationDiv.innerHTML += `
  <div class="folder-name">
    <div class="arrow"></div>
    ${folderName}
  </div>
  `;

      // Set the new active folder then render the file Lists 
      fetch(url, options)
        .then(response => response.json())
        .then(newPath => {
          renderFileList(newPath);
        })
        .catch(error => {
          console.error('Error :', error);
        });
    }
  } else if (category == 'fil') {
    // Process to file opening here
  }
} 
