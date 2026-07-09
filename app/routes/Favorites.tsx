import "./Favorites.css";
import { useLoaderData } from "react-router";
import FavoritesList from "./FavoritesList";

export default function Favorites() {
  const data = useLoaderData();
  const favoritePairs = data.favoritePairs;
  return (
    <div className="favorites">
      <FavoritesHeader count={favoritePairs.length} />
      <FavoritesList favorites={favoritePairs} />
    </div>
  );
}
function FavoritesHeader({ count }: { count: number }) {
  return (
    <p className="favorites__header">
      <span className="favorites__title">Pinned pairs</span>
      <span className="favorites__count">{count} favorites</span>
    </p>
  );
}
