// types/next-auth.d.ts

import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            email: string;
            name: string;
            netid: string;
            stem_interests: string;
        };
    }

    interface User {
        email: string;
        name: string;
        netid: string;
        stem_interests: string;
    }
}
