// Movie Database Application
class MovieDatabase {
    constructor() {
        this.movies = [];
        this.filteredMovies = [];
        this.currentEditingMovie = null;
        this.isAdminMode = false;
        this.searchTimeout = null;
        
        this.initializeData();
        this.initializeEventListeners();
        this.populateYearFilter();
        this.renderMovies();
    }

    // Initialize sample data
    initializeData() {
        this.movies = [
            {
                id: '1',
                title: 'Темный рыцарь',
                year: 2008,
                genre: ['Боевик', 'Криминал', 'Драма'],
                director: 'Кристофер Нолан',
                actors: ['Кристиан Бэйл', 'Хит Леджер', 'Аарон Экхарт', 'Майкл Кейн'],
                plot: 'Когда угроза, известная как Джокер, сеет хаос и разрушения среди жителей Готэма, Бэтмен должен принять один из величайших психологических и физических вызовов своей способности бороться с несправедливостью.',
                rating: 9.0,
                duration: 152,
                poster: 'https://i.pinimg.com/736x/d6/57/a4/d657a48442d85023b6960c1cd1e0464e.jpg',
                trailer: 'https://www.youtube.com/embed/EXeTwQWrcwY',
                releaseDate: '2008-07-18',
                language: 'Английский',
                country: 'США',
                awards: ['Оскар за лучшую мужскую роль второго плана', 'BAFTA за лучшую мужскую роль второго плана'],
                reviews: [
                    {
                        id: '1',
                        author: 'Иван Петров',
                        rating: 9,
                        comment: 'Абсолютный шедевр. Игра Хита Леджера в роли Джокера незабываема.',
                        date: '2023-01-15'
                    },
                    {
                        id: '2',
                        author: 'Мария Сидорова',
                        rating: 10,
                        comment: 'Лучший фильм о супергероях. Идеальное сочетание экшена и психологического триллера.',
                        date: '2023-02-20'
                    }
                ]
            },
            {
                id: '2',
                title: 'Начало',
                year: 2010,
                genre: ['Боевик', 'Фантастика', 'Триллер'],
                director: 'Кристофер Нолан',
                actors: ['Леонардо ДиКаприо', 'Марион Котийяр', 'Том Харди', 'Эллен Пейдж'],
                plot: 'Вор, который крадет корпоративные секреты с помощью технологии совместного сновидения, получает обратную задачу - внедрить идею в сознание генерального директора.',
                rating: 8.8,
                duration: 148,
                poster: 'https://static.kinoafisha.info/k/movie_posters/800x1200/upload/movie_posters/8/0/0/7794008/286676351653465386.jpg',
                trailer: 'https://www.youtube.com/embed/YoHD9XEInc0',
                releaseDate: '2010-07-16',
                language: 'Английский',
                country: 'США',
                awards: ['Оскар за лучшую операторскую работу', 'Оскар за лучший звуковой монтаж'],
                reviews: [
                    {
                        id: '3',
                        author: 'Алексей Иванов',
                        rating: 9,
                        comment: 'Умопомрачительный и визуально потрясающий. Нолан в лучшей форме.',
                        date: '2023-03-10'
                    }
                ]
            },
            {
                id: '3',
                title: 'Криминальное чтиво',
                year: 1994,
                genre: ['Криминал', 'Драма'],
                director: 'Квентин Тарантино',
                actors: ['Джон Траволта', 'Ума Турман', 'Сэмюэл Л. Джексон', 'Брюс Уиллис'],
                plot: 'Жизни двух киллеров мафии, боксера, гангстера и его жены, и пары грабителей закусочных переплетаются в четырех историях насилия и искупления.',
                rating: 8.9,
                duration: 154,
                poster: 'https://avatars.mds.yandex.net/get-kinopoisk-image/6201401/97ed7256-db80-4532-ab6b-6688d2eab4b2/1920x',
                releaseDate: '1994-10-14',
                language: 'Английский',
                country: 'США',
                awards: ['Оскар за лучший оригинальный сценарий', 'Золотая пальмовая ветвь'],
                reviews: [
                    {
                        id: '4',
                        author: 'Елена Волкова',
                        rating: 9,
                        comment: 'Шедевр Тарантино. Блестящие диалоги и повествование.',
                        date: '2023-01-25'
                    }
                ]
            },
            {
                id: '4',
                title: 'Побег из Шоушенка',
                year: 1994,
                genre: ['Драма'],
                director: 'Фрэнк Дарабонт',
                actors: ['Тим Роббинс', 'Морган Фриман', 'Боб Гантон', 'Уильям Сэдлер'],
                plot: 'Два заключенных сближаются на протяжении нескольких лет, находя утешение и окончательное искупление через акты общей порядочности.',
                rating: 9.3,
                duration: 142,
                poster: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/eae33fc1-bcb5-450e-89bf-9ba077b24cdf/1920x',
                releaseDate: '1994-09-23',
                language: 'Английский',
                country: 'США',
                awards: ['Номинация на Оскар за лучший фильм'],
                reviews: [
                    {
                        id: '5',
                        author: 'Дмитрий Козлов',
                        rating: 10,
                        comment: 'Величайший фильм всех времен. Совершенен во всех отношениях.',
                        date: '2023-02-14'
                    }
                ]
            },
            {
                id: '5',
                title: 'Интерстеллар',
                year: 2014,
                genre: ['Приключения', 'Драма', 'Фантастика'],
                director: 'Кристофер Нолан',
                actors: ['Мэттью МакКонахи', 'Энн Хэтэуэй', 'Джессика Честейн', 'Майкл Кейн'],
                plot: 'Команда исследователей путешествует через червоточину в космосе в попытке обеспечить выживание человечества.',
                rating: 8.6,
                duration: 169,
                poster: 'https://static.okko.tv/images/v4/1c4f72a0-2631-457b-9730-9cca4dd877c0',
                releaseDate: '2014-11-07',
                language: 'Английский',
                country: 'США',
                awards: ['Оскар за лучшие визуальные эффекты'],
                reviews: [
                    {
                        id: '6',
                        author: 'Анна Смирнова',
                        rating: 8,
                        comment: 'Эмоционально мощный и визуально захватывающий космический эпос.',
                        date: '2023-03-05'
                    }
                ]
            },
            {
                id: '6',
                title: 'Крестный отец',
                year: 1972,
                genre: ['Криминал', 'Драма'],
                director: 'Фрэнсис Форд Коппола',
                actors: ['Марлон Брандо', 'Аль Пачино', 'Джеймс Каан', 'Дайан Китон'],
                plot: 'Стареющий патриарх криминальной династии передает контроль над своей тайной империей своему неохотному сыну.',
                rating: 9.2,
                duration: 175,
                poster: 'https://avatars.mds.yandex.net/get-kinopoisk-image/10703959/ebf237d7-64a3-4b75-98f1-d228d54658e5/300x450',
                releaseDate: '1972-03-24',
                language: 'Английский',
                country: 'США',
                awards: ['Оскар за лучший фильм', 'Оскар за лучшую мужскую роль'],
                reviews: [
                    {
                        id: '7',
                        author: 'Сергей Николаев',
                        rating: 10,
                        comment: 'Определяющая криминальная сага. Брандо и Пачино феноменальны.',
                        date: '2023-01-30'
                    }
                ]
            }
        ];
        
        this.filteredMovies = [...this.movies];
    }

    // Initialize event listeners
    initializeEventListeners() {
        
    
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            this.handleSearch();
        });

        // Advanced filters toggle
        document.getElementById('advancedToggle').addEventListener('click', () => {
            this.toggleAdvancedFilters();
        });

        // Filter changes
        ['genreFilter', 'yearFilter', 'ratingFilter'].forEach(filterId => {
            document.getElementById(filterId).addEventListener('change', () => {
                this.handleSearch();
            });
        });

        // Add movie button
        document.getElementById('addMovieBtn').addEventListener('click', () => {
            this.openMovieForm();
        });

        // Movie form
        document.getElementById('movieForm').addEventListener('submit', (e) => {
            this.handleMovieFormSubmit(e);
        });

        // Modal close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.closeModal(e.target.closest('.modal'));
            });
        });

        // Modal overlay clicks
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                this.closeModal(e.target.closest('.modal'));
            });
        });

        // Escape key to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const openModal = document.querySelector('.modal:not(.hidden)');
                if (openModal) {
                    this.closeModal(openModal);
                }
            }
        });
    }

    // Populate year filter options
    populateYearFilter() {
        const yearFilter = document.getElementById('yearFilter');
        const currentYear = new Date().getFullYear();
        
        for (let year = currentYear; year >= 1950; year--) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearFilter.appendChild(option);
        }
    }

    // Toggle admin mode
    toggleAdminMode() {
        this.isAdminMode = !this.isAdminMode;
        const adminToggle = document.getElementById('adminToggle');
        const searchSection = document.getElementById('searchSection');
        const moviesSection = document.getElementById('moviesSection');
        const adminPanel = document.getElementById('adminPanel');

        if (this.isAdminMode) {
            adminToggle.classList.add('active');
            searchSection.classList.add('hidden');
            moviesSection.classList.add('hidden');
            adminPanel.classList.remove('hidden');
            this.renderAdminMovies();
        } else {
            adminToggle.classList.remove('active');
            searchSection.classList.remove('hidden');
            moviesSection.classList.remove('hidden');
            adminPanel.classList.add('hidden');
        }
    }

    // Toggle advanced filters
    toggleAdvancedFilters() {
        const advancedFilters = document.getElementById('advancedFilters');
        advancedFilters.classList.toggle('hidden');
    }

    // Handle search with debouncing
    handleSearch() {
        const loadingSpinner = document.getElementById('loadingSpinner');
        loadingSpinner.classList.remove('hidden');

        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
            this.performSearch();
            loadingSpinner.classList.add('hidden');
        }, 300);
    }

    // Perform search and filtering
    performSearch() {
        const query = document.getElementById('searchInput').value.toLowerCase();
        const genre = document.getElementById('genreFilter').value;
        const year = document.getElementById('yearFilter').value;
        const rating = document.getElementById('ratingFilter').value;

        let filtered = [...this.movies];

        // Text search
        if (query) {
            filtered = filtered.filter(movie => 
                movie.title.toLowerCase().includes(query) ||
                movie.actors.some(actor => actor.toLowerCase().includes(query)) ||
                movie.director.toLowerCase().includes(query)
            );
        }

        // Genre filter
        if (genre !== 'all') {
            const genreMap = {
                'action': 'Боевик',
                'adventure': 'Приключения',
                'comedy': 'Комедия',
                'crime': 'Криминал',
                'drama': 'Драма',
                'horror': 'Ужасы',
                'romance': 'Романтика',
                'sci-fi': 'Фантастика',
                'thriller': 'Триллер'
            };
            
            filtered = filtered.filter(movie => 
                movie.genre.includes(genreMap[genre])
            );
        }

        // Year filter
        if (year !== 'all') {
            filtered = filtered.filter(movie => movie.year.toString() === year);
        }

        // Rating filter
        if (rating !== 'all') {
            const minRating = parseFloat(rating);
            filtered = filtered.filter(movie => movie.rating >= minRating);
        }

        this.filteredMovies = filtered;
        this.renderMovies();
    }

    // Render movies grid
    renderMovies() {
        const moviesGrid = document.getElementById('moviesGrid');
        const noResults = document.getElementById('noResults');
        const sectionTitle = document.getElementById('sectionTitle');
        const moviesCount = document.getElementById('moviesCount');

        // Update section title and count
        const isFiltered = this.filteredMovies.length !== this.movies.length;
        sectionTitle.textContent = isFiltered ? 
            `Результаты поиска (${this.filteredMovies.length})` : 
            'Все фильмы';
        
        moviesCount.textContent = `${this.filteredMovies.length} ${this.getMovieCountText(this.filteredMovies.length)} найдено`;

        if (this.filteredMovies.length === 0) {
            moviesGrid.classList.add('hidden');
            noResults.classList.remove('hidden');
            return;
        }

        moviesGrid.classList.remove('hidden');
        noResults.classList.add('hidden');

        moviesGrid.innerHTML = this.filteredMovies.map(movie => this.createMovieCard(movie)).join('');

        // Add click listeners to movie cards
        moviesGrid.querySelectorAll('.movie-card').forEach(card => {
            card.addEventListener('click', () => {
                const movieId = card.dataset.movieId;
                const movie = this.movies.find(m => m.id === movieId);
                this.openMovieModal(movie);
            });
        });
    }

    // Create movie card HTML
    createMovieCard(movie) {
        const displayGenres = movie.genre.slice(0, 2);
        const remainingGenres = movie.genre.length - 2;

        return `
            <div class="movie-card" data-movie-id="${movie.id}">
                <div class="movie-poster">
                    <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
                    <div class="movie-rating">
                        <i class="fas fa-star"></i>
                        <span>${movie.rating}</span>
                    </div>
                </div>
                <div class="movie-info">
                    <h3 class="movie-title">${movie.title}</h3>
                    <div class="movie-meta">
                        <div class="movie-meta-item">
                            <i class="fas fa-calendar"></i>
                            <span>${movie.year}</span>
                        </div>
                        <div class="movie-meta-item">
                            <i class="fas fa-clock"></i>
                            <span>${movie.duration} мин</span>
                        </div>
                    </div>
                    <div class="movie-genres">
                        ${displayGenres.map(genre => `<span class="genre-tag">${genre}</span>`).join('')}
                        ${remainingGenres > 0 ? `<span class="genre-tag more">+${remainingGenres}</span>` : ''}
                    </div>
                    <p class="movie-plot">${movie.plot}</p>
                    <div class="movie-credits">
                        <p><span>Режиссер:</span> ${movie.director}</p>
                        <p><span>В ролях:</span> ${movie.actors.slice(0, 2).join(', ')}${movie.actors.length > 2 ? '...' : ''}</p>
                    </div>
                </div>
            </div>
        `;
    }

    // Get correct movie count text in Russian
    getMovieCountText(count) {
        if (count % 10 === 1 && count % 100 !== 11) {
            return 'фильм';
        } else if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
            return 'фильма';
        } else {
            return 'фильмов';
        }
    }

    // Open movie details modal
    openMovieModal(movie) {
        const modal = document.getElementById('movieModal');
        const movieDetails = document.getElementById('movieDetails');
        
        movieDetails.innerHTML = this.createMovieDetailsHTML(movie);
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    // Create movie details HTML
    createMovieDetailsHTML(movie) {
        const releaseDate = new Date(movie.releaseDate).toLocaleDateString('ru-RU');
        
        return `
            <div class="movie-header">
                <img src="${movie.poster}" alt="${movie.title}">
                <div class="movie-header-overlay"></div>
                <div class="movie-header-content">
                    <h1 class="movie-header-title">${movie.title}</h1>
                    <div class="movie-header-meta">
                        <div class="movie-header-meta-item">
                            <i class="fas fa-star"></i>
                            <span class="rating">${movie.rating}/10</span>
                        </div>
                        <div class="movie-header-meta-item">
                            <i class="fas fa-calendar"></i>
                            <span>${movie.year}</span>
                        </div>
                        <div class="movie-header-meta-item">
                            <i class="fas fa-clock"></i>
                            <span>${movie.duration} мин</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="movie-content">
                <div class="movie-content-section">
                    <div class="movie-genres">
                        ${movie.genre.map(genre => `<span class="genre-tag">${genre}</span>`).join('')}
                    </div>
                </div>
                
                <div class="movie-content-section">
                    <h3>Сюжет</h3>
                    <p class="movie-plot-text">${movie.plot}</p>
                </div>
                
                <div class="movie-details-grid">
                    <div class="movie-detail-item">
                        <i class="fas fa-user-tie director-icon"></i>
                        <div class="movie-detail-content">
                            <h4>Режиссер</h4>
                            <p>${movie.director}</p>
                        </div>
                    </div>
                    
                    <div class="movie-detail-item">
                        <i class="fas fa-users cast-icon"></i>
                        <div class="movie-detail-content">
                            <h4>Актеры</h4>
                            <p>${movie.actors.join(', ')}</p>
                        </div>
                    </div>
                    
                    <div class="movie-detail-item">
                        <i class="fas fa-globe globe-icon"></i>
                        <div class="movie-detail-content">
                            <h4>Детали</h4>
                            <p>${movie.language} • ${movie.country}<br>Дата выхода: ${releaseDate}</p>
                        </div>
                    </div>
                    
                    ${movie.awards && movie.awards.length > 0 ? `
                        <div class="movie-detail-item">
                            <i class="fas fa-award award-icon"></i>
                            <div class="movie-detail-content">
                                <h4>Награды</h4>
                                <ul class="movie-awards-list">
                                    ${movie.awards.map(award => `<li>${award}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    ` : ''}
                </div>
                
                ${movie.trailer ? `
                    <div class="movie-content-section">
                        <h3>Трейлер</h3>
                        <div class="movie-trailer">
                            <iframe src="${movie.trailer}" title="${movie.title} трейлер" allowfullscreen></iframe>
                        </div>
                    </div>
                ` : ''}
                
                ${movie.reviews && movie.reviews.length > 0 ? `
                    <div class="movie-content-section">
                        <h3><i class="fas fa-comments"></i> Отзывы (${movie.reviews.length})</h3>
                        <div class="movie-reviews">
                            ${movie.reviews.map(review => `
                                <div class="review-item">
                                    <div class="review-header">
                                        <div class="review-author">
                                            <span class="review-author-name">${review.author}</span>
                                            <div class="review-rating">
                                                <i class="fas fa-star"></i>
                                                <span>${review.rating}/10</span>
                                            </div>
                                        </div>
                                        <span class="review-date">${new Date(review.date).toLocaleDateString('ru-RU')}</span>
                                    </div>
                                    <p class="review-comment">${review.comment}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }

    // Render admin movies list
    renderAdminMovies() {
        const adminMoviesList = document.getElementById('adminMoviesList');
        const adminMoviesCount = document.getElementById('adminMoviesCount');
        
        adminMoviesCount.textContent = this.movies.length;
        
        adminMoviesList.innerHTML = this.movies.map(movie => `
            <div class="admin-movie-item">
                <div class="admin-movie-info">
                    <img src="${movie.poster}" alt="${movie.title}" class="admin-movie-poster">
                    <div class="admin-movie-details">
                        <h4>${movie.title}</h4>
                        <p>${movie.year} • ${movie.director}</p>
                        <div class="admin-movie-meta">
                            <span class="rating">★ ${movie.rating}</span>
                            <span>•</span>
                            <span class="duration">${movie.duration} мин</span>
                        </div>
                    </div>
                </div>
                <div class="admin-movie-actions">
                    <button class="admin-action-btn edit-btn" onclick="movieDB.editMovie('${movie.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="admin-action-btn delete-btn" onclick="movieDB.deleteMovie('${movie.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Open movie form modal
    openMovieForm(movie = null) {
        this.currentEditingMovie = movie;
        const modal = document.getElementById('movieFormModal');
        const formTitle = document.getElementById('formTitle');
        const submitBtnText = document.getElementById('submitBtnText');
        
        if (movie) {
            formTitle.textContent = 'Редактировать фильм';
            submitBtnText.textContent = 'Обновить фильм';
            this.populateMovieForm(movie);
        } else {
            formTitle.textContent = 'Добавить новый фильм';
            submitBtnText.textContent = 'Добавить фильм';
            this.resetMovieForm();
        }
        
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    // Populate movie form with data
    populateMovieForm(movie) {
        document.getElementById('movieTitle').value = movie.title;
        document.getElementById('movieYear').value = movie.year;
        document.getElementById('movieGenres').value = movie.genre.join(', ');
        document.getElementById('movieDirector').value = movie.director;
        document.getElementById('movieActors').value = movie.actors.join(', ');
        document.getElementById('moviePlot').value = movie.plot;
        document.getElementById('movieRating').value = movie.rating;
        document.getElementById('movieDuration').value = movie.duration;
        document.getElementById('moviePoster').value = movie.poster;
        document.getElementById('movieTrailer').value = movie.trailer || '';
        document.getElementById('movieReleaseDate').value = movie.releaseDate;
        document.getElementById('movieLanguage').value = movie.language;
        document.getElementById('movieCountry').value = movie.country;
        document.getElementById('movieAwards').value = movie.awards ? movie.awards.join(', ') : '';
    }

    // Reset movie form
    resetMovieForm() {
        document.getElementById('movieForm').reset();
        document.getElementById('movieLanguage').value = 'Русский';
        document.getElementById('movieCountry').value = 'Россия';
    }

    // Handle movie form submission
    handleMovieFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const movieData = {
            title: document.getElementById('movieTitle').value,
            year: parseInt(document.getElementById('movieYear').value),
            genre: document.getElementById('movieGenres').value.split(',').map(g => g.trim()),
            director: document.getElementById('movieDirector').value,
            actors: document.getElementById('movieActors').value.split(',').map(a => a.trim()),
            plot: document.getElementById('moviePlot').value,
            rating: parseFloat(document.getElementById('movieRating').value),
            duration: parseInt(document.getElementById('movieDuration').value),
            poster: document.getElementById('moviePoster').value,
            trailer: document.getElementById('movieTrailer').value || undefined,
            releaseDate: document.getElementById('movieReleaseDate').value,
            language: document.getElementById('movieLanguage').value,
            country: document.getElementById('movieCountry').value,
            awards: document.getElementById('movieAwards').value ? 
                document.getElementById('movieAwards').value.split(',').map(a => a.trim()) : [],
            reviews: this.currentEditingMovie?.reviews || []
        };

        if (this.currentEditingMovie) {
            // Update existing movie
            const index = this.movies.findIndex(m => m.id === this.currentEditingMovie.id);
            this.movies[index] = { ...movieData, id: this.currentEditingMovie.id };
        } else {
            // Add new movie
            const newMovie = {
                ...movieData,
                id: Date.now().toString()
            };
            this.movies.push(newMovie);
        }

        this.filteredMovies = [...this.movies];
        this.renderAdminMovies();
        this.closeMovieForm();
    }

    // Edit movie
    editMovie(id) {
        const movie = this.movies.find(m => m.id === id);
        this.openMovieForm(movie);
    }

    // Delete movie
    deleteMovie(id) {
        if (confirm('Вы уверены, что хотите удалить этот фильм?')) {
            this.movies = this.movies.filter(m => m.id !== id);
            this.filteredMovies = [...this.movies];
            this.renderAdminMovies();
        }
    }

    // Close movie form
    closeMovieForm() {
        const modal = document.getElementById('movieFormModal');
        this.closeModal(modal);
        this.currentEditingMovie = null;
    }

    // Close modal
    closeModal(modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// Global functions for onclick handlers
window.closeMovieForm = function() {
    movieDB.closeMovieForm();
};

// Initialize the application
let movieDB;
document.addEventListener('DOMContentLoaded', () => {
    movieDB = new MovieDatabase();
});

// Make movieDB globally accessible for onclick handlers
window.movieDB = movieDB;