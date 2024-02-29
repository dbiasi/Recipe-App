// Context provides a way to pass data through the component tree without having to pass
// props down manually at every level.

import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParams, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [favoritesList, setFavoritesList] = useState([]);
  const navigate = useNavigate();

  const APIKey = "e84b33f1-369a-4949-abe6-cdf67e4f9bda";

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParams}&key=${APIKey}`
      );
      const data = await response.json();
      if (data?.data?.recipes) {
        setRecipeList(data?.data?.recipes);
        navigate("/");
      }

      console.log(data);
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
      setSearchParam("");
    }
  }

  const handleAddToFavorite = (getCurrentItem) => {
    let copyFavoritesList = [...favoritesList];
    const index = copyFavoritesList.findIndex(
      (item) => item.id === getCurrentItem.id
    );

    if (index === -1) {
      copyFavoritesList.push(getCurrentItem);
    } else {
      copyFavoritesList.splice(index, 1); // remove the getCurrentItem by index from the copyFavoritesList
    }

    setFavoritesList(copyFavoritesList);
  };

  console.log(favoritesList, "Favorite List");

  return (
    <GlobalContext.Provider
      value={{
        searchParams,
        recipeList,
        loading,
        recipeDetailsData,
        favoritesList,
        setRecipeDetailsData,
        setSearchParam,
        handleSubmit,
        handleAddToFavorite,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
