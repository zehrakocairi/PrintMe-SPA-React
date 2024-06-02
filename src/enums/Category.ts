export enum Category {
    None = 0,

    // Nature Subcategories
    NaturePrints = 1 << 0,
    Botanical = 1 << 1,
    Animals = 1 << 2,
    SpaceAndAstronomy = 1 << 3,
    MapsAndCities = 1 << 4,
    Nature = NaturePrints | Botanical | Animals | SpaceAndAstronomy | MapsAndCities,

    // Vintage & Retro Subcategories
    RetroAndVintage = 1 << 15,
    BlackAndWhite = 1 << 16,
    GoldAndSilver = 1 << 17,
    HistoricalPrints = 1 << 18,
    ClassicPosters = 1 << 19,
    VintageAndRetro = RetroAndVintage | BlackAndWhite | GoldAndSilver | HistoricalPrints | ClassicPosters,

    // Art Styles Subcategories
    Illustrations = 1 << 30,
    Photographs = 1 << 31,
    ArtPrints = 1 << 32,
    TextPosters = 1 << 33,
    Graphical = 1 << 34,
    ArtStyles = Illustrations | Photographs | ArtPrints | TextPosters | Graphical,

    // Famous Painters Subcategories
    FamousPainters = 1 << 45,
    IconicPhotos = 1 << 46,
    StudioCollections = 1 << 47,
    ModernArtists = 1 << 48,
    AbstractArt = 1 << 49,
    FamousPaintersCategory = FamousPainters | IconicPhotos | StudioCollections | ModernArtists | AbstractArt,
}
