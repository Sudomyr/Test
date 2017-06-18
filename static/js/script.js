var optionBtn = document.querySelector('.option-btn');
var optionPanel = document.querySelector('.option-panel');
var itemsContainer = document.querySelector(".item-list");
var quantityInput = document.querySelector(".quantity-input");
var itemTypeSelect = document.querySelector(".option-panel-select");
var nextPageBtn = document.querySelector(".next-page");
var prevPageBtn = document.querySelector(".prev-page");

var LIMIT = 3;

var currentPage = 1;
var quantity;
var choosedItemType;
addListeners();
readState();

function readState() {
    clearItemsList();

    quantity = +quantityInput.value;
    choosedItemType = itemTypeSelect.value;
    currentPage = 1; // go to first page
    if (!checkValidity()) {
        return;
    }

    redrawItems();
}

function checkValidity() {
    var isValid = !isNaN(quantity) && quantity > 0;
    quantityInput.classList.toggle("with-error", !isValid);

    return isValid;
}

function redrawItems() {
    clearItemsList();
    var itemsCountOnThisPage = getItemsCountForThisPage(); //TODO: refactor

    render(choosedItemType, currentPage, itemsCountOnThisPage);
}

function addListeners() {
    optionBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        showOptionPanel();
    });

    optionPanel.addEventListener('click', function (e) {
        e.stopPropagation();
    });
    document.addEventListener("click", hideOptionPanel);

    prevPageBtn.addEventListener('click', goToPrevPage);
    nextPageBtn.addEventListener('click', goToNextPage);
    quantityInput.addEventListener("keyup", readState);
    itemTypeSelect.addEventListener("change", readState);
}

function hideOptionPanel() {
    optionPanel.classList.remove('is-opened');
}

function showOptionPanel() {
    optionPanel.classList.toggle('is-opened');
}

function goToPrevPage() {
    if (currentPage <= 1) {
        return;
    }

    currentPage--;
    redrawItems();
}

function goToNextPage() {
    if (currentPage >= getPagesCount()) {
        return;
    }

    currentPage++;
    redrawItems();
}

function getItemsCountForThisPage() {
    return Math.min(LIMIT, LIMIT - (LIMIT * currentPage - quantity));
}

function getPagesCount() {
    return Math.ceil(quantity / LIMIT);
}

function clearItemsList() {
    itemsContainer.innerHTML = "";
}

function render(type, currentPage, itemsPerPage) {
    for (var index = 1; index <= itemsPerPage; index++) {
        var order = (currentPage - 1) * LIMIT + index;
        var item = createItem(type, order);
        itemsContainer.appendChild(item);
    }
}

function createItem(type, order) {
    var root = createDOMElement({
        tagName: "li",
        className: "item"
    });
    var numberBox = createDOMElement({
        tagName: "div",
        className: "item-number-box"
    });
    var numberText = createDOMElement({
        tagName: "span",
        className: "item-number-text",
        textContent: order
    });
    numberBox.appendChild(numberText);

    var itemName = createDOMElement({
        tagName: "span",
        className: "item-name",
        textContent: "Item " + type + order
    });

    root.appendChild(numberBox);
    root.appendChild(itemName);

    return root;
}

function createDOMElement(options) {
    var el = document.createElement(options.tagName);
    el.className = options.className || "";
    el.textContent = options.textContent;

    return el;
}