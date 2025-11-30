const key = 'axSHpnNUGKksm3biP9X4iBUbPb09eUkzn4uDCFGY16NsdN04PfdILAsk';
const photoContainer = document.querySelector('.photos');
const searchInput = document.querySelector('.search');
const btn = document.querySelector('.btn-1');
const moreBtn = document.querySelector('.more');
let page = 1;

btn.addEventListener('click', () => {
    const term = searchInput.value;
    if (term) {
        page = 1;
        photoContainer.innerHTML = '';
        searchPhotos(term);
    }
});

moreBtn.addEventListener('click', () => {
    const term = searchInput.value;
    if (term) {
        page++;
        loadPhotos(term);
    }
});

function searchPhotos(term) {
    loadPhotos(term);
}

function loadPhotos(term) {
    const url = term ? `https://api.pexels.com/v1/search?query=${term}&per_page=5&page=${page}` : `https://api.pexels.com/v1/curated?per_page=5&page=${page}`;
    fetch(url, {
        headers: {
            Authorization: key
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        data.photos.forEach(image => {
            const imgDiv = document.createElement('div');
            imgDiv.classList.add('photo');
            imgDiv.innerHTML = `
                <div class="img-photo">
                    <p>${image.photographer}</p>
                    <img src="${image.src.large}" alt="${image.alt}" />
                    <a href="${image.src.original}" target="_blank">Download</a>
                </div>
            `;
            photoContainer.appendChild(imgDiv);
        });
    })
    .catch(error => console.error('Error fetching photos:', error));
}

loadPhotos();
