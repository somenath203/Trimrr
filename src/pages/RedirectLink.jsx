import { useParams } from "react-router-dom";
import { useEffect } from "react";
import BarLoader from 'react-spinners/BarLoader';

import useFetch from "@/hooks_for_api_calls/use-fetch";
import { findTargetUrlForRedirection, storeClicksDetailsOfUrlsOnClick } from "@/supabase_apis/apiUrlClicks";


const RedirectLink = () => {

  const { id } = useParams();


  const {
    data: targetUrlData,
    loading: targetUrlLoading,
    executeCallbackFunction: executeFindTargetUrlFunction
  } = useFetch(findTargetUrlForRedirection, id);


  const {
    loading: storeClicksLoading,
    executeCallbackFunction: executeStoreClicksFunction
  } = useFetch(storeClicksDetailsOfUrlsOnClick, {
    url_id: targetUrlData?.id,
    original_url: targetUrlData?.original_url
  });


  useEffect(() => {

    executeFindTargetUrlFunction();

  }, []);


  useEffect(() => {

    if (!targetUrlLoading && targetUrlData) {

      executeStoreClicksFunction();
      
    }

  }, [targetUrlLoading]);


  if (storeClicksLoading || targetUrlLoading) {

    return (
      <>

        <BarLoader width={'100%'} color="#36d7b7" />

        <br />

        Redirecting... 
        
      </>
    )

  } 


  return null;

}

export default RedirectLink;