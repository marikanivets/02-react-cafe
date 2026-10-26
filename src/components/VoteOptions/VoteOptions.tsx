import React from 'react';
import { VoteType } from '../../types/votes';
import styles from './VoteOptions.module.css';

interface VoteOptionsProps {
  onVote: (type: VoteType) => void;
  onReset: () => void;
  canReset: boolean;
}

const VoteOptions: React.FC<VoteOptionsProps> = ({ onVote, onReset, canReset }) => {
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={() => onVote('good')}>Good</button>
      <button className={styles.button} onClick={() => onVote('neutral')}>Neutral</button>
      <button className={styles.button} onClick={() => onVote('bad')}>Bad</button>
      
      {canReset && (
        <button className={`${styles.button} ${styles.reset}`} onClick={onReset}>
          Reset
        </button>
      )}
    </div>
  );
};

export default VoteOptions;
