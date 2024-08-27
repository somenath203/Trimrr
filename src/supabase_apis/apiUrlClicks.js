import { UAParser } from 'ua-parser-js';

import supabase from '@/db/supabase';

const parser = new UAParser();

export const findTargetUrlForRedirection = async (short_url_or_custom_url) => {
  try {
    if (short_url_or_custom_url) {
      const { data, error } = await supabase
        .from('urls')
        .select('id, original_url')
        .or(
          `short_url.eq.${short_url_or_custom_url}, custom_url.eq.${short_url_or_custom_url}`
        )
        .single();

      if (error) {
        console.log(error);

        throw new Error(error?.message);
      }

      return data;
    }
  } catch (error) {
    console.log(error);

    return error;
  }
};

export const storeClicksDetailsOfUrlsOnClick = async ({
  url_id,
  original_url,
}) => {
  try {
    if (url_id && original_url) {
      const res_device = parser.getResult();

      const device_name = res_device.type || 'Desktop/Laptop';

      const res_city_country = await fetch(`https://ipapi.co/json`);

      const { city, country_name: country } = await res_city_country.json();

      await supabase.from('clicks').insert({
        url_id: url_id,
        city_in_which_url_was_clicked: city,
        country_in_which_url_was_clicked: country,
        device_in_which_url_was_clicked: device_name,
      });

      window.location.href = original_url;
    }
  } catch (error) {
    console.log(error);

    return error;
  }
};
