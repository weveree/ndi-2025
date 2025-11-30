import reactLogo from '@/assets/react.svg';
import Counter from '@/components/Counter';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.app}>
      <img src={reactLogo} alt="React Logo" />
      <Counter />
    </div>
  );
}
