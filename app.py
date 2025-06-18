#!/usr/bin/env python3
"""
Movie Database Web Application
A simple Flask web server for serving the movie database application
"""

from flask import Flask, render_template, jsonify, request, send_from_directory
import json
import os
from datetime import datetime

app = Flask(__name__)

# Sample movie data
MOVIES_DATA = [
    {
        "id": "1",
        "title": "Темный рыцарь",
        "year": 2008,
        "genre": ["Боевик", "Криминал", "Драма"],
        "director": "Кристофер Нолан",
        "actors": ["Кристиан Бэйл", "Хит Леджер", "Аарон Экхарт", "Майкл Кейн"],
        "plot": "Когда угроза, известная как Джокер, сеет хаос и разрушения среди жителей Готэма, Бэтмен должен принять один из величайших психологических и физических вызовов своей способности бороться с несправедливостью.",
        "rating": 9.0,
        "duration": 152,
        "poster": "https://images.pexels.com/photos/1200450/pexels-photo-1200450.jpeg",
        "trailer": "https://www.youtube.com/embed/EXeTwQWrcwY",
        "releaseDate": "2008-07-18",
        "language": "Английский",
        "country": "США",
        "awards": ["Оскар за лучшую мужскую роль второго плана", "BAFTA за лучшую мужскую роль второго плана"],
        "reviews": [
            {
                "id": "1",
                "author": "Иван Петров",
                "rating": 9,
                "comment": "Абсолютный шедевр. Игра Хита Леджера в роли Джокера незабываема.",
                "date": "2023-01-15"
            }
        ]
    },
    {
        "id": "2",
        "title": "Начало",
        "year": 2010,
        "genre": ["Боевик", "Фантастика", "Триллер"],
        "director": "Кристофер Нолан",
        "actors": ["Леонардо ДиКаприо", "Марион Котийяр", "Том Харди", "Эллен Пейдж"],
        "plot": "Вор, который крадет корпоративные секреты с помощью технологии совместного сновидения, получает обратную задачу - внедрить идею в сознание генерального директора.",
        "rating": 8.8,
        "duration": 148,
        "poster": "https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg",
        "trailer": "https://www.youtube.com/embed/YoHD9XEInc0",
        "releaseDate": "2010-07-16",
        "language": "Английский",
        "country": "США",
        "awards": ["Оскар за лучшую операторскую работу", "Оскар за лучший звуковой монтаж"],
        "reviews": []
    }
]

# In-memory storage for movies (in production, use a proper database)
movies_db = MOVIES_DATA.copy()

@app.route('/')
def index():
    """Serve the main application page"""
    return send_from_directory('.', 'index.html')

@app.route('/styles.css')
def styles():
    """Serve CSS file"""
    return send_from_directory('.', 'styles.css')

@app.route('/script.js')
def script():
    """Serve JavaScript file"""
    return send_from_directory('.', 'script.js')

@app.route('/api/movies', methods=['GET'])
def get_movies():
    """Get all movies with optional filtering"""
    query = request.args.get('query', '').lower()
    genre = request.args.get('genre', 'all')
    year = request.args.get('year', 'all')
    rating = request.args.get('rating', 'all')
    
    filtered_movies = movies_db.copy()
    
    # Apply filters
    if query:
        filtered_movies = [
            movie for movie in filtered_movies
            if (query in movie['title'].lower() or
                any(query in actor.lower() for actor in movie['actors']) or
                query in movie['director'].lower())
        ]
    
    if genre != 'all':
        genre_map = {
            'action': 'Боевик',
            'adventure': 'Приключения',
            'comedy': 'Комедия',
            'crime': 'Криминал',
            'drama': 'Драма',
            'horror': 'Ужасы',
            'romance': 'Романтика',
            'sci-fi': 'Фантастика',
            'thriller': 'Триллер'
        }
        if genre in genre_map:
            filtered_movies = [
                movie for movie in filtered_movies
                if genre_map[genre] in movie['genre']
            ]
    
    if year != 'all':
        try:
            year_int = int(year)
            filtered_movies = [
                movie for movie in filtered_movies
                if movie['year'] == year_int
            ]
        except ValueError:
            pass
    
    if rating != 'all':
        try:
            min_rating = float(rating)
            filtered_movies = [
                movie for movie in filtered_movies
                if movie['rating'] >= min_rating
            ]
        except ValueError:
            pass
    
    return jsonify({
        'movies': filtered_movies,
        'total': len(filtered_movies)
    })

@app.route('/api/movies/<movie_id>', methods=['GET'])
def get_movie(movie_id):
    """Get a specific movie by ID"""
    movie = next((m for m in movies_db if m['id'] == movie_id), None)
    if movie:
        return jsonify(movie)
    return jsonify({'error': 'Movie not found'}), 404

@app.route('/api/movies', methods=['POST'])
def add_movie():
    """Add a new movie"""
    try:
        movie_data = request.get_json()
        
        # Generate new ID
        new_id = str(max(int(m['id']) for m in movies_db) + 1)
        movie_data['id'] = new_id
        
        # Add default reviews if not provided
        if 'reviews' not in movie_data:
            movie_data['reviews'] = []
        
        # Validate required fields
        required_fields = ['title', 'year', 'genre', 'director', 'actors', 'plot', 'rating', 'duration', 'poster']
        for field in required_fields:
            if field not in movie_data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        movies_db.append(movie_data)
        return jsonify(movie_data), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/movies/<movie_id>', methods=['PUT'])
def update_movie(movie_id):
    """Update an existing movie"""
    try:
        movie_data = request.get_json()
        movie_index = next((i for i, m in enumerate(movies_db) if m['id'] == movie_id), None)
        
        if movie_index is None:
            return jsonify({'error': 'Movie not found'}), 404
        
        # Keep the original ID
        movie_data['id'] = movie_id
        movies_db[movie_index] = movie_data
        
        return jsonify(movie_data)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/movies/<movie_id>', methods=['DELETE'])
def delete_movie(movie_id):
    """Delete a movie"""
    global movies_db
    movies_db = [m for m in movies_db if m['id'] != movie_id]
    return jsonify({'message': 'Movie deleted successfully'})

@app.route('/api/movies/<movie_id>/reviews', methods=['POST'])
def add_review(movie_id):
    """Add a review to a movie"""
    try:
        review_data = request.get_json()
        movie = next((m for m in movies_db if m['id'] == movie_id), None)
        
        if not movie:
            return jsonify({'error': 'Movie not found'}), 404
        
        # Generate new review ID
        existing_review_ids = [int(r['id']) for r in movie.get('reviews', []) if r['id'].isdigit()]
        new_review_id = str(max(existing_review_ids, default=0) + 1)
        
        review_data['id'] = new_review_id
        review_data['date'] = datetime.now().strftime('%Y-%m-%d')
        
        if 'reviews' not in movie:
            movie['reviews'] = []
        
        movie['reviews'].append(review_data)
        return jsonify(review_data), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Get database statistics"""
    total_movies = len(movies_db)
    genres = {}
    years = {}
    
    for movie in movies_db:
        # Count genres
        for genre in movie['genre']:
            genres[genre] = genres.get(genre, 0) + 1
        
        # Count years
        year = movie['year']
        years[year] = years.get(year, 0) + 1
    
    avg_rating = sum(movie['rating'] for movie in movies_db) / total_movies if total_movies > 0 else 0
    
    return jsonify({
        'total_movies': total_movies,
        'genres': genres,
        'years': years,
        'average_rating': round(avg_rating, 2)
    })

@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    # Create data directory if it doesn't exist
    os.makedirs('data', exist_ok=True)
    
    # Run the application
    print("🎬 Movie Database Server Starting...")
    print("📍 Server will be available at: http://localhost:5000")
    print("🔧 Admin panel: Click 'Админ панель' button in the interface")
    print("🎯 Features: Search, Filter, Add/Edit/Delete movies")
    
    app.run(debug=True, host='0.0.0.0', port=5000)