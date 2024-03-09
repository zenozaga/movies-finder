import type { EpisodeType } from "./models/episode";
import type { MovieType } from "./models/movie";
import type { SerieType } from "./models/serie";
import type { SourceType } from "./models/source";
import type { CastType } from "./models/cast";
import type { CategoryType } from "./models/category";
import type { SeasonType } from "./models/season";
import type DefaultProvider from "./providers/default-provider";
import Requester, { Response } from "./models/requester";
import Movie from "./models/movie";
import TvShow from "./models/serie";
import Episode from "./models/episode";
import Season from "./models/season";
export * from ".";
declare enum MediaTypes {
    movie = "movie",
    tv = "tv",
    anime = "anime",
    unknown = "unknown",
    episode = "episode"
}
declare enum Languages {
    en = "english",
    es = "spanish",
    mx = "latino",
    sub = "subtitulado",
    cast = "castellano",
    unknown = "unknown"
}
export { MovieType, SerieType, EpisodeType, SourceType, CastType, CategoryType, SeasonType, MediaTypes, Languages, DefaultProvider, Requester, Response, Movie, TvShow, Episode, Season };
