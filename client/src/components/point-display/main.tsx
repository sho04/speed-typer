import {useState} from 'react';
import './style.scss';

// This component is used to display the points of the user.

interface PointDisplayProps {
    points : number;
}

const PointDisplay = (props : PointDisplayProps) => {

    return (
        <div className="point-display">
            <div className="points">Points: {props.points}</div>
        </div>
    );
}

export default PointDisplay;

