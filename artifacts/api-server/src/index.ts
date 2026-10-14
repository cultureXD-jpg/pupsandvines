import app from "./app";
import { seedIfEmpty, syncHours, syncContent, syncCoordinates, syncNewWineries, syncRegions, syncYelpUrls, syncFeaturedRank, syncGalleryImages, syncGalleryFixes, syncRatings, syncVenueTypes } from "./seed";
import { scheduleMonthlyRefresh } from "./refresh-winery-data";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);

  seedIfEmpty()
    .then(() => syncHours())
    .then(() => syncContent())
    .then(() => syncNewWineries())
    .then(() => syncRegions())
    .then(() => syncCoordinates())
    .then(() => syncYelpUrls())
    .then(() => syncFeaturedRank())
    .then(() => syncGalleryImages())
    .then(() => syncGalleryFixes())
    .then(() => syncRatings())
    .then(() => syncVenueTypes())
    .catch((err) => {
      console.error("Background sync error:", err);
    });

  scheduleMonthlyRefresh();
});
