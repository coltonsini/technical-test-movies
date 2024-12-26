import React from 'react';
import styles from './moviesLayout.module.css';
import MoviesTemplate from './MoviesTemplate';
// import SearchBar from '../search/SearchBar';

const MoviesLayout: React.FC = () => {
    return (
        <section className={styles.moviesLayout}>
            {/* <SearchBar /> */}
            <div className={styles.moviesContainer}>
                <article className={styles.moviesSection}>
                    <h3>
                        Popular
                    </h3>
                    <div className={styles.moviesList}>
                        <MoviesTemplate
                            image="https://via.placeholder.com/150"
                            title="Movie Title"
                            releaseDate="2022-01-01"
                            rating={50}
                        />
                    </div>
                </article>

                <article className={styles.moviesSection}>
                    <h3>
                        Now Paying
                    </h3>
                    <div className={styles.moviesList}>
                    </div>
                </article>

                <article className={styles.moviesSection}>
                    <h3>
                        Upcoming
                    </h3>
                    <div className={styles.moviesList}>
                    </div>
                </article>

                <article className={styles.moviesSection}>
                    <h3>
                        Top Rated
                    </h3>
                    <div className={styles.moviesList}>
                    </div>
                </article>

                <article className={styles.moviesSection}>
                    <h3>
                        Favorites
                    </h3>
                    <div className={styles.moviesList}>
                    </div>
                </article>
            </div>
        </section>
    );
};

export default MoviesLayout;