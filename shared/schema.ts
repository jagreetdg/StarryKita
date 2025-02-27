import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const venues = pgTable("venues", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  address: text("address").notNull(),
  image: text("image").notNull(),
  type: text("type").notNull(), // 'live_house', 'bar'
  genre: text("genre").notNull(),
  capacity: integer("capacity").notNull(),
  features: text("features").array().notNull(),
  openingHours: text("opening_hours").notNull(),
  priceRange: text("price_range").notNull(), // e.g. "¥1000-3000"
  website: text("website"),
  phone: text("phone"),
  googleMapsUrl: text("google_maps_url"),
  rating: text("rating"),
  reviewCount: integer("review_count"),
  popularTimes: text("popular_times"),
  reviews: text("reviews").array(),
  additionalImages: text("additional_images").array(),
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  venueId: integer("venue_id").notNull(),
  date: timestamp("date").notNull(),
  price: integer("price").notNull(),
  image: text("image").notNull(),
  performers: text("performers").array().notNull(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertVenueSchema = createInsertSchema(venues).omit({ id: true });
export const insertEventSchema = createInsertSchema(events).omit({ id: true });
export const insertMessageSchema = createInsertSchema(messages).omit({ id: true, createdAt: true });

export type Venue = typeof venues.$inferSelect;
export type Event = typeof events.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type InsertVenue = z.infer<typeof insertVenueSchema>;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type InsertMessage = z.infer<typeof insertMessageSchema>;