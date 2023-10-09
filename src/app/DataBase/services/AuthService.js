import supabase from "../Clients/SupabaseClient";

export default class AuthService {
    static async signUp(email, password, role, name, phone, avatar) {
        try {
            const { user, session, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        role: role,
                        name: name,
                        email: email,
                        avatar: avatar,
                        phone: phone,
                    },
                },
            });
            if (error) throw error;
            return { user, session, error };
        } catch (err) {
            console.log(err);
        }
    };

    static async signIn(email, password) {
        try {
            const { user, session, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;
            return { user, session, error };
        } catch (err) {
            console.log(err);
        }
    };

    static async signOut() {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            return { error };
        } catch (err) {
            console.log(err);
        }
    };

    static async forgotPassword(email) {
        try {
            const { error } = await supabase.auth.api.resetPasswordForEmail(email);
            if (error) throw error;
            return { error };
        } catch (err) {
            console.log(err);
        }
    };
}

// export const signUp = async (email, password,role,name,phone,avatar) => {
//     const { user, session, error } = await supabase.auth.signUp({
//         email,
//         password,
//         options: {
//             data: {
//                 role: role,
//                 name: name,
//                 email: email,
//                 avatar: avatar,
//                 phone: phone,
//             },
//         },
//     });
//     return { user, session, error };
// };

// export const signIn = async (email, password) => {
//     const { user, session, error } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//     });
//     return { user, session, error };
// };

// export const signOut = async () => {
//     const { error } = await supabase.auth.signOut();
//     return { error };
// };

// export const forgotPassword = async (email) => {
//     const { error } = await supabase.auth.resetPasswordForEmail(email, {
//         redirectTo: 'http://google.com',
//       })
//     return { error };
// };
