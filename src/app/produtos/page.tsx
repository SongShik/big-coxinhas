import { supabase } from "@/lib/supabase";

export default async function Produtos() {
      const { data: products } = await supabase.from("product").select("*");

  return <div className="flex justify-center align-middle">
      {products && products.map((p) => (
        <div key={p.id}>{p.name}</div>
      ))}
  </div>;
}