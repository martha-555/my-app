import { HttpMethod } from "../../types";
import useDeezerRequest from "./useDeezerRequest";

const useCreatePlaylist = () => {
// /user/me/playlists&title=namr
const request = useDeezerRequest();
return async (name:string) => {
await request(`/user/me/playlists&title=${name}`, HttpMethod.POST);

}
}
export default useCreatePlaylist;