import supabase, { supabaseUrl } from "@/db/supabase";

import { toast } from "sonner";


export const getAllUrlsOfCurrentLoggedInUser = async (user_id) => {

    try {

        const { data, error } = await supabase
                                      .from('urls')
                                      .select('*')
                                      .eq('user_id', user_id)

        
        if (error) {

            throw new Error(error?.message);

        }

        toast("all urls have been fetched successfully", {
            position: 'top-right'
        });

        return data;
        
    } catch (error) {
        
        console.log(error);

        toast("something went wrong while fetching urls", {
            position: 'top-right'
        });

        return error;
        
    }

}


export const createUrl = async ({ title_of_url, original_url, custom_url, user_id }, qrcode) => {
    
    try {

        const shortUrlIDGenerated = Math.random().toString(36).substring(2, 6);

        const name_of_the_qrcode_of_the_short_url = `qr-${shortUrlIDGenerated}`; 

        const { error: storageError,  } = await supabase.storage.from('qrcodes').upload(name_of_the_qrcode_of_the_short_url, qrcode);

        if (storageError) {

            throw new Error(storageError?.message);

        }

        const urlOfTheUploadedQrCodeInDatabase = `${supabaseUrl}/storage/v1/object/public/qrcodes/${name_of_the_qrcode_of_the_short_url}`;


        const { data, error } = await supabase.from('urls').insert([
            {
                title_of_url: title_of_url,
                short_url: shortUrlIDGenerated,
                original_url: original_url,
                custom_url: custom_url || null,
                qr_code: urlOfTheUploadedQrCodeInDatabase,
                user_id: user_id
            }
        ]).select();


        if (error) {

            throw new Error(error?.message);

        }

        toast("url has been created successfully", {
            position: 'top-right'
        });

        return data;


    } catch (error) {
        
        console.log(error);

        toast("something went wrong while creating url", {
            position: 'top-right'
        });

        return error;
        
    }

}


export const deleteUrl = async (url_id) => {

    try {

        const { data, error } = await supabase
              .from('urls')
              .delete()
              .eq('id', url_id); 
        
        
        if (error) {

            throw new Error(error?.message);
    
        }

        toast("url has been deleted successfully", {
            position: 'top-right'
        });
    
        return data;

    } catch (error) {
        
        console.log(error);

        toast("something went wrong while deleting url", {
            position: 'top-right'
        });

        return error;

    }

}


export const getSelectedUrlById = async({ url_id, user_id }) => {

    try {

        const { data, error } = await supabase
                                        .from('urls')
                                        .select('*')
                                        .eq('id', url_id)
                                        .eq('user_id', user_id)
                                        .single();


        if (error) {

            console.log(error);
                                
            throw new Error(error?.message);
                                
        }
                                
                                
        return data;

        
    } catch (error) {
        
        console.log(error);

        return error;

    }

}


export const getAllClicksOfTheSelectedUrl = async(url_id) => {

    try {

        
        const { data, error } = await supabase
                                        .from('clicks')
                                        .select('*')
                                        .eq('url_id', url_id)


        if (error) {

            console.log(error);
                                
            throw new Error(error?.message);
                                
        }


        toast("all clicks of the selected url have been fetched successfully", {
            position: 'top-right'
        });
                                
                                
        return data;

        
    } catch (error) {
        
        console.log(error);

        return error;

    }

}