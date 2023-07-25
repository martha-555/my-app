import { useEffect, useState } from "react";
import useFetchUsersPlaylists from "../../feautures/api/hooks/deezer/useFetchUsersPlaylists"
import PageWrapper from "../../layout/PageWrapper/PageWrapper"
import useCreatePlaylist from "../../feautures/api/hooks/deezer/useCreatePlaylist";

const Playlists = () => {
    const [create,setCreate] = useState<string>('')
    const [name,setName] = useState<string>('')
    const playlists = useFetchUsersPlaylists();
   const request =  useCreatePlaylist()
   useEffect(() => {
     request(create)
   
    },[create])

    return(
        <div>
            <PageWrapper>
<input type="text" onChange={(e) => {setName(e.target.value)}} />
<button onClick={() => {setCreate(name)}}>create playlist</button>
            </PageWrapper>
        </div>
    )
}
export default Playlists