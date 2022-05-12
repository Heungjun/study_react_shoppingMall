import { Product } from "../../types";

const ProductItem = ({
  category,
  description,
  id,
  image,
  price,
  rating,
  title,
}: Product) => (
  <li>
    <p>{category}</p>
    <p>{title}</p>
    <p>{description}</p>
    <img src={image} />
    <span>${price}</span>
    <span>{rating.rate}</span>
  </li>
);

export default ProductItem;
