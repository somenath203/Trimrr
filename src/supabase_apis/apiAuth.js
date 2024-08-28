import supabase, { supabaseUrl } from "@/db/supabase";
import { toast } from "sonner"


export const loginUserInSupabase = async ({email, password}) => {

    try {

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {

            throw new Error(error?.message);

        }

        toast("you have logged in successfully", {
            position: 'top-right'
        });

        return data;
               
    } catch (error) {
        
        console.log(error);

        toast("Invalid Authentication or Something went Wrong.", {
            position: 'top-right'
        });

        return error;
        
    }

}


export const signUpUserInSupabase = async ({ name, email, password, profile_pic }) => {

    try {

        const name_of_the_profile_pic = `dp-${name.split(' ').join('-')}-${Math.random()}`; 

        const { error: storageError,  } = await supabase.storage.from('profile_pic').upload(name_of_the_profile_pic, profile_pic);

        if (storageError) {

            throw new Error(storageError?.message);

        }


        const { data, error: signUpError } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    name,
                    profile_pic_path_of_supabase: `${supabaseUrl}/storage/v1/object/public/profile_pic/${name_of_the_profile_pic}`
                }
            }
        });

        if (signUpError) {

            throw new Error(signUpError?.message);

        }

        toast("you have signed up successfully", {
            position: 'top-right'
        });

        return data;
        
    } catch (error) {
        
        console.log(error);

        toast("Invalid Authentication or User already exists.", {
            position: 'top-right'
        });

        return error;

    }

}


export const getCurrentAuthenticatedUser = async () => {

    try {

        const { data, error } = await supabase.auth.getSession();

        if (!data?.session) {

            return null;

        }

        if (error) {

            throw new Error(error?.message);

        }

        return data?.session?.user;
        
    } catch (error) {
        
        console.log(error);

        return error;
        
    }

}


export const logoutUserSupabase = async () => {

    try {

        toast("you have been logged out successfully", {
            position: 'top-right'
        });

        const { error } = await supabase.auth.signOut();

        if (error) {

            throw new Error(error?.message);

        }
        
    } catch (error) {
        
        console.log(error);

        toast("Something went Wrong.", {
            position: 'top-right'
        });

        return error;
        
    }

}