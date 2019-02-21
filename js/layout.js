
window.onload = function () {

}

function set_block_modal_content(name) {
    const content = document.getElementById(name)
    content.style.display = "block"
}

function set_visible_modal() {
    const modal = document.getElementsByClassName("modal")[0]
    const content = document.getElementsByClassName("modal-content")[0]
    modal.style.visibility = "visible"
    content.style.transform = 'translate(0px, 5em)'
}

function set_hidden_modal() {
    const content = document.getElementsByClassName("modal-content")[0]
    content.style.transform = 'translate(0px, 0px)'
    setTimeout(remove_contents, 600)
}

function remove_contents() {
    const modal = document.getElementsByClassName("modal")[0]
    modal.style.visibility = "hidden"

    const contents = document.getElementsByClassName("content")
    for (let i = 0; i < contents.length; ++i) {
        contents[i].style.display = "none"
    }
}

function view_modal(name) {
    set_block_modal_content(name)
    set_visible_modal()
}