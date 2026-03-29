import { productsColumns } from "@/components/products/productsColumns";
import { DataTable } from "@/components/table/data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";

export default async function Produtos() {
  const { data: products } = await supabase.from("product").select("*");

  return <div className="">

    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Project Overview</CardTitle>
        <CardDescription>
          Track progress and recent activity for your Next.js app.
        </CardDescription>
      </CardHeader>
      <CardContent>
        Your design system is ready. Start building your next component.  
        Your design system is ready. Start building your next component.  Your design system is ready. Start building your next component.
      </CardContent>
    </Card>

    <div className="mt-6"></div>
    {products &&
      <DataTable columns={productsColumns} data={products} />
    }
  </div>;
}