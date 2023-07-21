import useFetchUsersPlaylists from "../../feautures/api/hooks/deezer/useFetchUsersPlaylists"
import PageWrapper from "../../layout/PageWrapper/PageWrapper"

const Playlists = () => {
    const playlists = useFetchUsersPlaylists();
    console.log(playlists)
    return(
        <div>
            <PageWrapper>

            </PageWrapper>
        </div>
    )
}
export default Playlists