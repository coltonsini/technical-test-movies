import React, { useState, useEffect } from 'react';
import './SearchBar.css';

interface Genre {
    id: number;
    name: string;
}

const SearchBar: React.FC = () => {
    const [genres, setGenres] = useState<Genre[]>([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch('/api/genres');
                if (!response.ok) {
                    throw new Error('Error al obtener los géneros');
                }
                const data: Genre[] = await response.json();
                setGenres(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchGenres();
    }, []);

    return (
        <aside className="search-bar">
            <div>
                <label htmlFor="KeyWords">
                    <div>
                        <input type="text" id="KeyWords" placeholder="KeyWords" />
                        <svg></svg>
                    </div>
                </label>
            </div>
            <div>
                <label htmlFor="Genres">
                    <div>
                        <select name="Genres" id="Genres">
                            <option value="">Selecciona un género</option>
                            {genres.map((genre) => (
                                <option key={genre.id} value={genre.id}>
                                    {genre.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </label>
            </div>
        </aside>
    );
};

export default SearchBar;