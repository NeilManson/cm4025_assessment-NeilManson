function showDiv() {
    console.log("working")
    const container = document.getElementById('additional-costs');
    const section = document.getElementById('resources')
    container.appendChild(section.cloneNode(true));
}