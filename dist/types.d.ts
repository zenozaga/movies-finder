import type { EpisodeType } from "./models/episode";
import type { MovieType } from "./models/movie";
import type { SerieType } from "./models/serie";
import type { SourceType } from "./models/source";
import type { CastType } from "./models/cast";
import type { CategoryType } from "./models/category";
import type { SeasonType } from "./models/season";
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
export { MovieType, SerieType, EpisodeType, SourceType, CastType, CategoryType, SeasonType, MediaTypes, Languages, };
