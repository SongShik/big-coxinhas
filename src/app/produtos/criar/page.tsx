'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { supabase } from '@/lib/supabase'

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

const formSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  price: z.number().min(0),
  weight: z.number().min(0).optional(),
  order: z.number().int().min(0).optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function ProdutosCriar() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: FormValues) {
    setLoading(true)
    setError(null)
    try {
      const { error } = await supabase.from('product').insert({
        name: values.name,
        price: values.price,
        weight: values.weight,
        order: values.order,
      })

      if (error) {
        console.error(error)
        throw error
      }

      reset()
      router.push('/produtos')
    } catch (error) {
      console.error(error)
      setError('Erro ao criar produto, tente novamente mais tarde')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="bg-background px-2 py-4 rounded-lg mt-6">
        <div className="flex justify-between md:items-center flex-col md:flex-row gap-4">
          <div>
            <h1 className="md:text-3xl text-base font-medium">Produtos</h1>
            <p className="text-muted-foreground md:mt-2 text-sm md:text-base">Cadastre novos produtos</p>
          </div>
        </div>
      </div>

      <div className="bg-background px-2 py-4 rounded-lg mt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            <Field data-invalid={!!errors.name}>
              <FieldLabel>Nome</FieldLabel>
              <Input {...register('name')} autoComplete="off" />
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
                  value={currencyFormatter.format(field.value ?? 0)}
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
              <Input type="number" {...register('weight')} />
              {errors.weight && <FieldError errors={[errors.weight]} />}
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field data-invalid={!!errors.order}>
              <FieldLabel>Ordem de visualização</FieldLabel>
              <Input type="number" {...register('order')} />
              {errors.order && <FieldError errors={[errors.order]} />}
            </Field>
          </FieldGroup>

          {error && <h3 className="text-destructive text-xl">{error}</h3>}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <>
                <Spinner className="mr-2" data-icon="inline-start" />
                Enviando...
              </>
            ) : (
              'Enviar'
            )}
          </Button>
        </form>
      </div>
    </>
  )
}
