import React from 'react';
import './Header.css';

const Header: React.FC = () => {
    return (
        <header>
            <aside>
                <svg></svg>
                <ol>
                    <li>
                        Popular
                    </li>
                    <li>
                        Favorites
                    </li>
                </ol>
            </aside>
            <div>
                <svg></svg>
            </div>

        </header>
    );
};

export default Header;