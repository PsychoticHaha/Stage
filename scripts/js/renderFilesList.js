document.addEventListener('DOMContentLoaded', () => {
  renderFileList();
})
function renderFileList() {
  const url = '/scripts/php/public/renderFilesList.php';
  // Fecth the folerList
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const FileListDiv = document.querySelector('.body .content');
      FileListDiv.innerHTML = '';

      // Create element and show data in the page
      for (let i = 0; i < data.length; i++) {
        const element = data[i],
          folderName = element.folder_name,
          folderPath = element.folder_path,
          add_date = element.add_date;
        
        FileListDiv.innerHTML += `
      <div class="single-file">
        <div class="name">
            <input type="checkbox" class="check" name="" id="">
             ${folderName}
          </div>
          <div class="add-date">
            ${add_date}
          </div>
          <div class="file-action">
            <div class="rename one-file" title="Rename"></div>
            <div class="delete one-file" title="Delete"></div>
            <div class="download one-file" title="Download"></div>
        </div>
      </div>`;
        console.log(folderName, folderPath, add_date);















        
      }
    })
    .catch(error => {
      console.error('Error :', error);
    });
}