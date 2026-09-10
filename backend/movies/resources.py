from flask import jsonify
from flask.views import MethodView

# Database to hold movie examples
movies = {
    "1": {
        "title": "The Shawshank Redemption",
        "year": "1994",
        "rating": "Rating: 9.3/10",
        "description": (
            "Two imprisoned men bond over a number of years, "
            "finding solace and eventual redemption through acts of common decency."
        ),
    },
    "2": {
        "title": "The Godfather",
        "year": "1972",
        "rating": "Rating: 9.2/10",
        "description": (
            "The aging patriarch of an organized crime dynasty transfers control of "
            "his clandestine empire to his reluctant youngest son."
        ),
    },
    "3": {
        "title": "The Dark Knight",
        "year": "2008",
        "rating": "Rating: 9/10",
        "description": (
            "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, "
            "Batman must accept one of the greatest tests."
        ),
    },
    "4": {
        "title": "Pulp Fiction",
        "year": "1994",
        "rating": "Rating: 8.9/10",
        "description": (
            "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits "
            "intertwine in four tales of violence and redemption."
        ),
    },
    "5": {
        "title": "Forrest Gump",
        "year": "1994",
        "rating": "Rating: 8.8/10",
        "description": (
            "The presidencies of Kennedy and Johnson unfold through the perspective of "
            "an Alabama man with an IQ of 75."
        ),
    },
}


class Movies(MethodView):
    def get(self, movie_id):
        if movie_id is None:
            # Return a list of all movies
            return jsonify({
                "movies": [
                    {
                        "id": i,
                        "title": movie["title"],
                        "year": movie.get("year", ""),
                        "rating": movie.get("rating", ""),
                        "description": movie.get("description", ""),
                    }
                    for i, movie in movies.items()
                ]
            })
        else:
            # Return the details of a specific movie
            movie = movies.get(str(movie_id))
            if not movie:
                return jsonify({"error": "Movie not found"}), 404
            return jsonify({"movie": dict(movie, id=str(movie_id))})
