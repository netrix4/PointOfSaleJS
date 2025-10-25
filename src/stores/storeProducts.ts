import { supabase } from "../supabase";

export const getProducts = async () => {
  let { data: products, error } = await supabase.from("products").select("*");
  return products;
};
