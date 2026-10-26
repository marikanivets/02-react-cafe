import { useState, useEffect } from 'react';
import { Votes, VoteType } from './types/votes';
import CafeInfo from './components/CafeInfo/CafeInfo';
import VoteOptions from './components/VoteOptions/VoteOptions';
import VoteStats from './components/VoteStats/VoteStats';
import Notification from './components/Notification/Notification';
import styles from './App.module.css';

const App: React.FC = () => {
  const [votes, setVotes] = useState<Votes>(() => {
    const savedVotes = localStorage.getItem('cafe-votes');
    if (savedVotes) {
      try {
        return JSON.parse(savedVotes);
      } catch {
        // Если данные повреждены
      }
    }
    return { good: 0, neutral: 0, bad: 0 };
  });

  useEffect(() => {
    localStorage.setItem('cafe-votes', JSON.stringify(votes));
  }, [votes]);

  const handleVote = (type: VoteType): void => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [type]: prevVotes[type] + 1,
    }));
  };

  const resetVotes = (): void => {
    setVotes({ good: 0, neutral: 0, bad: 0 });
  };

  const totalVotes = votes.good + votes.neutral + votes.bad;
  const positiveRate = totalVotes > 0 
    ? Math.round((votes.good / totalVotes) * 100) 
    : 0;

  return (
    <div className={styles.app}>
      <CafeInfo />
      
      <VoteOptions 
        onVote={handleVote} 
        onReset={resetVotes} 
        canReset={totalVotes > 0} 
      />

      {totalVotes > 0 ? (
        <VoteStats 
          votes={votes} 
          totalVotes={totalVotes} 
          positiveRate={positiveRate} 
        />
      ) : (
        <Notification />
      )}
    </div>
  );
};

export default App;

