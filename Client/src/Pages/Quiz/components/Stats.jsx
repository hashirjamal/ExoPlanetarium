import styles from "./Stats.module.css"

const Stats = ({val, score}) => {
    console.log(val)
  return (
    <div className="stats_container">
      <div className={styles.score}>
        <h4>Current Score: {score}</h4>
      </div>
      <div className={styles.score}>
        <h4>High Score: {}</h4>
      </div>
      <div className={styles.answerIndicator}>
            {!val==undefined ? null : val }
      </div>
    </div>
  );
};
export default Stats;