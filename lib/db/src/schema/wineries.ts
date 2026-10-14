import { pgTable, serial, text, boolean, real, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const wineriesTable = pgTable("wineries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  address: text("address").notNull(),
  region: text("region").notNull(),
  phone: text("phone"),
  website: text("website"),
  imageUrl: text("image_url"),
  galleryImages: text("gallery_images").array().notNull().default([]),
  latitude: real("latitude"),
  longitude: real("longitude"),
  dogFriendly: boolean("dog_friendly").notNull().default(false),
  sustainable: boolean("sustainable").notNull().default(false),
  familyFriendly: boolean("family_friendly").notNull().default(false),
  napaGreenCertified: boolean("napa_green_certified").notNull().default(false),
  organicCertified: boolean("organic_certified").notNull().default(false),
  amenities: text("amenities").array().notNull().default([]),
  tastingFee: text("tasting_fee"),
  hours: text("hours"),
  dogPolicy: text("dog_policy"),
  featured: boolean("featured").notNull().default(false),
  featuredRank: integer("featured_rank"),
  listingTier: text("listing_tier").notNull().default("free"),
  rating: real("rating"),
  reviewCount: integer("review_count").default(0),
  yelpUrl: text("yelp_url"),
  bookingUrl: text("booking_url"),
  venueType: text("venue_type"),
  createdAt: timestamp("created_at").defaultNow(),
  lastRefreshedAt: timestamp("last_refreshed_at"),
});

export const insertWinerySchema = createInsertSchema(wineriesTable).omit({ id: true, createdAt: true });
export type InsertWinery = z.infer<typeof insertWinerySchema>;
export type Winery = typeof wineriesTable.$inferSelect;
