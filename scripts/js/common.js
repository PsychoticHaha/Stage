// This file is a handler for popup message managing (success and error)  for UX purpose
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

function removePopupTimeOut(elementToHide) {
  setTimeout(() => {
    removePopup(elementToHide);
  }, 4000);
}

function removePopup(element = undefined) {
  if (element != undefined) {
    element.classList.add('hide');
    setTimeout(() => {
      element.remove();
    }, 1000);
  }
}

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