import { useState } from 'react';
import styles from './Switch.module.scss';

interface ISwitchProps {
    left?: React.ReactNode;
    right?: React.ReactNode;
    callbackLeft?: () => void;
    callbackRight?: () => void;
    className?: string;
    startLeft?: boolean;
    speedms?: number;
}

const Switch = ({
    left = '',
    right = '',
    callbackLeft = () => {},
    callbackRight = () => {},
    className = '',
    startLeft = true,
    speedms = 300,
}: ISwitchProps) => {
    const [positionLeft, setPositionLeft] = useState(startLeft);
    const [transition, setTransition] = useState(false);
    let knobState = positionLeft ? styles.knob_left : styles.knob_right;
    let knobTransition = positionLeft ? styles.knob_transition_left : styles.knob_transition_right;
    const handleSwitch = () => {
        setTransition(true);
        setTimeout(() => {
            setTransition(false);
            setPositionLeft((prev) => !prev);
        }, speedms);
    };

    return (
        <div className={`${styles.switch} ${className}`}>
            <span
                onClick={() => {
                    if (!positionLeft) {
                        callbackLeft();
                        handleSwitch();
                    }
                }}
                className={styles.option}
                style={positionLeft ? { color: 'white', cursor: 'default' } : {}}>
                {left}
            </span>
            <span
                onClick={() => {
                    if (positionLeft) {
                        callbackRight();
                        handleSwitch();
                    }
                }}
                className={styles.option}
                style={!positionLeft ? { color: 'white', cursor: 'default' } : {}}>
                {right}
            </span>
            <div
                className={`${styles.knob} ${transition ? knobTransition : knobState}`}
                style={{ transition: `all ${speedms}ms ease-in-out` }}
            />
        </div>
    );
};

export default Switch;
