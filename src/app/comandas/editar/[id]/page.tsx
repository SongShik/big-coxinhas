'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Controller, Resolver, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { ModalApagar } from '@/components/modal/modalApagar'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { supabase } from '@/lib/supabase'
import { currencyFormatter } from '@/utils/currencyFormatter'

type FormValues = {
  name: string
  price: number
  weight: number
  order?: number
}

const formSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  price: z.preprocess(
    (v) => (v === undefined || v === null || (typeof v === 'number' && isNaN(v)) ? undefined : v),
    z.number({ error: 'Preço é obrigatório' }).min(0.01, 'Preço não pode ser zero ou negativo'),
  ),
  weight: z.preprocess(
    (v) => (v === undefined || v === null || (typeof v === 'number' && isNaN(v)) ? undefined : v),
    z.number({ error: 'Peso é obrigatório' }).min(0.01, 'Peso não pode ser zero ou negativo'),
  ),
  order: z.number().int('Deve ser um número inteiro').min(0, 'Ordem não pode ser negativa').optional(),
})

type FormOutput = z.infer<typeof formSchema>

export default function ProdutosEditar() {
  const router = useRouter()
  const [loading, setloading] = useState(true)
  const params = useParams()
  const productId = params.id as string
  const [productName, setProductName] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema) as Resolver<FormValues>,
    defaultValues: {
      name: '',
      price: undefined,
      weight: undefined,
      order: 20,
    },
  })

  useEffect(() => {
    async function loadProduct() {
      try {
        const { data, error } = await supabase.from('products').select('*').eq('id', productId).single()

        if (error) {
          throw error
        }

        reset({
          name: data.name,
          price: data.price,
          weight: data.weight,
          order: data.order,
        })
        setProductName(data.name)
      } catch (error) {
        console.error(error)
        toast.error('Erro ao carregar produto')
        router.push('/produtos')
      } finally {
        setloading(false)
      }
    }

    loadProduct()
  }, [productId, reset, router])

  async function onSubmit(values: FormOutput) {
    try {
      const { error } = await supabase
        .from('products')
        .update({
          name: values.name,
          price: values.price,
          weight: values.weight,
          order: values.order,
        })
        .eq('id', productId)

      if (error) {
        throw error
      }

      toast.success('Produto atualizado com sucesso')

      router.push('/produtos')
    } catch (error) {
      console.error(error)
      toast.error('Erro ao atualizar produto')
    }
  }

  async function excluirProduto(id: string) {
    try {
      const { error } = await supabase
        .from('products')
        .update({
          active: false,
        })
        .eq('id', id)
        .eq('active', true)

      if (error) {
        throw error
      }

      toast.success('Produto excluído com sucesso')

      router.push('/produtos')
    } catch (error) {
      console.error(error)
      toast.error('Erro ao excluir produto')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center mt-10">
        <Spinner />
      </div>
    )
  }

  return (
    <>
      <div className="bg-background px-2 py-4 rounded-lg mt-6">
        <div className="flex justify-between md:items-center flex-col md:flex-row gap-4">
          <div>
            <h1 className="md:text-3xl text-base font-medium">Editar produto</h1>

            <p className="text-muted-foreground md:mt-2 text-sm md:text-base">Atualize as informações do produto</p>
          </div>
        </div>
      </div>

      <div className="bg-background px-2 py-4 rounded-lg mt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            <Field data-invalid={!!errors.name}>
              <FieldLabel>Nome</FieldLabel>
              <Input {...register('name')} autoComplete="off" disabled={isSubmitting} />
              {errors.name && <FieldError errors={[errors.name]} />}
            </Field>
          </FieldGroup>

          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <Field data-invalid={!!errors.price}>
                <FieldLabel>Preço</FieldLabel>
                <Input
                  disabled={isSubmitting}
                  inputMode="numeric"
                  value={field.value ? currencyFormatter.format(field.value) : ''}
                  onChange={(e) => {
                    field.onChange(Number(e.target.value.replace(/\D/g, '')) / 100)
                  }}
                />
                {errors.price && <FieldError errors={[errors.price]} />}
              </Field>
            )}
          />

          <FieldGroup>
            <Field data-invalid={!!errors.weight}>
              <FieldLabel>Peso (em gramas)</FieldLabel>
              <Input
                type="number"
                min={0}
                disabled={isSubmitting}
                {...register('weight', {
                  valueAsNumber: true,
                })}
              />
              {errors.weight && <FieldError errors={[errors.weight]} />}
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field data-invalid={!!errors.order}>
              <FieldLabel>Ordem de visualização na comanda</FieldLabel>
              <Input
                type="number"
                min={0}
                step={1}
                disabled={isSubmitting}
                {...register('order', {
                  valueAsNumber: true,
                })}
              />
              {errors.order && <FieldError errors={[errors.order]} />}
            </Field>
          </FieldGroup>

          <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
            {isSubmitting ? (
              <>
                <Spinner className="mr-2" data-icon="inline-start" />
                Salvando...
              </>
            ) : (
              'Salvar alterações'
            )}
          </Button>
          <ModalApagar name={productName || 'Produto'} onConfirm={() => excluirProduto(productId)} />
        </form>
      </div>
    </>
  )
}
