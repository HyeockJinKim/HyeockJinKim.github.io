window.onload = function () {
};

function set_block_modal_content(name) {
    const content = document.getElementById(name);
    content.style.display = "block"
}

function set_visible_modal() {
    const modal = document.getElementsByClassName("modal")[0];
    const content = document.getElementsByClassName("modal-content")[0];
    modal.style.visibility = "visible";
    content.style = 'width: 30em; height: 40em;'
}

function set_hidden_modal() {
    const content = document.getElementsByClassName("modal-content")[0];
    content.style = 'width: 0; height: 0;';
    setTimeout(remove_contents, 350)
}

function remove_contents() {
    const modal = document.getElementsByClassName("modal")[0];
    modal.style.visibility = "hidden";

    const contents = document.getElementsByClassName("content");
    for (let i = 0; i < contents.length; ++i) {
        contents[i].style.display = "none"
    }
}

function view_modal(name) {
    set_block_modal_content(name);
    set_visible_modal()
}

function view_category(name) {
    const content = document.getElementsByClassName(name)[0];
    if (content.style.maxHeight === '50em')
        content.style.maxHeight = '0';
    else
        content.style.maxHeight = '50em';
}