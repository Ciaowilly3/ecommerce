import { IProduct } from '../Interfaces/IProducts';

export const isProductInWishlist = (
  wishlist: IProduct[],
  product: IProduct
) => {
  if (wishlist.some((wishlistProduct) => wishlistProduct.id == product.id))
    return false;
  else return true;
};
