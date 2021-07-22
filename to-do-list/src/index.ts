"use strict";

/**
 * Helper function to create an HTML element given the type,
 * set of attributes, and styles to be added in classList.
 * Makes the creation of a new HTML element more readable.
 */
function createHTMLElement(type: string, attributes: {[key: string]: string}, classList: string[]): HTMLElement {
    const element: HTMLElement = document.createElement(type);

    Object.keys(attributes).forEach(key => {
        const value = attributes[key];
        element.setAttribute(key, value);
    });

    classList.forEach(name => {
        element.classList.add(name);
    });

    return element;
}

/**
 * Helper function to add a new to-do list along with options
 * to add new cards to the list.
 */
function addNewCard(listItems: HTMLDivElement, addCardBtn: HTMLButtonElement): void {

    const newCardTitle = createHTMLElement("div", {
        id: "card-title",
    }, []) as HTMLDivElement;

    const titleInput = createHTMLElement("input", {
        type: "text",
        id: "card-title-text",
        placeholder: "Enter card title",
        required: "true",
    }, [ "card-title-text" ]) as HTMLInputElement;

    newCardTitle.append(titleInput);

    const newCardTitleBtns = createHTMLElement("div", {}, [ "card-title-div-btn" ]) as HTMLDivElement;

    const confirmTitleBtn = createHTMLElement("input", {
        type: "button",
        id: "confirm-card-title-btn",
        value: "Add card",
    }, [ "card-title-confirm-btn" ]) as HTMLInputElement;
    confirmTitleBtn.onclick = function(e) {
        e.preventDefault();

        const newCard = createHTMLElement("li", {}, [ "list-items>li" ]);

        const listItemsContainer= addCardBtn?.parentElement?.children[1];
        if(listItemsContainer && titleInput.value && titleInput.value.length > 0) {
            newCard.innerText = titleInput.value;
            listItemsContainer.append(newCard);
            listItemsContainer.scrollTop = listItems.scrollHeight;
        }

        titleInput.value = "";
    };

    newCardTitleBtns.append(confirmTitleBtn);

    const cancelTitleBtn = createHTMLElement("input", {
        type: "button",
        id: "cancel-card-title-btn",
        value: "Cancel",
    }, [ "card-title-cancel-btn" ]) as HTMLInputElement;
    cancelTitleBtn.onclick= function(e) {
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

/**
 * Function that gets triggered upon clicking the "Add another list" button.
 */
(document.querySelector(".js-add-list") as HTMLButtonElement).onclick = function(): void {

    const addListBtn: HTMLButtonElement | null = document.querySelector(".js-add-list");
    const addListDiv: HTMLDivElement | null = document.querySelector(".js-add-list-header");
    const addListContainer = addListBtn?.parentElement;

    if(!addListBtn || !addListDiv) {
        return;
    }

    addListBtn.style.display = "none";
    addListDiv.style.display = "block";

    const confirmBtn: HTMLButtonElement | null = document.getElementById(
        "confirm-list-header-btn") as HTMLButtonElement;
    const cancelBtn: HTMLButtonElement | null = document.getElementById(
        "cancel-list-header-btn") as HTMLButtonElement;

    confirmBtn.onclick = function(e) {
        e.preventDefault();
        if(!addListBtn || !addListDiv) {
            return;
        }

        const inputTextHeading: HTMLInputElement | null = document.getElementById(
            "list-header-text") as HTMLInputElement;

        if(inputTextHeading && inputTextHeading.value && inputTextHeading.value.length > 0) {
            const newList = createHTMLElement("div", {}, [ "list" ]) as HTMLDivElement;

            const newListHeader = createHTMLElement("div", {
                contentEditable: "true",
            }, [ "list-header" ]) as HTMLDivElement;
            newListHeader.innerText = inputTextHeading.value;
            newListHeader.onclick = function(e) {
                e.preventDefault();
                document.execCommand('selectAll', false, "null");
            };
            newList.append(newListHeader);

            const newListItems = createHTMLElement("ul", {}, [ "list-items" ]) as HTMLUListElement;
            newList.append(newListItems);

            const newAddCardBtn = createHTMLElement("button", {}, [ "add-card", "btn" ]) as HTMLButtonElement;
            newAddCardBtn.innerText = "Add card";
            newAddCardBtn.onclick = function(e) {
                e.preventDefault();

                // [0]: Header, [1]: List Items, [2]: Add Card Button, [3]: Card Title Options
                const cardTitleOptions = newAddCardBtn?.parentElement?.children[3] as HTMLDivElement;

                if(cardTitleOptions && newAddCardBtn.style.display === "block") {
                    newAddCardBtn.style.display = "none";
                    cardTitleOptions.style.display = "block";
                } else if(cardTitleOptions) {
                    newAddCardBtn.style.display = "none";
                    cardTitleOptions.style.display = "block";
                }
            };

            // Add the "Add card" button to the newly created list along
            // with the options to add new cards in the same list.
            addNewCard(newList, newAddCardBtn);

            addListContainer?.parentElement?.insertBefore(newList, addListContainer);
            inputTextHeading.value = "";
            return;
        }
    };

    cancelBtn.onclick = function(e) {
        e.preventDefault();
        if(!addListBtn || !addListDiv) {
            return;
        }
        addListDiv.style.display = "none";
        addListBtn.style.display = "block";
        let inputTextHeading: HTMLInputElement | null = document.getElementById(
            "list-header-text") as HTMLInputElement;
        inputTextHeading.value = "";
    };

    return;
};