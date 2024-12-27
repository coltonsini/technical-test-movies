import React, { useState, useEffect, useRef } from 'react';
import styles from './Popup.module.css';

const UserAccountPopup: React.FC = () => {
    const [isSignUp, setIsSignUp] = useState<boolean>(true);
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const popupRef = useRef<HTMLDivElement>(null);

    const handleClose = () => {
        setIsVisible(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
            handleClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <article className={`styles.popup ${isVisible ? 'visible' : 'hidden'}`} ref={popupRef}>
            <div>
                <button onClick={handleClose}>
                    <svg></svg>
                    <span>
                        Back
                    </span>
                </button>
                <div>
                    <div>
                        <button onClick={() => setIsSignUp(true)}>
                            Sign up
                        </button>
                        <button onClick={() => setIsSignUp(false)}>
                            Log in
                        </button>
                    </div>
                    <div>
                        {isSignUp ? (
                            <a href="#">
                                Sign up form
                            </a>
                        ) : (
                            <div>
                                <span>Log in</span>
                                <input type="email" placeholder="Email" />
                                <input type="password" placeholder="Password" />
                                <button>Continue</button>
                            </div>
                        )}
                    </div>
                    <span>
                        For any questions, reach out to support@Quickbetdmovies.com
                    </span>           
                </div> 
            </div>
            <div>
                <h3>
                    Welcome back to Quickbet Movies!
                </h3>
                <span>
                    {isSignUp ? (
                       <p>
                         🎬
                       </p>
                    ) : (
                       <p>
                         🍿
                       </p>
                    )}
                </span>
                {isSignUp ? (
                    <svg></svg>
                ) : (
                    <svg></svg>
                )}   
            </div>
        </article>
    );
};

export default UserAccountPopup;