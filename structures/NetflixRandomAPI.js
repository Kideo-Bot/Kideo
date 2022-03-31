/**
 * @param number {Number};
 * @return {Promise<string>};
 */
async function returnGenreWithNumber(number){
    switch (number){
        case 5:
            return "Action & Adventure";
        case 6:
            return "Animation";

        case 39:
            return "Anime"

        case 7:
            return "Biography"

        case 8:
            return "Children"

        case 9:
            return "Comedy"

        case 10:
            return "Crime"

        case 41:
            return "Cult"

        case 11:
            return "Documentary"

        case 3:
            return "Drama"

        case 12:
            return "Family"

        case 13:
            return "Fantasy"

        case 15:
            return "Food"

        case 16:
            return "Game Show"

        case 17:
            return "History"

        case 18:
            return "Home & Garden"

        case 19:
            return "Cargo"

        case 37:
            return "LGBTQ"

        case 22:
            return "Musical"

        case 23:
            return "Mystery"

        case 25:
            return "Reality"

        case 4:
            return "Romance"

        case 26:
            return "Science-Fiction"

        case 29:
            return "Sport"

        case 45:
            return "Stand-up & Talk"

        case 32:
            return "Thriller"

        case 33:
            return "Travel";

        default: return undefined;
    }
}

module.exports.returnGenreWithNumber = returnGenreWithNumber;