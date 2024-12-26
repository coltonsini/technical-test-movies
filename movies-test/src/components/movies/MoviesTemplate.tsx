import React from 'react';
import Image from 'next/image';
import styles from './moviesLayout.module.css';
import CircularRating from './CircularRating';

interface MoviesTemplateProps {
    image: string;
    title: string;
    releaseDate: string;
    rating: number;
}

const MoviesTemplate: React.FC<MoviesTemplateProps> = ({ image, title, releaseDate, rating }) => {
    return (
        <article className={styles.movieTemplate}>
            <Image src={image} alt={title} width={100} height={100} className={styles.movieTemplateImage}/>
            <div className={styles.movieTemplateInfo}>
                <h2 className={styles.movieTemplateTitle}>{title}</h2>
                <p className={styles.movieTemplateRelease}>{releaseDate}</p>
                <div className={styles.movieTemplateActions}>	
                    <div className={styles.movieTemplateRating}>
                        <p>Rating</p>
                        <div>
                            <CircularRating rating={rating} size={28} strokeWidth={1.5} />
                        </div>
                    </div>
                    <div className={styles.movieTemplateFavorite}>
                        <p>Favorites</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                            <path d="M23.4375 9.17969C23.4375 16.0156 13.3018 21.5488 12.8701 21.7773C12.7563 21.8385 12.6292 21.8706 12.5 21.8706C12.3708 21.8706 12.2436 21.8385 12.1299 21.7773C11.6982 21.5488 1.5625 16.0156 1.5625 9.17969C1.56431 7.57444 2.20279 6.03546 3.33788 4.90038C4.47296 3.76529 6.01194 3.12681 7.61719 3.125C9.63379 3.125 11.3994 3.99219 12.5 5.45801C13.6006 3.99219 15.3662 3.125 17.3828 3.125C18.9881 3.12681 20.527 3.76529 21.6621 4.90038C22.7972 6.03546 23.4357 7.57444 23.4375 9.17969Z" fill="#F6F6F6"/>
                        </svg>
                    </div>
                </div>

            </div>
        </article>
    );
};

export default MoviesTemplate;