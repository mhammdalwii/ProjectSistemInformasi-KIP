import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prismadb from "@/lib/db";
import { DefaultSession } from "next-auth";
import { Role } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: Role;
    } & DefaultSession["user"];
  }

  // Extend User so callbacks that receive `user` know about `role`
  interface User {
    id?: string;
    role?: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: Role;
  }
}
// Definisikan tipe untuk authOptions
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      // INI LOGIKA UTAMA YANG BARU
      async authorize(credentials) {
        // 1. Cek apakah email dan password ada
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email dan password wajib diisi");
        }

        // 2. Cari user di database berdasarkan email
        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // 3. Jika user tidak ditemukan atau tidak punya password (misal: login via Google)
        if (!user || !user.password) {
          throw new Error("Email tidak terdaftar");
        }

        // 4. Bandingkan password yang diinput dengan hash di database
        const isPasswordMatch = await bcrypt.compare(credentials.password, user.password);

        // 5. Jika password tidak cocok
        if (!isPasswordMatch) {
          throw new Error("Password salah");
        }

        // 6. Jika semua cocok, kembalikan data user
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],

  // Memberitahu NextAuth di mana halaman login kustom kita
  pages: {
    signIn: "/login",
  },

  // Mengatur strategi session (JWT)
  session: {
    strategy: "jwt" as const,
  },

  // Callbacks untuk menambahkan 'id' user ke session
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
      }
      return session;
    },
  },

  // Mengambil secret key dari file .env
  secret: process.env.AUTH_SECRET,

  // Meng-handle error agar ditampilkan di halaman login
  // (Ini akan bekerja dengan 'res.error' di halaman login Anda)
  // Kita ubah sedikit halaman login agar bisa menangkap error ini
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
