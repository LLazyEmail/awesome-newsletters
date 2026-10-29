import type {ReactNode} from 'react';
import styles from './styles.module.css';

const metrics = [
  {label: 'Curated sections', value: '10+'},
  {label: 'Focus', value: 'Newsletter craft'},
  {label: 'Sister list', value: 'Email marketing'},
];

export default function MetricsStrip(): ReactNode {
  return (
    <section className={styles.strip}>
      <div className="container">
        <div className={styles.row}>
          {metrics.map((m) => (
            <div key={m.label} className={styles.item}>
              <div className={styles.value}>{m.value}</div>
              <div className={styles.label}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
