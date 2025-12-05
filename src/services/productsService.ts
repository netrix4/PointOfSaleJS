import { supabase } from "@/supabase";

export const getProducts = async () => {
  const { data, error } = await supabase.from("products").select("*");
  return { data, error };
};

export const addProduct = async (product: {
  name: string;
  price: number;
  volume: string;
  image_url?: string;
  barcode_value?: string;
}) => {
  const { data, error } = await supabase.from("products").insert(product);
  return { data, error };
};
