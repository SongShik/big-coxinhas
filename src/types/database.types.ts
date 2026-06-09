export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      clients: {
        Row: {
          active: boolean | null
          created_at: string
          id: number
          name: string | null
          phone: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string
          id?: number
          name?: string | null
          phone?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string
          id?: number
          name?: string | null
          phone?: string | null
        }
        Relationships: []
      }
      comandas: {
        Row: {
          active: boolean | null
          client_id: number | null
          created_at: string
          date_delivery: string | null
          date_manufacturing: string | null
          date_order: string | null
          freezer: string | null
          id: number
          obs: string | null
          photo: string | null
          status: string | null
          total_comanda: number | null
          user_id: number | null
        }
        Insert: {
          active?: boolean | null
          client_id?: number | null
          created_at?: string
          date_delivery?: string | null
          date_manufacturing?: string | null
          date_order?: string | null
          freezer?: string | null
          id?: number
          obs?: string | null
          photo?: string | null
          status?: string | null
          total_comanda?: number | null
          user_id?: number | null
        }
        Update: {
          active?: boolean | null
          client_id?: number | null
          created_at?: string
          date_delivery?: string | null
          date_manufacturing?: string | null
          date_order?: string | null
          freezer?: string | null
          id?: number
          obs?: string | null
          photo?: string | null
          status?: string | null
          total_comanda?: number | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "comanda_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comanda_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      itens_comanda: {
        Row: {
          comanda_id: number | null
          created_at: string
          id: number
          massada_id: number | null
          product_id: number | null
          quantity: number | null
          total_value: number | null
          unit_value: number | null
        }
        Insert: {
          comanda_id?: number | null
          created_at?: string
          id?: number
          massada_id?: number | null
          product_id?: number | null
          quantity?: number | null
          total_value?: number | null
          unit_value?: number | null
        }
        Update: {
          comanda_id?: number | null
          created_at?: string
          id?: number
          massada_id?: number | null
          product_id?: number | null
          quantity?: number | null
          total_value?: number | null
          unit_value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "itens_comanda_comanda_id_fkey"
            columns: ["comanda_id"]
            isOneToOne: false
            referencedRelation: "comandas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "itens_comanda_comanda_id_fkey1"
            columns: ["comanda_id"]
            isOneToOne: false
            referencedRelation: "massadas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "itens_comanda_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      itens_massada: {
        Row: {
          created_at: string
          id: number
          massada_id: number | null
          product_id: number | null
          quantity: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          massada_id?: number | null
          product_id?: number | null
          quantity?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          massada_id?: number | null
          product_id?: number | null
          quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "itens_massada_massada_id_fkey"
            columns: ["massada_id"]
            isOneToOne: false
            referencedRelation: "massadas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "itens_massada_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      massadas: {
        Row: {
          created_at: string
          date: string | null
          id: number
          qtd_massada: number | null
        }
        Insert: {
          created_at?: string
          date?: string | null
          id?: number
          qtd_massada?: number | null
        }
        Update: {
          created_at?: string
          date?: string | null
          id?: number
          qtd_massada?: number | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          comanda_id: number | null
          created_at: string
          customer_name: string | null
          date: string | null
          id: number
          method_payment: string | null
          photo: string | null
          total: number | null
          user_id: number | null
        }
        Insert: {
          comanda_id?: number | null
          created_at?: string
          customer_name?: string | null
          date?: string | null
          id?: number
          method_payment?: string | null
          photo?: string | null
          total?: number | null
          user_id?: number | null
        }
        Update: {
          comanda_id?: number | null
          created_at?: string
          customer_name?: string | null
          date?: string | null
          id?: number
          method_payment?: string | null
          photo?: string | null
          total?: number | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_comanda_id_fkey"
            columns: ["comanda_id"]
            isOneToOne: false
            referencedRelation: "comandas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          active: boolean | null
          created_at: string
          id: number
          name: string | null
          order: number | null
          price: number | null
          weight: number | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string
          id?: number
          name?: string | null
          order?: number | null
          price?: number | null
          weight?: number | null
        }
        Update: {
          active?: boolean | null
          created_at?: string
          id?: number
          name?: string | null
          order?: number | null
          price?: number | null
          weight?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          id: number
          name: string | null
          role: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: number
          name?: string | null
          role?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: number
          name?: string | null
          role?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
