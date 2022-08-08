import CategoryItem from "../category-item/category-item.component";

import "./directory.styles.scss";

const CategoryList = ({ categories }) => {
	return (
		<div className="directory-container">
			{categories.map((category) => (
				<CategoryItem category={category} key={category.id} />
			))}
		</div>
	);
};

export default CategoryList;
