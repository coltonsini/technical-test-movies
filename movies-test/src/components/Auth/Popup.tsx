import React, { useState, useEffect, useRef } from 'react';
import styles from './Popup.module.css';
import Image from 'next/image';

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
        <article className={`${styles.popup} ${isVisible ? styles.visible : styles.hidden}`} ref={popupRef}>
            <div className={styles.popupForm}>
                <button onClick={handleClose} className={styles.popupClose}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97982 4.96451 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43735 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46928 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.7473 9.41498 20.7192 6.93661 18.8913 5.10872C17.0634 3.28084 14.585 2.25273 12 2.25ZM12 20.25C10.3683 20.25 8.77326 19.7661 7.41655 18.8596C6.05984 17.9531 5.00242 16.6646 4.378 15.1571C3.75358 13.6496 3.5902 11.9908 3.90853 10.3905C4.22685 8.79016 5.01259 7.32015 6.16637 6.16637C7.32016 5.01259 8.79017 4.22685 10.3905 3.90852C11.9909 3.59019 13.6497 3.75357 15.1571 4.37799C16.6646 5.00242 17.9531 6.05984 18.8596 7.41655C19.7661 8.77325 20.25 10.3683 20.25 12C20.2475 14.1873 19.3775 16.2843 17.8309 17.8309C16.2843 19.3775 14.1873 20.2475 12 20.25ZM14.0306 8.78063L10.8103 12L14.0306 15.2194C14.1003 15.2891 14.1556 15.3718 14.1933 15.4628C14.231 15.5539 14.2504 15.6515 14.2504 15.75C14.2504 15.8485 14.231 15.9461 14.1933 16.0372C14.1556 16.1282 14.1003 16.2109 14.0306 16.2806C13.9609 16.3503 13.8782 16.4056 13.7872 16.4433C13.6961 16.481 13.5986 16.5004 13.5 16.5004C13.4015 16.5004 13.3039 16.481 13.2128 16.4433C13.1218 16.4056 13.0391 16.3503 12.9694 16.2806L9.21938 12.5306C9.14965 12.461 9.09433 12.3783 9.05658 12.2872C9.01884 12.1962 8.99941 12.0986 8.99941 12C8.99941 11.9014 9.01884 11.8038 9.05658 11.7128C9.09433 11.6217 9.14965 11.539 9.21938 11.4694L12.9694 7.71937C13.0391 7.64969 13.1218 7.59442 13.2128 7.5567C13.3039 7.51899 13.4015 7.49958 13.5 7.49958C13.5986 7.49958 13.6961 7.51899 13.7872 7.5567C13.8782 7.59442 13.9609 7.64969 14.0306 7.71937C14.1003 7.78906 14.1556 7.87178 14.1933 7.96283C14.231 8.05387 14.2504 8.15145 14.2504 8.25C14.2504 8.34855 14.231 8.44613 14.1933 8.53717C14.1556 8.62822 14.1003 8.71094 14.0306 8.78063Z" fill="#F6F6F6"/>
                    </svg>
                    <span>
                        Back
                    </span>
                </button>
                <div className={styles.popupFormContent}>
                    <div className={styles.popupFormButtons}>
                        <button onClick={() => setIsSignUp(true)} className={styles.formButtonSignUp}>
                            Sign up
                        </button>
                        <button onClick={() => setIsSignUp(false)} className={styles.formButtonLogIn}>
                            Log in
                        </button>
                    </div>
                    <div className={styles.popupFormFields}>
                        {isSignUp ? (
                            <a href="#">
                                Register with your Email
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M14 3H2C1.86739 3 1.74021 3.05268 1.64645 3.14645C1.55268 3.24021 1.5 3.36739 1.5 3.5V12C1.5 12.2652 1.60536 12.5196 1.79289 12.7071C1.98043 12.8946 2.23478 13 2.5 13H13.5C13.7652 13 14.0196 12.8946 14.2071 12.7071C14.3946 12.5196 14.5 12.2652 14.5 12V3.5C14.5 3.36739 14.4473 3.24021 14.3536 3.14645C14.2598 3.05268 14.1326 3 14 3ZM12.7144 4L8 8.32187L3.28562 4H12.7144ZM13.5 12H2.5V4.63688L7.66187 9.36875C7.75412 9.45343 7.87478 9.50041 8 9.50041C8.12522 9.50041 8.24588 9.45343 8.33813 9.36875L13.5 4.63688V12Z" fill="#343330"/>
                                </svg>
                            </a>
                        ) : (
                            <div className={styles.popupFormFieldsLogIn}>
                                <span>We love having you back</span>
                                <label htmlFor="">
                                    <input type="email" placeholder="Email" />
                                </label>
                                <label htmlFor="">
                                    <input type="password" placeholder="Password" />
                                    <button>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <g clip-path="url(#clip0_11600_1264)">
                                            <path d="M15.514 6.27935C14.9122 5.29384 14.153 4.41352 13.2667 3.67335L15.1333 1.80669C15.2548 1.68095 15.322 1.51255 15.3205 1.33775C15.3189 1.16296 15.2488 0.995748 15.1252 0.872142C15.0016 0.748537 14.8344 0.678424 14.6596 0.676905C14.4848 0.675386 14.3164 0.742582 14.1907 0.864021L12.1607 2.89669C10.9023 2.14924 9.46362 1.75966 8 1.77002C3.87267 1.77002 1.52067 4.59535 0.486004 6.27935C0.166356 6.79636 -0.00296021 7.39218 -0.00296021 8.00002C-0.00296021 8.60786 0.166356 9.20368 0.486004 9.72069C1.08784 10.7062 1.847 11.5865 2.73334 12.3267L0.86667 14.1934C0.802997 14.2549 0.752209 14.3284 0.717269 14.4098C0.68233 14.4911 0.663939 14.5786 0.66317 14.6671C0.662401 14.7556 0.679269 14.8434 0.712789 14.9253C0.74631 15.0073 0.795812 15.0817 0.858407 15.1443C0.921002 15.2069 0.995437 15.2564 1.07737 15.2899C1.1593 15.3234 1.24708 15.3403 1.3356 15.3395C1.42412 15.3388 1.5116 15.3204 1.59294 15.2854C1.67428 15.2505 1.74784 15.1997 1.80934 15.136L3.844 13.1014C5.10085 13.8487 6.53778 14.2389 8 14.23C12.1273 14.23 14.4793 11.4047 15.514 9.72069C15.8337 9.20368 16.003 8.60786 16.003 8.00002C16.003 7.39218 15.8337 6.79636 15.514 6.27935ZM1.622 9.02269C1.43209 8.71538 1.3315 8.36127 1.3315 8.00002C1.3315 7.63877 1.43209 7.28466 1.622 6.97735C2.51134 5.53335 4.52134 3.10335 8 3.10335C9.10685 3.09715 10.1982 3.36391 11.1773 3.88002L9.83534 5.22202C9.19529 4.79709 8.42794 4.60669 7.66349 4.68312C6.89904 4.75955 6.18458 5.09811 5.64134 5.64136C5.0981 6.1846 4.75953 6.89906 4.6831 7.66351C4.60667 8.42796 4.79707 9.19531 5.222 9.83535L3.682 11.3754C2.86541 10.7152 2.16856 9.91932 1.622 9.02269ZM10 8.00002C10 8.53045 9.78929 9.03916 9.41422 9.41424C9.03915 9.78931 8.53044 10 8 10C7.70301 9.99887 7.41014 9.9305 7.14334 9.80002L9.8 7.14335C9.93048 7.41015 9.99885 7.70303 10 8.00002ZM6 8.00002C6 7.46959 6.21072 6.96088 6.58579 6.58581C6.96086 6.21073 7.46957 6.00002 8 6.00002C8.297 6.00117 8.58987 6.06955 8.85667 6.20002L6.2 8.85669C6.06953 8.58989 6.00115 8.29701 6 8.00002ZM14.378 9.02269C13.4887 10.4667 11.4787 12.8967 8 12.8967C6.89316 12.9029 5.80185 12.6361 4.82267 12.12L6.16467 10.778C6.80472 11.203 7.57207 11.3934 8.33652 11.3169C9.10097 11.2405 9.81543 10.9019 10.3587 10.3587C10.9019 9.81544 11.2405 9.10098 11.3169 8.33653C11.3933 7.57208 11.2029 6.80473 10.778 6.16469L12.318 4.62469C13.1346 5.28487 13.8314 6.08072 14.378 6.97735C14.5679 7.28466 14.6685 7.63877 14.6685 8.00002C14.6685 8.36127 14.5679 8.71538 14.378 9.02269Z" fill="#6D6D6D"/>
                                            </g>
                                            <defs>
                                            <clipPath id="clip0_11600_1264">
                                            <rect width="16" height="16" fill="white"/>
                                            </clipPath>
                                            </defs>
                                        </svg>
                                    </button>
                                </label>
                                <button>
                                    Continue
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M14.5 6.5C14.6326 6.5 14.7598 6.44732 14.8536 6.35355C14.9473 6.25979 15 6.13261 15 6V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H2C1.73478 3 1.48043 3.10536 1.29289 3.29289C1.10536 3.48043 1 3.73478 1 4V6C1 6.13261 1.05268 6.25979 1.14645 6.35355C1.24021 6.44732 1.36739 6.5 1.5 6.5C1.89782 6.5 2.27936 6.65804 2.56066 6.93934C2.84196 7.22064 3 7.60218 3 8C3 8.39782 2.84196 8.77936 2.56066 9.06066C2.27936 9.34196 1.89782 9.5 1.5 9.5C1.36739 9.5 1.24021 9.55268 1.14645 9.64645C1.05268 9.74021 1 9.86739 1 10V12C1 12.2652 1.10536 12.5196 1.29289 12.7071C1.48043 12.8946 1.73478 13 2 13H14C14.2652 13 14.5196 12.8946 14.7071 12.7071C14.8946 12.5196 15 12.2652 15 12V10C15 9.86739 14.9473 9.74021 14.8536 9.64645C14.7598 9.55268 14.6326 9.5 14.5 9.5C14.1022 9.5 13.7206 9.34196 13.4393 9.06066C13.158 8.77936 13 8.39782 13 8C13 7.60218 13.158 7.22064 13.4393 6.93934C13.7206 6.65804 14.1022 6.5 14.5 6.5ZM2 10.45C2.56514 10.3352 3.07324 10.0286 3.43819 9.58213C3.80314 9.13562 4.00251 8.57668 4.00251 8C4.00251 7.42332 3.80314 6.86438 3.43819 6.41787C3.07324 5.97136 2.56514 5.66476 2 5.55V4H5.5V12H2V10.45ZM14 10.45V12H6.5V4H14V5.55C13.4349 5.66476 12.9268 5.97136 12.5618 6.41787C12.1969 6.86438 11.9975 7.42332 11.9975 8C11.9975 8.57668 12.1969 9.13562 12.5618 9.58213C12.9268 10.0286 13.4349 10.3352 14 10.45Z" fill="black"/>
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                    <span>
                        For any questions, reach out to support@Quickbetdmovies.com
                    </span>           
                </div> 
            </div>
            <div className={styles.popupImage}>
                <h3>
                    Welcome back to Quickbet Movies!
                </h3>
                <span>
                    {isSignUp ? (
                       <p>
                         🎬 Ready to unlock a universe of cinematic delights? Sign up now and start your journey with us!
                       </p>
                    ) : (
                       <p>
                         🍿Ready to dive into the world of unlimited entertainment? Enter your credentials and let the cinematic adventure begin!
                       </p>
                    )}
                </span>
                {isSignUp ? (
                    <Image src={"/img/signUp-character.png"} alt={"loginImage"} width={423} height={412} className={styles.popUpImages}></Image>
                ) : (
                    <Image src={"/img/login-character.png"} alt={"signupImage"} width={423} height={412} className={styles.popUpImages}></Image>
                )}   
            </div>
        </article>
    );
};

export default UserAccountPopup;


