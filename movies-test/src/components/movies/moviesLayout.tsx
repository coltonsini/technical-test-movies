"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import styles from "./moviesLayout.module.css";
import MoviesTemplate from "./MoviesTemplate";
import { fetchMovies } from "@/utils/fetchMovies";  
import useDraggable from "@/utils/dragElement";
import SearchBar from "../search/SearchBar";
import Banner from "./Banner";
import Pagination from './Pagination';
import Link from 'next/link';

interface Movie {
    id: number;
    title: string;
    release_date: string;
    vote_average: number;
    poster_path: string;
    backdrop_path: string;
    overview: string;
}

const MoviesLayout: React.FC = () => {
    const router = useRouter();
    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
    const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
    const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
    const [searchResults, setSearchResults] = useState<Movie[]>([]);
    const [popularLoading, setPopularLoading] = useState<boolean>(true);
    const [nowPlayingLoading, setNowPlayingLoading] = useState<boolean>(true);
    const [topRatedLoading, setTopRatedLoading] = useState<boolean>(true);
    const [upcomingLoading, setUpcomingLoading] = useState<boolean>(true);
    const [searchLoading, setSearchLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [popularPage, setPopularPage] = useState<number>(1);
    const [nowPlayingPage, setNowPlayingPage] = useState<number>(1);
    const [topRatedPage, setTopRatedPage] = useState<number>(1);
    const [upcomingPage, setUpcomingPage] = useState<number>(1);
    const [bannerMovie, setBannerMovie] = useState<Movie | null>(null);

    const popularMoviesDraggable = useDraggable();
    const nowPlayingMoviesDraggable = useDraggable();
    const topRatedMoviesDraggable = useDraggable();
    const upcomingMoviesDraggable = useDraggable();

    const handleMovieClick = (movieId: number, distanceMoved: number) => {
        console.log("Distance moved:", distanceMoved);
        if (distanceMoved < 5) {
            router.push(`/movie/${movieId}`);
        }
    };

    const handlePageChange = (setPage: React.Dispatch<React.SetStateAction<number>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>, page: number) => {
        setPage(page);
        setLoading(true);
    };

    const getMovies = async (
        url: string,
        page: number,
        setState: React.Dispatch<React.SetStateAction<Movie[]>>,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        updateBanner: boolean = false
    ) => {
        try {
            const movies = await fetchMovies(`${url}&page=${page}`);
            console.log("Movies:", movies);
            setState(movies);
            if (updateBanner && movies.length > 0) {
                const topRatedMovie = movies.reduce((prev, current) => (prev.vote_average > current.vote_average ? prev : current));
                setBannerMovie(topRatedMovie);
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError(String(err));
            }
        } finally {
            setLoading(false);
        }
    };

    const searchMovies = async (query: string) => {
        setSearchLoading(true);
        try {
            const movies = await fetchMovies(`https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US`);
            setSearchResults(movies);
            if (movies.length > 0) {
                setBannerMovie(movies[0]);
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError(String(err));
            }
        } finally {
            setSearchLoading(false);
        }
    };

    useEffect(() => {
        getMovies(
            "https://api.themoviedb.org/3/movie/popular?language=en-US",
            popularPage,
            setPopularMovies,
            setPopularLoading,
            true
        );
    }, [popularPage]);

    useEffect(() => {
        getMovies(
            "https://api.themoviedb.org/3/movie/now_playing?language=en-US",
            nowPlayingPage,
            setNowPlayingMovies,
            setNowPlayingLoading
        );
    }, [nowPlayingPage]);

    useEffect(() => {
        getMovies(
            "https://api.themoviedb.org/3/movie/top_rated?language=en-US",
            topRatedPage,
            setTopRatedMovies,
            setTopRatedLoading
        );
    }, [topRatedPage]);

    useEffect(() => {
        getMovies(
            "https://api.themoviedb.org/3/movie/upcoming?language=en-US",
            upcomingPage,
            setUpcomingMovies,
            setUpcomingLoading
        );
    }, [upcomingPage]);

    if (error) {
        return <p>Error al cargar películas: {error}</p>;
    }

    return (
        <>
            {bannerMovie && (
                <Banner
                    movieTitle={bannerMovie.title}
                    movieDescription={bannerMovie.overview}
                    imageUrl={`https://image.tmdb.org/t/p/w1280${bannerMovie.backdrop_path}`}
                    rating={bannerMovie.vote_average * 10}
                />
            )}
            <section className={styles.moviesLayout}>
                <SearchBar onSearch={searchMovies} />
                <div className={styles.moviesContainer}>
                    {searchLoading ? (
                        <p>Cargando resultados de búsqueda...</p>
                    ) : searchResults.length > 0 ? (
                        <div className={styles.moviesListContainer}>
                            <h3>Resultados de búsqueda</h3>
                            <div className={styles.moviesList}>
                                {searchResults.map((movie) => (
                                    <MoviesTemplate
                                        key={movie.id}
										id={movie.id}
                                        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        title={movie.title}
                                        releaseDate={movie.release_date}
                                        rating={movie.vote_average * 10}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <>
                            <article className={styles.moviesSection} id="popular">
                                <h3>Popular</h3>
                                <Pagination currentPage={popularPage} onPageChange={(page) => handlePageChange(setPopularPage, setPopularLoading, page)} />
                                <div className={styles.moviesListContainer}>
                                    {popularLoading ? (
                                        <p>Cargando películas...</p>
                                    ) : (
                                        <div
                                            className={styles.moviesList}
                                            ref={popularMoviesDraggable.ref}
                                            onMouseDown={popularMoviesDraggable.handleMouseDown}
                                            onMouseLeave={popularMoviesDraggable.handleMouseLeave}
                                            onMouseUp={popularMoviesDraggable.handleMouseUp}
                                            onMouseMove={popularMoviesDraggable.handleMouseMove}
                                        >
                                            {popularMovies.map((movie) => (
                                                <MoviesTemplate
                                                    key={movie.id}
													id={movie.id}
                                                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                    title={movie.title}
                                                    releaseDate={movie.release_date}
                                                    rating={movie.vote_average * 10}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </article>

                            <article className={styles.moviesSection}>
                                <h3>Now Playing</h3>
                                <Pagination currentPage={nowPlayingPage} onPageChange={(page) => handlePageChange(setNowPlayingPage, setNowPlayingLoading, page)} />
                                <div className={styles.moviesListContainer}>
                                    {nowPlayingLoading ? (
                                        <p>Cargando películas...</p>
                                    ) : (
                                        <div
                                            className={styles.moviesList}
                                            ref={nowPlayingMoviesDraggable.ref}
                                            onMouseDown={nowPlayingMoviesDraggable.handleMouseDown}
                                            onMouseLeave={nowPlayingMoviesDraggable.handleMouseLeave}
                                            onMouseUp={nowPlayingMoviesDraggable.handleMouseUp}
                                            onMouseMove={nowPlayingMoviesDraggable.handleMouseMove}
                                        >
                                            {nowPlayingMovies.map((movie) => (
                                                <MoviesTemplate
                                                    key={movie.id}
													id={movie.id}
                                                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                    title={movie.title}
                                                    releaseDate={movie.release_date}
                                                    rating={movie.vote_average * 10}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </article>

                            <article className={styles.moviesSection}>
                                <h3>Upcoming</h3>
                                <Pagination currentPage={upcomingPage} onPageChange={(page) => handlePageChange(setUpcomingPage, setUpcomingLoading, page)} />
                                <div className={styles.moviesListContainer}>
                                    {upcomingLoading ? (
                                        <p>Cargando películas...</p>
                                    ) : (
                                        <div
                                            className={styles.moviesList}
                                            ref={upcomingMoviesDraggable.ref}
                                            onMouseDown={upcomingMoviesDraggable.handleMouseDown}
                                            onMouseLeave={upcomingMoviesDraggable.handleMouseLeave}
                                            onMouseUp={upcomingMoviesDraggable.handleMouseUp}
                                            onMouseMove={upcomingMoviesDraggable.handleMouseMove}
                                        >
                                            {upcomingMovies.map((movie) => (
                                                <MoviesTemplate
                                                    key={movie.id}
													id={movie.id}
                                                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                    title={movie.title}
                                                    releaseDate={movie.release_date}
                                                    rating={movie.vote_average * 10}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </article>

                            <article className={styles.moviesSection}>
                                <h3>Top Rated</h3>
                                <Pagination currentPage={topRatedPage} onPageChange={(page) => handlePageChange(setTopRatedPage, setTopRatedLoading, page)} />
                                <div className={styles.moviesListContainer}>
                                    {topRatedLoading ? (
                                        <p>Cargando películas...</p>
                                    ) : (
                                        <div
                                            className={styles.moviesList}
                                            ref={topRatedMoviesDraggable.ref}
                                            onMouseDown={topRatedMoviesDraggable.handleMouseDown}
                                            onMouseLeave={topRatedMoviesDraggable.handleMouseLeave}
                                            onMouseUp={topRatedMoviesDraggable.handleMouseUp}
                                            onMouseMove={topRatedMoviesDraggable.handleMouseMove}
                                        >
                                            {topRatedMovies.map((movie) => (
                                                <MoviesTemplate
                                                    key={movie.id}
													id={movie.id}
                                                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                    title={movie.title}
                                                    releaseDate={movie.release_date}
                                                    rating={movie.vote_average * 10}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </article>

                            <article className={styles.moviesSection} id="favorites">
                                <h3>Favorites</h3>
                                <div className={styles.moviesList}></div>
                            </article>
                        </>
                    )}
                </div>
            </section>
        </>
    );
};

export default MoviesLayout;