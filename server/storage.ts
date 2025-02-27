import { type Venue, type Event, type Message, type InsertVenue, type InsertEvent, type InsertMessage } from "@shared/schema";

export interface IStorage {
  getVenues(): Promise<Venue[]>;
  getVenue(id: number): Promise<Venue | undefined>;
  getEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  getVenueEvents(venueId: number): Promise<Event[]>;
  createMessage(message: InsertMessage): Promise<Message>;
}

export class MemStorage implements IStorage {
  private venues: Map<number, Venue>;
  private events: Map<number, Event>;
  private messages: Map<number, Message>;
  private currentIds: { [key: string]: number };

  constructor() {
    this.venues = new Map();
    this.events = new Map();
    this.messages = new Map();
    this.currentIds = { venue: 1, event: 1, message: 1 };
    this.initializeMockData();
  }

  private initializeMockData() {
    const mockVenues: InsertVenue[] = [
      {
        name: "Shelter",
        description: "Underground live house featuring indie rock bands",
        address: "2-6-10 Kitazawa, Setagaya-ku, Tokyo",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745",
        genre: "Rock",
        capacity: 200,
        features: ["Stage", "Bar", "Sound System"],
        website: "https://www.loft-prj.co.jp/SHELTER/",
        phone: "+81-3-3466-7430"
      },
      {
        name: "Three",
        description: "Cozy jazz bar with live performances",
        address: "2-12-15 Kitazawa, Setagaya-ku, Tokyo",
        image: "https://images.unsplash.com/photo-1475275166152-f1e8005f9854",
        genre: "Jazz",
        capacity: 50,
        features: ["Intimate Setting", "Full Bar", "Piano"],
        website: "https://www.three.tokyo/",
        phone: "+81-3-3460-8755"
      }
    ];

    mockVenues.forEach(venue => {
      this.venues.set(this.currentIds.venue, {
        id: this.currentIds.venue,
        ...venue
      });
      this.currentIds.venue++;
    });

    const mockEvents: InsertEvent[] = [
      {
        title: "Tokyo Underground Rock Night",
        description: "Local indie bands showcase",
        venueId: 1,
        date: new Date("2024-04-15T19:00:00"),
        price: 2500,
        image: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73",
        performers: ["The Cores", "Tokyo Dragons", "Night Owls"]
      },
      {
        title: "Jazz Session",
        description: "Late night jazz performance",
        venueId: 2,
        date: new Date("2024-04-16T20:00:00"),
        price: 3000,
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
        performers: ["Midnight Quartet", "Blue Notes"]
      }
    ];

    mockEvents.forEach(event => {
      this.events.set(this.currentIds.event, {
        id: this.currentIds.event,
        ...event
      });
      this.currentIds.event++;
    });
  }

  async getVenues(): Promise<Venue[]> {
    return Array.from(this.venues.values());
  }

  async getVenue(id: number): Promise<Venue | undefined> {
    return this.venues.get(id);
  }

  async getEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async getVenueEvents(venueId: number): Promise<Event[]> {
    return Array.from(this.events.values()).filter(event => event.venueId === venueId);
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const id = this.currentIds.message++;
    const newMessage = {
      id,
      ...message,
      createdAt: new Date()
    };
    this.messages.set(id, newMessage);
    return newMessage;
  }
}

export const storage = new MemStorage();
