import { Session } from "next-auth"
import { JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"
import { AuthOptions } from "next-auth";
import { supabase } from "@/lib/supabase"

declare module "next-auth" {
  interface Session {
    user?: {
      id?: string;
      name?: string | null;
      email?: string | null;
      role?: string;
    };
  }
}

export interface CustomToken extends JWT {
  id?: string;
  name?: string | null;
  email?: string | null;
  role?: string;
}


export const authOptions: AuthOptions  = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: 'Name', type: 'text' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(
        credentials: Record<'email' | 'password', string> | undefined,
        req: unknown
      ) {
        if (!credentials) {
          throw new Error('Missing credentials')
        }

        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        })

        if (error || !data.user) { return null }

        const { data: userProfile } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', data.user.id)
          .single()

        if (error || !data.user) return null

        return {
          id: data.user.id,
          email: data.user.email,
          name: userProfile?.name,
          role: userProfile?.role
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60,
  },
  callbacks: {
    async jwt({ token, user } : { token: CustomToken, user: Session['user'] }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.role = user.role
      }
      return token
    },
    async session({ session, token } : { session: Session, token: CustomToken }) {
      session.user = {
        id: token.id,
        email: token.email,
        name: token.name,
        role: token.role
      }
      return session
    }
  },
}