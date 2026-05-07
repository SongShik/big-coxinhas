'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Controller, Resolver, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { supabase } from '@/lib/supabase'
import { formatPhone } from '@/utils/formatPhone'

type FormValues = {
  name: string
  phone: string
}

const formSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  phone: z.string().nonempty('Digite o telefone').min(15, { message: 'Numero incompleto' }),
})

type FormOutput = z.infer<typeof formSchema>

export default function ClientesCriar() {
  const router = useRouter()

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
      phone: '',
    },
  })

  async function onSubmit(values: FormOutput) {
    try {
      const { error } = await supabase.from('clients').insert({
        name: values.name,
        phone: values.phone?.toString().replace(/\D/g, ''),
      })

      if (error) {
        console.error(error)
        throw error
      }

      toast.success('Cliente criado com sucesso')

      router.push('/clientes')
    } catch (error) {
      console.error(error)
      toast.error('Erro ao criar cliente, tente novamente mais tarde')
    }
  }

  return (
    <>
      <div className="bg-background px-2 py-4 rounded-lg mt-6">
        <div className="flex justify-between md:items-center flex-col md:flex-row gap-4">
          <div>
            <h1 className="md:text-3xl text-base font-medium">Clientes</h1>
            <p className="text-muted-foreground md:mt-2 text-sm md:text-base">Cadastre novos clientes</p>
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
            name="phone"
            control={control}
            render={({ field }) => (
              <Field data-invalid={!!errors.phone}>
                <FieldLabel>Telefone</FieldLabel>
                <Input
                  {...field}
                  autoComplete="off"
                  value={field.value || ''}
                  onChange={(e) => {
                    const formatted = formatPhone(e.target.value)
                    field.onChange(formatted)
                  }}
                  maxLength={15}
                />
                {errors.phone && <FieldError errors={[errors.phone]} />}
              </Field>
            )}
          />

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
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
