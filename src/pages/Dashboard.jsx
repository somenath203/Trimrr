/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import BarLoader from "react-spinners/BarLoader";
import { Filter } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import ErrorMessageComponent from "@/components/ErrorMessageComponent";
import useFetch from "@/hooks_for_api_calls/use-fetch";
import { getAllUrlsOfCurrentLoggedInUser } from "@/supabase_apis/apiUrl";
import { UrlGlobalState } from "@/context/context";
import { getAllClicksForUrlsOfCurrentLoggedInUser } from "@/supabase_apis/apiUrlClicks";
import LinkCard from "@/components/LinkCard";
import CreateLink from "@/components/CreateLink";


const Dashboard = () => {

  const [ searchForLinksInput, setSearchForLinksInput ] = useState('');

  const { loggedInUser } = UrlGlobalState();

  const { 
    data: allUrls, 
    executeCallbackFunction: executeFetchAllUrlFunction, 
    error: urlError, 
    loading: allUrlsLoading
  } = useFetch(getAllUrlsOfCurrentLoggedInUser, loggedInUser?.id);
  
  const { 
    data: allClicks, 
    executeCallbackFunction: executeFetchAllClicksFunction, 
    error: clickError, 
    loading: allClicksLoading
  } = useFetch(getAllClicksForUrlsOfCurrentLoggedInUser, allUrls?.map((url) => url.id));
  // here, we are passing id of all created urls by doing: allUrls?.map((url) => url.id)

  useEffect(() => {

    executeFetchAllUrlFunction();

  }, []);
  

  const searchUrlBasedOnInputInSearchFilterInputField = allUrls?.filter((url) => {

    return url?.title_of_url?.toLowerCase().includes(searchForLinksInput.toLowerCase());

  });


  useEffect(() => {

    if(allUrls?.length) {

      executeFetchAllClicksFunction();

    }

  }, [allUrls]);


  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">


     {(allUrlsLoading || allClicksLoading) && <BarLoader width={'100%'} color="#36d7b7" />}


      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <Card>

          <CardHeader>
            <CardTitle>Total Links</CardTitle>
          </CardHeader>

          <CardContent>
            <p>{allUrls?.length}</p>
          </CardContent>

        </Card>

        <Card>

          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>

          <CardContent>
            <p>{allClicks?.length}</p>
          </CardContent>
          
        </Card>

      </div>


      <div className="flex flex-col gap-4 md:flex-row justify-between items-center">

        <h1 className="text-3xl md:text-4xl font-extrabold">My Links</h1>

        <CreateLink />
        
      </div>


      <div className="relative mt-4">

        <Input 
          type='text' 
          value={searchForLinksInput} 
          placeholder='search for links...' 
          onChange={(e) => setSearchForLinksInput(e.target.value)}
        />

        <Filter className="absolute top-2 right-2 p-1" />

      </div>


      {urlError && <ErrorMessageComponent message={urlError.message} />}
      
      {clickError && <ErrorMessageComponent message={clickError.message} />}


      <div className="flex flex-col gap-4">
        {(searchUrlBasedOnInputInSearchFilterInputField || []).map((url, index) => (
          
          <LinkCard 
            key={index} 
            url={url} 
            executeFetchAllUrlFunction={executeFetchAllUrlFunction}
          />
        ))}
      </div>

    </div>
  )
}

export default Dashboard;
