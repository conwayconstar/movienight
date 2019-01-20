import constants from '../constants/movie.constants';

const initialState = { rated: [], favorites: [] };

export default function movie(state = initialState, action) {
  const { rated, favorites } = state;

  switch (action.type) {
    case constants.FETCH_RATING_SUCCESS:
      return {
        ...state,
        rated: action.movies,
      };

    case constants.FETCH_FAVORITE_SUCCESS:
      return {
        ...state,
        favorites: action.movies,
      };

    case constants.SET_RATING_SUCCESS:
      if (rated.find(x => x.id === action.movie.id)) {
        rated.find(x => x.id === action.movie.id).rating = action.movie.value;
        return {
          ...state,
          rated,
        };
      }

      return {
        ...state,
        rated: [
          ...rated,
          action.movie,
        ],
      };

    case constants.SET_FAVORITE_SUCCESS:
      if (favorites.find(x => x.id === action.movie.id)) {
        return {
          ...state,
          favorites: favorites.filter(m => m.id !== action.movie.id),
        };
      }
      return {
        ...state,
        favorites: [
          ...favorites,
          action.movie,
        ],
      };
    default:
      return state;
  }
}
