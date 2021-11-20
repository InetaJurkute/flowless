interface MenuCategoryStripProps {
  categories: string[];
  activeCategory: string | null;
  setActiveCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

export const MenuCategoryStrip = ({
  categories,
  activeCategory,
  setActiveCategory,
}: MenuCategoryStripProps) => {
  const onCategoryClick = (category: string) => {
    if (activeCategory === category) {
      setActiveCategory(null);
      return;
    }
    setActiveCategory(category);
  };

  const categoryButtons = categories.map((category, index) => (
    <button
      key={index}
      onClick={() => onCategoryClick(category)}
      style={{ color: category === activeCategory ? "red" : "grey" }}
    >
      {category}
    </button>
  ));

  return <div>{categoryButtons}</div>;
};
