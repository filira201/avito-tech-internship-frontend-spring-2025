import { ChangeEvent } from "react";
import { useSearchParams } from "react-router";
import { useDebouncedCallback } from "use-debounce";
import styles from "./search.module.css";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const term = event.target.value;
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");

      if (term) {
        params.set("query", term);
      } else {
        params.delete("query");
      }
      setSearchParams(params);
    },
    300
  );

  return (
    <div className={styles.searchContainer}>
      <label htmlFor="search" className={styles.srOnly}>
        Поиск
      </label>
      <input
        type="search"
        id="search"
        className={styles.searchInput}
        placeholder="Поиск задач..."
        defaultValue={searchParams.get("query")?.toString()}
        onChange={(event) => handleSearch(event)}
      />
    </div>
  );
};

export default Search;
