import {React , createContext , useReducer, useEffect}  from 'react'




const initialState = {
    watchlist : localStorage.getItem("watchlist") ? 
                JSON.parse(localStorage.getItem("watchlist")) : [] ,
    watched : localStorage.getItem("watched") ?
              JSON.parse(localStorage.getItem("watched")) : []
};

export const GlobalContext = createContext(initialState)

const reducer = (state , action)=>{
    switch(action.type){
        case 'ADD_MOVIE_TO_WATCHLIST':
          return{
          ...state,
          watchlist : [action.payload , ...state.watchlist]
        }
        case 'REMOVE_MOVIE_FROM_WATCHLIST':
          return{
            ...state,
            watchlist : state.watchlist.filter((movie)=> movie.imdbID !== action.payload)
          }
        case 'ADD_MOVIE_TO_WATCHED':
          return{
            ...state,
            watchlist : state.watchlist.filter((movie)=> movie.imdbID !== action.payload.imdbID),
            watched : [action.payload , ...state.watched]
          }
        case 'MOVE_TO_WATCHLIST':
          return{
            ...state,
            watched : state.watched.filter((movie)=> movie.imdbID !== action.payload.imdbID),
            watchlist : [action.payload , ...state.watchlist]
          }
        case 'REMOVE_FROM_WATCHED':
          return{
            ...state,
            watched : state.watched.filter((movie)=> movie.imdbID !== action.payload)
          }
        default:
            return state
    }
}

const GlobalProvider = (props) => {
    const [state , dispatch ] = useReducer(reducer , initialState)


    useEffect(()=>{
      localStorage.setItem('watchlist' , JSON.stringify(state.watchlist))
      localStorage.setItem('watched' , JSON.stringify(state.watched))
    } , [state])



  return (
    <GlobalContext.Provider value={{watchlist : state.watchlist , watched : state.watched , MoviesDispatch : dispatch }}>
      {props.children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider