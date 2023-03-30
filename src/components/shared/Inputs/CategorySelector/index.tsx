import styles from "./CategorySelector.module.scss";
import { FC } from "react";
import { CategoryType } from "../../../../../types/CategoryType";


type CategorySelectorProps = {
    categories: CategoryType[] | null;
    selected: CategoryType | null;
    setSelected: (category: CategoryType) => void;
}


const CategorySelector:FC<CategorySelectorProps> = ({ categories, selected, setSelected }) => {
  return (
    <nav className={styles.categorySelector}>
      {categories &&
        categories
          .filter(
            (category) => category.name !== "error"
          )
          .map((category) => {
            return (
              <div
                key={category.name}
                className={`${styles.category} ${
                  selected === category && styles.selected
                }`}
                onClick={() => {
                  setSelected(category);
                }}
              >
                {category.displayName}
              </div>
            );
          })}
    </nav>
  );
};

export default CategorySelector;
