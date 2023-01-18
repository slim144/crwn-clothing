import CategoryItem from "../category-tem/category-item.component";
import "./directory.styles.scss";

function Directory({ categories }) {
  return (
    <div className="categories-container">
      {categories.map((category) => (
        <CategoryItem category={category} />
      ))}
    </div>
  );
}

export default Directory;
