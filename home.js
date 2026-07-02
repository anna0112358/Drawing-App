document.addEventListener('DOMContentLoaded', async () => {
    for (let i = 0; i < localStorage.length; i++) {
        if(localStorage.key(i) != "pageToDisplay") {
            const newLink = document.createElement('a');
            newLink.innerHTML = localStorage.key(i);
            const linksForSaved = document.getElementById('savedDrawings');
            newLink.classList = "savedImage";
            newLink.setAttribute('href', 'drawing.html');
            linksForSaved.append(newLink);
        }
    }
    
    let saved = document.querySelectorAll('a');
    for (let i = 0; i < saved.length; i++) {
        saved[i].addEventListener('click', () => {
            localStorage.pageToDisplay = saved[i].innerHTML;
        });
    }
});