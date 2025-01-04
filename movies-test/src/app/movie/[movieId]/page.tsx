"use client"

import { useParams } from 'next/navigation';
import MovieOverview from '@/components/movies/MovieOverview';

const MovieInternal = () => {
    const { movieId } = useParams();

    if (!movieId) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <MovieOverview movieId={movieId} />
        </div>
    );
};

export default MovieInternal;