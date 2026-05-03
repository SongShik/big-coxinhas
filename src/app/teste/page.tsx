import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default async function Teste() {
  return (
    <>
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle>Project Overview</CardTitle>
          <CardDescription>Track progress and recent activity for your Next.js app.</CardDescription>
        </CardHeader>
        <CardContent>
          Your design system is ready. Start building your next component. Your design system is ready. Start building
          your next component. Your design system is ready. Start building your next component.
        </CardContent>
      </Card>
      <h1 className="text-3xl">Teste de fonte</h1>
      <h2 className="text-2xl">Teste de fonte</h2>
      <h3 className="text-xl ">Teste de fonte</h3>
      <p className="text-base text-laranja-700">Teste de fonte</p>
      <p className="text-base text-laranja-600">Teste de fonte</p>
      <p className="text-base text-laranja-500">Teste de fonte</p>
      <p className="text-base text-laranja-400">Teste de fonte</p>
      <small className="text-sm">Teste de fonte</small>

      <div className="mt-6"></div>
      <h1 className="text-3xl">Roadmap Big coxinhas</h1>
      <p className="text-base">login</p>
      <p className="text-base">produto crud</p>
      <p className="text-base">Cliente crud</p>
      <p className="text-base">Comanda crud</p>
      <p className="text-base">Pagamento crud</p>
      <p className="text-base">Calculo da massada</p>

      <div className="mt-6"></div>
      <h1 className="text-3xl">Coisas a implementar</h1>
      <p className="text-base">toltip ao salvar ou dar erro</p>

      <p className="text-base">poder fazer cadastro via whatsapp</p>
      <p className="text-base">
        Dashbord na pagina inicial, contendo massada do dia, pedidos do dia, clientes do dia, pagamentos pendentes
      </p>
      <p>Criar menu para mobile</p>
      <p>dasbord</p>
      <p>produtos</p>
      <p>Comanda</p>
      <p>Adicionar comanda</p>
      <p>pagamentos</p>
    </>
  )
}
