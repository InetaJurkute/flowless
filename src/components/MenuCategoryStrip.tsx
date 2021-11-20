import { Button } from "@chakra-ui/button";

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
    <Button
      key={index}
      onClick={() => onCategoryClick(category)}
      style={{ backgroundColor: category === activeCategory ? "red" : "grey" }}
    >
      {category}
    </Button>
  ));

  return <div>{categoryButtons}</div>;
};
