import { supabase } from "../supabase";
import type { ICheckOut } from "@/Interfaces/ICheckOut";

export const getProducts = async () => {
  let { data: products, error } = await supabase.from("products").select("*");
  return products;
};
export const insertCheckout = async (newCheckout: ICheckOut) => {
  let { data, error } = await supabase.from("checkouts").insert([
    {
      total: newCheckout.total,
      products_quantity: newCheckout.products_quantity,
      products_ids: newCheckout.products_ids,
    },
  ]);
  if (!error) {
    return data;
  } else {
    return error;
  }
};
export const insertFixedCheckout = async () => {
  const newCheckout: ICheckOut = {
    total: 999,
    products_quantity: 4,
    products_ids: [9, 5, 1, 3],
  };
  let { data, error } = await supabase.from("checkouts").insert([
    {
      total: newCheckout.total,
      products_quantity: newCheckout.products_quantity,
      products_ids: newCheckout.products_ids,
    },
  ]);
  return { data, error };
};

// insert into checkouts (total, products_quantity, products_ids) values ( 300, 3, array [2,2,4])
// select * from checkouts
