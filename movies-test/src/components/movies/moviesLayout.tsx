"use client";

import React, {useEffect, useState} from "react";
import styles from "./moviesLayout.module.css";
import MoviesTemplate from "./MoviesTemplate";
import {fetchMovies} from "@/utils/fetchMovies";
import useDraggable from "@/utils/dragElement";
import SearchBar from "../search/SearchBar";
import Banner from "./Banner";

interface Movie {
	id: number;
	title: string;
	release_date: string;
	vote_average: number;
	poster_path: string;
}

const MoviesLayout: React.FC = () => {
	const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
	const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
	const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
	const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const popularMoviesDraggable = useDraggable();
	const nowPlayingMoviesDraggable = useDraggable();
	const topRatedMoviesDraggable = useDraggable();
	const upcomingMoviesDraggable = useDraggable();

	useEffect(() => {
		const getMovies = async (url: string, setState: React.Dispatch<React.SetStateAction<Movie[]>>) => {
			try {
				const movies = await fetchMovies(url);
				setState(movies);
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

		getMovies("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", setPopularMovies);
		getMovies("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1", setNowPlayingMovies);
		getMovies("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", setTopRatedMovies);
		getMovies("https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1", setUpcomingMovies);
	}, []);

	if (loading) {
		return <p>Cargando películas...</p>;
	}

	if (error) {
		return <p>Error al cargar películas: {error}</p>;
	}

	return (
		<>
			<Banner movieTitle="Kung fu panda" movieDescription="Hola mundo" imageUrl=""></Banner>
			<section className={styles.moviesLayout}>
				<SearchBar />
				<div className={styles.moviesContainer}>
					<article className={styles.moviesSection}>
						<h3>Popular</h3>
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
									image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
									title={movie.title}
									releaseDate={movie.release_date}
									rating={movie.vote_average * 10}
								/>
							))}
						</div>
					</article>

					<article className={styles.moviesSection}>
						<h3>Now Playing</h3>
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
									image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
									title={movie.title}
									releaseDate={movie.release_date}
									rating={movie.vote_average * 10}
								/>
							))}
						</div>
					</article>

					<article className={styles.moviesSection}>
						<h3>Upcoming</h3>
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
									image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
									title={movie.title}
									releaseDate={movie.release_date}
									rating={movie.vote_average * 10}
								/>
							))}
						</div>
					</article>

					<article className={styles.moviesSection}>
						<h3>Top Rated</h3>
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
									image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
									title={movie.title}
									releaseDate={movie.release_date}
									rating={movie.vote_average * 10}
								/>
							))}
						</div>
					</article>

					<article className={styles.moviesSection}>
						<h3>Favorites</h3>
						<div className={styles.moviesList}></div>
					</article>
				</div>
			</section>
		</>
	);
};

export default MoviesLayout;
