import { useLoaderData } from "react-router";

import EmptyTabPanel from "../../components/EmptyTabPanel";
import FavoritesList from "./FavoritesList";
import "./Favorites.css";

export default function Favorites() {
  const data = useLoaderData();
  const favoritePairs = data.favoritePairs;
  if (favoritePairs.length === 0) return <EmptyTabPanel tab="favorites" />;
  return (
    <div className="favorites list-wrapper">
      <FavoritesHeader count={favoritePairs.length} />
      <FavoritesList favorites={favoritePairs} />
    </div>
  );
}
function FavoritesHeader({ count }: { count: number }) {
  return (
    <p className="favorites__header list-header">
      <span className="favorites__title">Pinned pairs</span>
      <span className="favorites__count">{count} favorites</span>
    </p>
  );
}
