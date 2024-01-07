import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { mediaItemToId } from "@/backend/metadata/tmdb";
import { EditButton } from "@/components/buttons/EditButton";
import { Icons } from "@/components/Icon";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { MediaGrid } from "@/components/media/MediaGrid";
import { WatchedMediaCard } from "@/components/media/WatchedMediaCard";
import { useBookmarkStore } from "@/stores/bookmarks";
import { useProgressStore } from "@/stores/progress";
import { MediaItem } from "@/utils/mediaTypes";

// async function to get trending movies from TMDB
async function getTrendingMovies() {
  const response = await fetch(
    "https://api.themoviedb.org/3/trending/all/week?api_key=f28c17c55bc565c3080fb4f237259004",
  );
  const data = await response.json();
  const movies = data.results;
  const mediaItems: MediaItem[] = [];
  movies.forEach((movie: any) => {
    mediaItems.push({
      id: movie.id,
      title: movie.title,
      year: 2023,
      type: "movie",
      poster: movie.poster_path,
    });
  });
  return movies;
}

export function TrendingPart() {
  const [gridRef] = useAutoAnimate<HTMLDivElement>();

  const [trending, setTrending] = useState<MediaItem[]>([]);
  useMemo(() => {
    getTrendingMovies().then((data) => {
      setTrending(data);
    });
  }, []);

  console.log(trending);

  // if (trending.length === 0) return null;

  return (
    <div>
      <SectionHeading title="Trending - TMDB" icon={Icons.MOVIE_WEB} />
      <MediaGrid ref={gridRef}>
        {trending.map((v) => (
          // <p key={v.id}>{v.title}</p>
          <a
            key={v.id}
            className="rounded-xl hover:opacity-75 transition-opacity duration-100 cursor-pointer"
            href={encodeURIComponent(mediaItemToId(v))}
          >
            <img
              className="rounded-xl"
              src={`https://image.tmdb.org/t/p/w500${v.poster}`}
            />
          </a>
        ))}
      </MediaGrid>
    </div>
  );
}
