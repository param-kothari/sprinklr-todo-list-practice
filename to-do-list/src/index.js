"use strict";
/**
 * Helper function to create an HTML element given the type,
 * set of attributes, and styles to be added in classList.
 * Makes the creation of a new HTML element more readable.
 */
function createHTMLElement(type, attributes, classList) {
    var element = document.createElement(type);
    Object.keys(attributes).forEach(function (key) {
        var value = attributes[key];
        element.setAttribute(key, value);
    });
    classList.forEach(function (name) {
        element.classList.add(name);
    });
    return element;
}
/**
 * Helper function to add a new to-do list along with options
 * to add new cards to the list.
 */
function addNewCard(listItems, addCardBtn) {
    var newCardTitle = createHTMLElement("div", {
        id: "card-title"
    }, []);
    var titleInput = createHTMLElement("input", {
        type: "text",
        id: "card-title-text",
        placeholder: "Enter card title"
    }, ["card-title-text"]);
    newCardTitle.append(titleInput);
    var newCardTitleBtns = createHTMLElement("div", {}, ["card-title-div-btn"]);
    var confirmTitleBtn = createHTMLElement("input", {
        type: "button",
        id: "confirm-card-title-btn",
        value: "Add card"
    }, ["card-title-confirm-btn"]);
    confirmTitleBtn.onclick = function (e) {
        var _a;
        e.preventDefault();
        var newCard = createHTMLElement("li", {}, ["list-items>li"]);
        var listItemsContainer = (_a = addCardBtn === null || addCardBtn === void 0 ? void 0 : addCardBtn.parentElement) === null || _a === void 0 ? void 0 : _a.children[1];
        if (listItemsContainer && titleInput.value && titleInput.value.length > 0) {
            newCard.innerText = titleInput.value;
            listItemsContainer.append(newCard);
            listItemsContainer.scrollTop = listItems.scrollHeight;
        }
        titleInput.value = "";
    };
    newCardTitleBtns.append(confirmTitleBtn);
    var cancelTitleBtn = createHTMLElement("input", {
        type: "button",
        id: "cancel-card-title-btn",
        value: "Cancel"
    }, ["card-title-cancel-btn"]);
    cancelTitleBtn.onclick = function (e) {
        e.preventDefault();
        newCardTitle.style.display = "none";
        addCardBtn.style.display = "block";
    };
    newCardTitleBtns.append(cancelTitleBtn);
    newCardTitle.append(newCardTitleBtns);
    listItems.append(addCardBtn);
    listItems.append(newCardTitle);
    newCardTitle.style.display = "none";
    return;
}
document.querySelector(".js-add-list").onclick = function () {
    var addListBtn = document.querySelector(".js-add-list");
    var addListDiv = document.querySelector(".js-add-list-header");
    var addListContainer = addListBtn === null || addListBtn === void 0 ? void 0 : addListBtn.parentElement;
    if (!addListBtn || !addListDiv) {
        return;
    }
    addListBtn.style.display = "none";
    addListDiv.style.display = "block";
    var confirmBtn = document.getElementById("confirm-list-header-btn");
    var cancelBtn = document.getElementById("cancel-list-header-btn");
    confirmBtn.onclick = function (e) {
        var _a;
        e.preventDefault();
        if (!addListBtn || !addListDiv) {
            return;
        }
        var inputTextHeading = document.getElementById("list-header-text");
        if (inputTextHeading && inputTextHeading.value && inputTextHeading.value.length > 0) {
            var newList = createHTMLElement("div", {}, ["list"]);
            var newListHeader = createHTMLElement("div", {
                contentEditable: "true"
            }, ["list-header"]);
            newListHeader.innerText = inputTextHeading.value;
            newListHeader.onclick = function (e) {
                e.preventDefault();
                document.execCommand('selectAll', false, "null");
            };
            newList.append(newListHeader);
            var newListItems = createHTMLElement("ul", {}, ["list-items"]);
            newList.append(newListItems);
            var newAddCardBtn_1 = createHTMLElement("button", {}, ["add-card", "btn"]);
            newAddCardBtn_1.innerText = "Add card";
            newAddCardBtn_1.onclick = function (e) {
                var _a;
                e.preventDefault();
                // [0]: Header, [1]: List Items, [2]: Add Card Button, [3]: Card Title Options
                var cardTitleOptions = (_a = newAddCardBtn_1 === null || newAddCardBtn_1 === void 0 ? void 0 : newAddCardBtn_1.parentElement) === null || _a === void 0 ? void 0 : _a.children[3];
                if (cardTitleOptions && newAddCardBtn_1.style.display === "block") {
                    newAddCardBtn_1.style.display = "none";
                    cardTitleOptions.style.display = "block";
                }
                else if (cardTitleOptions) {
                    newAddCardBtn_1.style.display = "none";
                    cardTitleOptions.style.display = "block";
                }
            };
            // Add the "Add card" button to the newly created list along
            // with the options to add new cards in the same list.
            addNewCard(newList, newAddCardBtn_1);
            (_a = addListContainer === null || addListContainer === void 0 ? void 0 : addListContainer.parentElement) === null || _a === void 0 ? void 0 : _a.insertBefore(newList, addListContainer);
            inputTextHeading.value = "";
            return;
        }
    };
    cancelBtn.onclick = function (e) {
        e.preventDefault();
        if (!addListBtn || !addListDiv) {
            return;
        }
        addListDiv.style.display = "none";
        addListBtn.style.display = "block";
        var inputTextHeading = document.getElementById("list-header-text");
        inputTextHeading.value = "";
    };
    return;
};
