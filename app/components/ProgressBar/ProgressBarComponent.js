import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoader, updateScrapperKnowledgeState } from '../store/slices/scrapperKnowledgeSlice';
import { useSelector } from 'react-redux';

const ProgressBarComponent = ({ totalLoadingTime = 75000, timer = 1.1111, finishing, finished }) => {

    // const [progress, setProgress] = useState(0);
    const dispatch = useDispatch()
    const progress = useSelector((state) => state.knowledgeScrapper.loader);

    function getRandomInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    useEffect(() => {

        const totalTime = totalLoadingTime; // Total duration in milliseconds (1.5 seconds)
        const intervalTime = getRandomInterval(1, 500);
        const steps = totalTime / intervalTime; // Number of necessary steps
        const increment = 5 / steps; // Increment value to reach 100%        


        let currentProgress = progress;

        const interval = setInterval(() => {
            if (currentProgress < 100) {
                currentProgress += increment;
                dispatch(setLoader(currentProgress));
            } else {
                clearInterval(interval);
            }
        }, intervalTime);

        return () => {
            clearInterval(interval);
        };
    }, []);


    useEffect(() => {
        if (finished) {
            dispatch(setLoader(100));
        }

    }, [finished, progress])

    return (
        <div
            style={{
                width: '100%',
                height: '20px',
                backgroundColor: '#ccc',
                borderRadius: '4px',
                position: 'relative',
            }}
        >
            <div
                style={{
                    width: `${progress}%`,
                    height: '100%',
                    background:
                        'radial-gradient(400% 240% at -170% 75%, rgb(153, 0, 102) 10%, rgb(255, 82, 51) 50%, rgb(255, 149, 0) 90%)',
                    borderRadius: '4px',
                    transition: 'width 0.3s ease-in-out',
                }}
            ></div>
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                className='text-sm text-white text-xs'
            >
                {finishing || progress.toFixed() >= 100 ? 'Finishing setup...' : progress.toFixed() + '%'}
            </div>
        </div>

    );
};

export default ProgressBarComponent;