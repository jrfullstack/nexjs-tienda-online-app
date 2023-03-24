import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { dbUsers } from "../../../database";

declare module "next-auth" {
    interface Session {
        accessToken?: string;
    }
}
export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        
        // ...add more providers here

        CredentialsProvider ({
            name: "Custom Login",

            credentials: {
                email: { label: 'Correo:', type: 'email', playcerholder: 'correo@gmail.com' },
                password: { label: 'Contraseña:', type: 'password', playcerholder: 'Contraseña' },
            },

            async authorize(credentials){
                // console.log({credentials})

                // const user2 = {id: '1', name: 'Juan', email: 'juan@gmail.com', role: 'admin'};

                const user = await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password);

                if (user) {
                    // return user
                    return {
                        // TODO: _id
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    }
                } else {
                    return null;
                }
            
            }

        }),

        GithubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID || '',
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
        })
    ],
    // secret: process.env.NEXT_PUBLIC_SECRET,

    // Custom Pages
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/register'
    },

    session: {
        maxAge: 2592000, // 30 dias
        strategy: 'jwt',
        updateAge: 86400, // cada dia
    },

    // Callbakcs
    callbacks: {

        async jwt({token, account, user}){
            // console.log({ token, account, user });

            if(account){
                token.accessToken = account.access_token;

                switch (account.type) {
                    case 'oauth':
                        token.user = await dbUsers.oAuthToDbUser(user?.email || '', user?.name || '');
                        break;

                    case 'credentials':
                        token.user = user;
                        break;
                
                    // default:
                    //     break;
                }
            }

            return token;
        },

        async session({session, token, user}){
            // console.log({ session, token, user })
            session.accessToken = token.accessToken as any;
            session.user = token.user as any;


            return session;
        }
    }
}
export default NextAuth(authOptions);