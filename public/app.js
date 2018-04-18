(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        // https://newsapi.org/v2/top-headlines?country=${searchedForText}&category=business&apiKey=b55e5dfc611648fe8751ac563c42680d

        fetch(`https://newsapi.org/v2/top-headlines?country=${searchedForText}&category=business&apiKey=b55e5dfc611648fe8751ac563c42680d`)
            .then(response => response.json())
            .then(addArticles)
            .catch(err => requestError(err, 'image'));


        function requestError(err, part) {
            console.log(err);
            responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
        }
        function addArticles(data) {
            let htmlContent = '';
            //const data = JSON.parse(this.responseText);

            if (data.articles && data.articles.length > 1) {
                htmlContent = '<ul>' + data.articles.map(article =>
                    `<li class="article">
                    <h2><a href="${article.url}">${article.title}</a></h2>
                    <p>${article.description}</p></li>`
                ).join('') + '</ul>';
            } else {
                htmlContent = '<div class="error-no-articles">No articles available</div>';
            }
            responseContainer.insertAdjacentHTML('beforeend', htmlContent);
        }
    });
})();
