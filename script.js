var optionBtn = document.querySelector('.option-btn');
optionBtn.addEventListener('click', function () {

    var optionPanel = document.querySelector('.hidden-option-panel');
    optionPanel.classList.toggle('open-option-panel');

    var obj = document.querySelector('.main-wrapper-obj');
    obj.classList.toggle('main-wrapper-obj-hide');

});