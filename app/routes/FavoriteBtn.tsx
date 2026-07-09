import { useFetcher, useLoaderData } from "react-router";
import { StarFilledIcon, StarIcon } from "./icons";

interface FavoriteBtnProps {
  base: string;
  quote: string;
  className: string;
  includeTxt?: boolean;
}
export default function FavoriteBtn({
  base,
  quote,
  className,
  includeTxt = true,
}: FavoriteBtnProps) {
  const fetcher = useFetcher();
  const data = useLoaderData();
  let favoritePairs = data.favoritePairs;
  const favorited = favoritePairs.includes(`${base},${quote}`);
  const favBtnClassName = favorited ? `${className}--favorited` : "";
  const favBtnIcon = favorited ? <StarFilledIcon /> : <StarIcon />;
  const favBtnTxt = favorited ? "Favorited" : "Favorite";

  function handleFavoriteClick() {
    const pair = `${base},${quote}`;
    if (favorited) {
      favoritePairs = favoritePairs.filter((item: string) => item !== pair);
    } else {
      favoritePairs.push(pair);
    }
    fetcher.submit(
      { favoritePairs },
      {
        method: "post",
        encType: "application/json",
      },
    );
  }
  return (
    <button
      type="button"
      onClick={handleFavoriteClick}
      className={`${className} ${favBtnClassName}`}
      aria-label={includeTxt ? "" : favBtnTxt}
    >
      {favBtnIcon}
      {includeTxt ? <span>{favBtnTxt}</span> : <></>}
    </button>
  );
}
