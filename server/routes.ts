import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMessageSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/venues", async (_req, res) => {
    const venues = await storage.getVenues();
    res.json(venues);
  });

  app.get("/api/venues/:id", async (req, res) => {
    const venue = await storage.getVenue(Number(req.params.id));
    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }
    res.json(venue);
  });

  app.get("/api/events", async (_req, res) => {
    const events = await storage.getEvents();
    res.json(events);
  });

  app.get("/api/events/:id", async (req, res) => {
    const event = await storage.getEvent(Number(req.params.id));
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  });

  app.get("/api/venues/:id/events", async (req, res) => {
    const events = await storage.getVenueEvents(Number(req.params.id));
    res.json(events);
  });

  app.post("/api/contact", async (req, res) => {
    const result = insertMessageSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid message data" });
    }
    
    const message = await storage.createMessage(result.data);
    res.json(message);
  });

  const httpServer = createServer(app);
  return httpServer;
}
