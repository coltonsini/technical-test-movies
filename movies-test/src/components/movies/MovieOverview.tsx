import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import styles from "./moviesLayout.module.css";
import useDraggable from "@/utils/dragElement";

interface CastMember {
    id: number;
    name: string;
    character: string;
    profile_path: string;
}

interface Movie {
    id: number;
    title: string;
    overview: string;
    backdrop_path: string;
    vote_average: number;
}

const MovieOverview: React.FC<{ movieId: string | string[] | undefined }> = ({ movieId }) => {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [cast, setCast] = useState<CastMember[]>([]);
    const [videoKey, setVideoKey] = useState<string | null>(null);
    const apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGM1NTdjOTIyZjAwOTZlOTJiMjYxZjNhMmU5ODUyZCIsIm5iZiI6MTczNTIyNTAxMy4xNDEsInN1YiI6IjY3NmQ2ZWI1YmYxMGZmMTk4NDYxNDc3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1_zwN5Jb6_L0U8WI3-_2GizZ0yl_V7Jr63CueWIL4DE";

    const castListDraggable = useDraggable();

    useEffect(() => {
        if (!movieId) return;

        const fetchMovie = async () => {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${apiKey}`,
                },
            });
            const data = await response.json();
            setMovie(data);
        };

        const fetchCast = async () => {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${apiKey}`,
                },
            });
            const data = await response.json();
            setCast(data.cast);
        };

        const fetchVideo = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${apiKey}`,
                    },
                });
                const data = await response.json();
                const trailer = data.results?.find(
                    (vid: any) => vid.type === 'Trailer' && vid.site === 'YouTube'
                );
                if (trailer) {
                    setVideoKey(trailer.key);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovie();
        fetchCast();
        fetchVideo();
    }, [movieId]);

    if (!movie) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <Banner
                movieTitle={movie.title}
                movieDescription={movie.overview}
                imageUrl={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                rating={movie.vote_average * 10}
            />
            {videoKey && (
                <section className={styles.trailerSection}>
                        <div>
                            <h3>Watch the Movie Trailer</h3>
                            <iframe
                                width="560"
                                height="315"
                                src={`https://www.youtube.com/embed/${videoKey}`}
                                title="Trailer"
                                frameBorder="0"
                                allowFullScreen
                            />
                        </div>
                </section>
            )}
            <section className={styles.castSection}>
                <h3>Cast</h3>
                <div
                    className={styles.castList}
                    ref={castListDraggable.ref}
                    onMouseDown={castListDraggable.handleMouseDown}
                    onMouseLeave={castListDraggable.handleMouseLeave}
                    onMouseUp={castListDraggable.handleMouseUp}
                    onMouseMove={castListDraggable.handleMouseMove}
                >
                    {cast.map((member) => (
                        <div key={member.id} className={styles.castMember}>
                            <img src={`https://image.tmdb.org/t/p/w200${member.profile_path}`} alt={member.name} />
                            <p>
                                {member.name} as {member.character}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default MovieOverview;