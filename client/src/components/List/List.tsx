import { ReactNode } from "react";
import styles from "./list.module.css";

interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
}

export default function List<T>(props: ListProps<T>) {
  return (
    <section className={styles.grid}>
      {props.items.map(props.renderItem)}
    </section>
  );
}
