export interface products {
  product: {
    id: number;
    costInHours: number;
    image?: {
      imageUrl: string;
      publicId: string;
    };
    name: string;
    stock: number;
  };
  quantity: number;
}
