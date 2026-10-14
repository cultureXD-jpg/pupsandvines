export interface TAWineryData {
  url: string;
  rating: number;
  reviewCount: number;
}

export const TRIPADVISOR_DATA: Record<string, TAWineryData> = {
  "castello-di-amorosa":        { rating: 4.5, reviewCount: 5848, url: "https://www.tripadvisor.com/Attraction_Review-g32143-d645572-Reviews-Castello_di_Amorosa-Calistoga_Napa_Valley_California.html" },
  "trefethen-family-vineyards": { rating: 4.5, reviewCount: 488,  url: "https://www.tripadvisor.com/Attraction_Review-g32766-d144102-Reviews-Trefethen_Family_Vineyards-Napa_Napa_Valley_California.html" },
  "jessup-cellars":             { rating: 4.5, reviewCount: 291,  url: "https://www.tripadvisor.com/Attraction_Review-g33300-d1775100-Reviews-Jessup_Cellars_Tasting_Gallery-Yountville_Napa_Valley_California.html" },
  "tamber-bey-vineyards":       { rating: 4.5, reviewCount: 291,  url: "https://www.tripadvisor.com/Attraction_Review-g32143-d2046368-Reviews-Tamber_Bey_Vineyards-Calistoga_Napa_Valley_California.html" },
  "tres-sabores":               { rating: 5.0, reviewCount: 169,  url: "https://www.tripadvisor.com/Attraction_Review-g33000-d2337292-Reviews-Tres_Sabores_Winery-St_Helena_Napa_Valley_California.html" },
  "etude-wines":                { rating: 4.5, reviewCount: 113,  url: "https://www.tripadvisor.com/Attraction_Review-g32766-d1881723-Reviews-Etude_Wines-Napa_Napa_Valley_California.html" },
  "hall-wines":                 { rating: 4.5, reviewCount: 2026, url: "https://www.tripadvisor.com/Attraction_Review-g33000-d1501827-Reviews-HALL_St_Helena-St_Helena_Napa_Valley_California.html" },
  "frogs-leap-winery":          { rating: 4.5, reviewCount: 1090, url: "https://www.tripadvisor.com/Attraction_Review-g32997-d532029-Reviews-Frog_s_Leap_Winery-Rutherford_Napa_Valley_California.html" },
  "pine-ridge-vineyards":       { rating: 4.5, reviewCount: 532,  url: "https://www.tripadvisor.com/Attraction_Review-g32766-d107868-Reviews-Pine_Ridge_Vineyards-Napa_Napa_Valley_California.html" },
  "honig-vineyard-winery":      { rating: 4.5, reviewCount: 169,  url: "https://www.tripadvisor.com/Attraction_Review-g32997-d1382433-Reviews-Honig_Vineyard_Winery-Rutherford_Napa_Valley_California.html" },
  "charles-krug-winery":        { rating: 4.5, reviewCount: 199,  url: "https://www.tripadvisor.com/Attraction_Review-g33000-d282669-Reviews-Charles_Krug_Winery-St_Helena_Napa_Valley_California.html" },
  "tank-garage-winery":         { rating: 4.5, reviewCount: 169,  url: "https://www.tripadvisor.com/Attraction_Review-g32143-d7738496-Reviews-Tank_Garage_Winery-Calistoga_Napa_Valley_California.html" },
  "bouchaine-vineyards":        { rating: 4.5, reviewCount: 128,  url: "https://www.tripadvisor.com/Attraction_Review-g32766-d282674-Reviews-Bouchaine_Vineyards_Napa_Valley-Napa_Napa_Valley_California.html" },
  "chandon-california":         { rating: 4.0, reviewCount: 1034, url: "https://www.tripadvisor.com/Attraction_Review-g33300-d116934-Reviews-Chandon-Yountville_Napa_Valley_California.html" },
  "cliff-lede-vineyards":       { rating: 4.0, reviewCount: 200,  url: "https://www.tripadvisor.com/Attraction_Review-g33300-d3359005-Reviews-Cliff_Lede_Vineyards-Yountville_Napa_Valley_California.html" },
  "st-clair-brown":             { rating: 4.5, reviewCount: 303,  url: "https://www.tripadvisor.com/Attraction_Review-g32766-d8317276-Reviews-St_Clair_Brown_Winery_Brewery-Napa_Napa_Valley_California.html" },
  "mutt-lynch-winery":          { rating: 4.0, reviewCount: 16,   url: "https://www.tripadvisor.com/Attraction_Review-g33280-d7395969-Reviews-Mutt_Lynch_Winery-Windsor_Sonoma_County_California.html" },
  "st-francis-winery":          { rating: 4.5, reviewCount: 232,  url: "https://www.tripadvisor.com/Attraction_Review-g33055-d275853-Reviews-St_Francis_Winery_Vineyards-Santa_Rosa_Sonoma_County_California.html" },
  "amista-vineyards":           { rating: 4.5, reviewCount: 35,   url: "https://www.tripadvisor.com/Attraction_Review-g32482-d1098797-Reviews-Amista_Vineyards-Healdsburg_Sonoma_County_California.html" },
  "lambert-bridge-winery":      { rating: 4.5, reviewCount: 156,  url: "https://www.tripadvisor.com/Attraction_Review-g32482-d563746-Reviews-Lambert_Bridge_Winery-Healdsburg_Sonoma_County_California.html" },
  "muscardini-cellars":         { rating: 4.5, reviewCount: 62,   url: "https://www.tripadvisor.com/Attraction_Review-g32554-d2553985-Reviews-Muscardini_Cellars-Kenwood_Sonoma_County_California.html" },
  "gundlach-bundschu":          { rating: 4.5, reviewCount: 489,  url: "https://www.tripadvisor.com/Attraction_Review-g33107-d556400-Reviews-Gundlach_Bundschu_Winery-Sonoma_Sonoma_County_California.html" },
  "larson-family-winery":       { rating: 4.5, reviewCount: 191,  url: "https://www.tripadvisor.com/Attraction_Review-g33107-d1459408-Reviews-Larson_Family_Winery-Sonoma_Sonoma_County_California.html" },
  "deerfield-ranch-winery":     { rating: 4.5, reviewCount: 198,  url: "https://www.tripadvisor.com/Attraction_Review-g32554-d3981709-Reviews-Deerfield_Ranch_Winery-Kenwood_Sonoma_County_California.html" },
  "seghesio-family-vineyards":  { rating: 4.5, reviewCount: 622,  url: "https://www.tripadvisor.com/Attraction_Review-g32482-d599041-Reviews-Seghesio_Family_Vineyards-Healdsburg_Sonoma_County_California.html" },
  "bartholomew-estate-winery":  { rating: 4.5, reviewCount: 95,   url: "https://www.tripadvisor.com/Attraction_Review-g33107-d215081-Reviews-Bartholomew_Estate_Vineyards_and_Winery-Sonoma_Sonoma_County_California.html" },
  "kunde-family-winery":        { rating: 4.5, reviewCount: 593,  url: "https://www.tripadvisor.com/Attraction_Review-g32554-d143945-Reviews-Kunde_Family_Winery-Kenwood_Sonoma_County_California.html" },
  "br-cohn-winery":             { rating: 4.0, reviewCount: 388,  url: "https://www.tripadvisor.com/Attraction_Review-g32429-d569090-Reviews-B_r_Cohn_Winery-Glen_Ellen_Sonoma_County_California.html" },
  "round-pond-estate":          { rating: 4.5, reviewCount: 417,  url: "https://www.tripadvisor.com/Attraction_Review-g32997-d650283-Reviews-Round_Pond_Estate-Rutherford_Napa_Valley_California.html" },
  "pride-mountain-vineyards":   { rating: 4.5, reviewCount: 660,  url: "https://www.tripadvisor.com/Attraction_Review-g33000-d1158360-Reviews-Pride_Mountain_Vineyards-St_Helena_Napa_Valley_California.html" },
  "ehlers-estate":              { rating: 4.5, reviewCount: 155,  url: "https://www.tripadvisor.com/Attraction_Review-g33000-d1861457-Reviews-Ehlers_Estate_Winery-St_Helena_Napa_Valley_California.html" },
};
