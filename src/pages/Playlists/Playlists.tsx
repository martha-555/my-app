/** @format */

import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import classes from "./styles.module.scss";
import { useSearchParams } from "react-router-dom";
import PageWrapper from "../../layout/PageWrapper/PageWrapper";
import { PlaylistsContext } from "../../feautures/playlists/playlistsProvider";
import CreatePlaylists from "./CreatePlaylists";
import Tracklist from "../../components/Tracklist/Tracklist";
import Logo  from '../../icons/deleteIcon.png'

const Playlists = () => {
  const [searchParams, setSearchParams] = useSearchParams({});
  const { playlists, getCurrentPlaylist: getCurrentPlaylist, isLoading, allTracks, removePlaylist } =
    useContext(PlaylistsContext);
const [clickedDelete, setClickedDelete] = useState<boolean>(false)
  const currentPlaylist = Number(searchParams.get("playlist"));
  const [clickedPlaylist, setClickedPlaylist] = useState<number>();
  const ref = useRef<HTMLDivElement>(null);
  const playlistsRef = useRef<HTMLDivElement>(null);
  const rightArrowRef = useRef<HTMLDivElement>(null);
  const leftArrovRef = useRef<HTMLDivElement>(null);
  // const [position, setPosition] = useState<number>(ref.current? ref.current.getBoundingClientRect().right: 0)

  

  const handleClickedPlaylist = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLDivElement;
    const playlistId = target.id;
    setClickedPlaylist(+target.id)
    if (target.className.includes("optionContainer") === false && target.className.includes("isDelete") === false && target.localName !== 'img')
      setSearchParams({ playlist: playlistId });
  };

  useEffect(() => {
    getCurrentPlaylist(currentPlaylist);
  }, [currentPlaylist]);



  const handleDeleteClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLDivElement;
+(target.id) == clickedPlaylist? setClickedDelete(!clickedDelete): setClickedDelete(true);
  }

  const deletePlaylist = (e:React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLDivElement;
    removePlaylist(+target.id)
  }


  let pixels = 0;
  const value = 340;

  const rightMove = () => {
  pixels -= value
 if (ref.current && leftArrovRef.current) {
  ref.current.style.transform = `translateX(${pixels}px)`;
   leftArrovRef.current.style.display = 'block';
}
}


const leftMove = () => {
  pixels += value;
  if (ref.current && rightArrowRef.current && leftArrovRef.current) {
    ref.current.style.transform = `translateX(${pixels}px)`;
 rightArrowRef.current.style.display = 'block';
  if ( pixels == 0) leftArrovRef.current.style.display = 'none';
}
}

// ____________________________________________
const options = {
  threshold: 1.0,
};

useLayoutEffect(() => {
  const callback = (entries: any) => {
    const [entry] = entries;
   if (entry.isIntersecting && rightArrowRef.current) rightArrowRef.current.style.display = 'none'
  };
  if (!playlistsRef.current) return;

  var observer = new IntersectionObserver(callback);
  observer.observe(playlistsRef.current);
  
  return () => {
    observer.disconnect();
  };
}, [options]);

useEffect(() => {
// console.log(allTracks)
},[allTracks])

  return (
    <PageWrapper>
      <CreatePlaylists />
      <div className={classes.playlistsContainer}>
        {isLoading ? <div>Loading...</div> : null}

      
          <div className={classes.wrapper}>
             <i onClick={leftMove} ref={leftArrovRef} id="left" className="fa-solid fa-angle-left"></i>

            <div className={classes.carousel} ref={ref}>
            {playlists?.map((item) => (
             <div key={item.id} className={classes.playlistsWrapper}>
              <div style={{backgroundImage:`url(${item.image})`}}
                ref={playlistsRef}
                id={item.id.toString()}
                className={currentPlaylist == item.id? classes.activePlaylist: classes.playlists}
                
                onClick={handleClickedPlaylist}>
                {clickedDelete && clickedPlaylist === +item.id? <div id={item.id.toString()} className={classes.isDelete} onClick={deletePlaylist} >Видалити плейлист?</div>: null }
                <div className={classes.optionContainer} id={item.id.toString()} onClick={handleDeleteClick}>  
                <img className={classes.deleteIcon} id={item.id.toString()} src={Logo} alt="" />
                </div>
              </div>
              <div id={item.id.toString()}>{item.title}</div>
              </div>
            ))}
            </div>
            <i ref={rightArrowRef} onClick={rightMove} id="right" className="fa-solid fa-angle-right"></i>
          </div>
        
          

        {currentPlaylist && allTracks ? (
          <Tracklist
            nextTracks={() =>{}}
            emptyState="Цей плейлист пустий"
            tracks={allTracks}
          />
        ) : null}
       
      </div>
    </PageWrapper>
  );
};

export default Playlists;
