// This file is a handler for popup message managing (success and error) and common config.  for UX purpose
const popupMsg = document.querySelector('.message-popup'),
  popupCloseBtn = document.querySelector('.message-popup .close-btn');

if (popupMsg) {
  document.addEventListener('DOMContentLoaded', () => {
    removePopupTimeOut(popupMsg);
    popupCloseBtn.addEventListener('click', () => {
      removePopup(popupMsg);
    });
  });
}

/**
 * This function remove any popup message with a delay of 4s
 * It must be only called inside renderPopupMsg function
 * @param {Element} elementToHide 
 */
function removePopupTimeOut(elementToHide) {
  setTimeout(() => {
    removePopup(elementToHide);
  }, 4000);
}

/**
 * This function remove any popup message WITHOUT delay
 * It must be only called inside renderPopupTimeOut function
 * @param {Element} element
 */
function removePopup(element = undefined) {
  if (element != undefined) {
    element.classList.add('hide');
    setTimeout(() => {
      element.remove();
    }, 1000);
  }
}

/**
 * This function render any popup message (notification)
 * @param msgType string (Only two options, sucess or error)
 * @param text string (Message content)
 */
function renderPopupMsg(msgType, text) {
  const div = document.createElement('div');
  div.classList.add('message-popup', msgType);
  div.innerHTML = text + `<div class="close-btn">&times;</div>`;
  document.body.appendChild(div);

  const popupMsg = document.querySelector('.message-popup'),
    popupCloseBtn = document.querySelector('.message-popup .close-btn');
  popupCloseBtn.addEventListener('click', () => {
    removePopup(popupMsg);
  });
  removePopupTimeOut(div);
}

/** Back to Root Folder (Navigation)
** const rootFolder = document.getElementById('root');
*/
function backToRoot() {
  const navigationDiv = document.querySelector('.right .navigation');
  navigationDiv.innerHTML = `
  <div class="folder-name" id="root" onclick="backToRoot()">
    public /
  </div>
  `;
  openFolder('public /', 1,'folder');
  renderRootFileList();
};
