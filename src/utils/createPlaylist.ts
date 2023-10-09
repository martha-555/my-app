import { HttpMethod } from "../feautures/api/types";

type Props = {
    name: string;
    setState:React.Dispatch<React.SetStateAction<number>>,
    request: Function
}

const createPlaylist = ({name, setState,request}:Props) => {
const fetchRequest =  async (name:string) => {
const response = await request(`/user/me/playlists&title=${name}`, HttpMethod.POST);
const id = await response.json();
setState(id.id)
}
fetchRequest(name)
}
export default createPlaylist;