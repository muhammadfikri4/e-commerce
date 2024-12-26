export interface ProductDAO {
  description: string;
  image: string | Express.Multer.File;
  name: string;
  price: number;
  stock: number;
  categoryId: string;
}
