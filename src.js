//ideally, I would have this info in a DB or json file
const movieList = {
    "0": {
        "title": "toy story",
        "i": "tt0114709"
    },
    "1": {
        "title": "texas chainsaw massacre",
        "i": "tt0072271"
    },
    "2": {
        "title": "Jaws",
        "i": "tt0073195"
    },
    "3": {
        "title": "Edward Scissorhands",
        "i": "tt0099487"
    },
    "4": {
        "title": "Home Alone",
        "i": "tt0099785"
    },
    "5": {
        "title": "The Great Mouse Detective",
        "i": "tt0091149"
    },
    "6": {
        "title": "Joe Versus the Volcano",
        "i": "tt0099892"
    },
    "7": {
        "title": "Armageddon",
        "i": "tt0120591"
    },
    "8": {
        "title": "Jurassic Park",
        "i": "tt0107290"
    },
    "9": {
        "title": "Pinocchio",
        "i": "tt0032910"
    },
    "10": {
        "title": "Fight Club",
        "i": "tt0137523"
    }
}

class Movie {
    constructor(movieList) {
        this.movieTitle = null;
        this.moviePlot = null;
        //Ideally keys would be set on the backend
        this.imdbKey = "14c8c5bf";
        this.movieList = movieList;

    }

    getTitle() {
        return this.movieTitle;
    }

    getRandomMovieId() {
        let randNum = Math.floor(Math.random() * Object.keys(movieList).length);
        return movieList[randNum].i;
    }

    fetchMovie() {
        const url = `https://www.omdbapi.com/?apikey=${this.imdbKey}&i=${this.getRandomMovieId()}`;

        fetch(url)
            .then(response => {
                if (response.ok) return response.json();
                throw new Error(response.statusText)
            })
            .then((data) => {
                this.movieTitle = data.Title;
                this.moviePlot = data.Plot;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getCleanedPlot() {
        let plot = this.moviePlot.split(" ");
        let filterwords = ["a", "A", "An", "an", "of", "or", "in", "In", "to", "the", "The", "and",
            "is", "their", "en", "end", "up", "him", "her", "his", "he", "she", "then", "Then",
            "when", "When", "who", "has", "for", "was", "as", "on", "it", "It", "it's", "its", "that",
            "at", "by", "from", "must", "during"];

        let newPlot = plot.filter((word) => {
            if (filterwords.includes(word) == false) return word
        });
        return newPlot;
    }
}

class Images {
    constructor(plotWords) {
        this.imgKey = "16964559-ae29c452702915ea55634061e";
        this.imageData = [];
        this.plotWords = plotWords;
    }

    fetchImages() {
        this.plotWords.map((searchTerm) => {
            let url = `https://pixabay.com/api/?key=${this.imgKey}&q=${searchTerm}&image_type=photo`;

            fetch(url)
                .then(response => {
                    if (response.ok) return response.json();
                    throw new Error(response.statusText)
                })
                .then((data) => {
                    this.imageData.push([searchTerm, data.hits[0].webformatURL]);
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }
}

const reveal = document.getElementById("reveal");
const movieTitle = document.getElementById("movieTitle");

const movie = new Movie(movieList);
movie.fetchMovie();

//Not proud of the setTimeouts, need to write better promises to ensure synchronous loading
setTimeout(function () {
    movieTitle.innerHTML = `<h1>${movie.getTitle()}</h1><p>Hover Over the Images to View Key Words</p>`;
    let images = new Images(movie.getCleanedPlot());
    images.fetchImages();
    setTimeout(function () {
        let imgContainer = document.getElementById("images");
        images.imageData.map((data) => {
            imgContainer.innerHTML += `<img title=${data[0]} src=${data[1]}/>`;
        });
    }, 500);
}, 1000);

reveal.addEventListener("click", function () {
    movieTitle.style.color = "#444444";
});