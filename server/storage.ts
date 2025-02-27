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
        description: "Underground live house featuring indie rock bands and emerging artists. Known for its intimate atmosphere and excellent sound system.",
        address: "2-6-10 Kitazawa, Setagaya-ku, Tokyo",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745",
        type: "live_house",
        genre: "Rock",
        capacity: 200,
        features: ["Stage", "Bar", "Professional Sound System", "Standing Room"],
        openingHours: "18:00-23:00",
        priceRange: "¥2000-4000",
        website: "https://www.loft-prj.co.jp/SHELTER/",
        phone: "+81-3-3466-7430"
      },
      {
        name: "Three",
        description: "Cozy jazz bar with nightly live performances. Perfect for enjoying craft cocktails while listening to skilled jazz musicians.",
        address: "2-12-15 Kitazawa, Setagaya-ku, Tokyo",
        image: "https://images.unsplash.com/photo-1475275166152-f1e8005f9854",
        type: "bar",
        genre: "Jazz",
        capacity: 50,
        features: ["Intimate Setting", "Full Bar", "Piano", "Table Service"],
        openingHours: "19:00-02:00",
        priceRange: "¥3000-6000",
        website: "https://www.three.tokyo/",
        phone: "+81-3-3460-8755"
      },
      {
        name: "Club Que",
        description: "Legendary live house and rock club hosting both established and upcoming bands. A cornerstone of Tokyo's rock scene.",
        address: "2-5-2 Kitazawa, Setagaya-ku, Tokyo",
        image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a",
        type: "live_house",
        genre: "Rock",
        capacity: 150,
        features: ["Stage", "Professional Sound System", "Bar", "Merchandise Stand"],
        openingHours: "18:00-23:30",
        priceRange: "¥2500-4500",
        website: "http://www.ukproject.com/que/",
        phone: "+81-3-3412-9979"
      },
      {
        name: "Bar Baobab",
        description: "Cozy African-themed bar known for its unique cocktails and world music selection. Popular among locals and travelers alike.",
        address: "2-3-3 Kitazawa, Setagaya-ku, Tokyo",
        image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34",
        type: "bar",
        genre: "World Music",
        capacity: 30,
        features: ["Craft Cocktails", "International Spirits", "Weekend DJ", "Outdoor Seating"],
        openingHours: "20:00-05:00",
        priceRange: "¥1000-3000",
        website: null,
        phone: "+81-3-3460-7963"
      },
      {
        name: "Ball & Chain",
        description: "Modern nightclub featuring top DJs and a state-of-the-art sound system. The go-to spot for electronic music lovers.",
        address: "2-13-5 Kitazawa, Setagaya-ku, Tokyo",
        image: "https://images.unsplash.com/photo-1571204829887-3b8d69e23d93",
        type: "club",
        genre: "Electronic",
        capacity: 300,
        features: ["Dance Floor", "VIP Area", "Professional Sound System", "Light Show"],
        openingHours: "22:00-05:00",
        priceRange: "¥2000-5000",
        website: "https://ballandchain.jp",
        phone: "+81-3-3795-1440"
      },
      {
        name: "440",
        description: "Historic live house known for supporting the local music scene. Features a mix of genres from rock to experimental.",
        address: "2-18-7 Kitazawa, Setagaya-ku, Tokyo",
        image: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625",
        type: "live_house",
        genre: "Mixed",
        capacity: 100,
        features: ["Vintage Stage", "Bar", "Sound System", "Recording Equipment"],
        openingHours: "19:00-24:00",
        priceRange: "¥2000-3500",
        website: "http://www.440.tokyo/",
        phone: "+81-3-3422-9440"
      },
      {
        name: "Mother",
        description: "Trendy cocktail bar with a vinyl collection and occasional DJ nights. Known for its creative drinks and atmosphere.",
        address: "2-22-6 Kitazawa, Setagaya-ku, Tokyo",
        image: "https://images.unsplash.com/photo-1597075687490-8f673c6c17f6",
        type: "bar",
        genre: "Mixed",
        capacity: 40,
        features: ["Vinyl Collection", "Craft Cocktails", "DJ Booth", "Lounge Area"],
        openingHours: "20:00-03:00",
        priceRange: "¥1500-4000",
        website: "https://mother.tokyo/",
        phone: "+81-3-3795-1440"
      },
      {
        name: "ERA",
        description: "Modern club venue with multiple floors and diverse music programming. Popular for both live bands and DJ sets.",
        address: "2-9-3 Kitazawa, Setagaya-ku, Tokyo",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de",
        type: "club",
        genre: "Mixed",
        capacity: 250,
        features: ["Multiple Floors", "Premium Sound System", "LED Screens", "Smoking Area"],
        openingHours: "21:00-05:00",
        priceRange: "¥2500-6000",
        website: "https://era-tokyo.com",
        phone: "+81-3-5432-9990"
      },
      {
        name: "Poor Cow",
        description: "A cozy standing bar known for its craft beer selection and friendly atmosphere. Popular among locals and tourists alike, this intimate space offers a curated selection of Japanese and international craft beers alongside classic bar snacks.",
        address: "2 Chome-13-2 Kitazawa, Setagaya City, Tokyo 155-0031",
        image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
        type: "bar",
        genre: "Craft Beer",
        capacity: 20,
        features: ["Craft Beer Selection", "Standing Bar", "Bar Food", "English Menu"],
        openingHours: "17:00-24:00",
        priceRange: "¥1000-3000",
        website: null,
        phone: "+81 3-3795-1080",
        googleMapsUrl: "https://maps.app.goo.gl/ydpCVC55Fhmr74nF7",
        rating: "4.3",
        reviewCount: 89,
        popularTimes: "Busiest on Friday and Saturday evenings",
        reviews: [
          "Great selection of craft beers!",
          "Cozy atmosphere, friendly staff who speak some English",
          "Perfect spot for after-work drinks"
        ],
        additionalImages: [
          "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
          "https://images.unsplash.com/photo-1514933651103-005eec06c04b"
        ]
      },
      {
        name: "Tight 5",
        description: "A cornerstone of Shimokitazawa's music scene, this intimate live house hosts both emerging and established artists. Known for its excellent sound system and welcoming atmosphere for performers and audience alike.",
        address: "2 Chome-12-10 Kitazawa, Setagaya City, Tokyo 155-0031",
        image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a",
        type: "live_house",
        genre: "Mixed",
        capacity: 100,
        features: ["Professional Sound System", "Stage", "Bar", "Standing Space"],
        openingHours: "18:30-23:00",
        priceRange: "¥2000-4000",
        website: "http://tight5.jp",
        phone: "+81 3-3795-1996",
        googleMapsUrl: "https://maps.app.goo.gl/EttyK4rUx8ydzqyn7",
        rating: "4.5",
        reviewCount: 156,
        popularTimes: "Varies by performance schedule",
        reviews: [
          "One of the best small venues in Tokyo",
          "Great sound system and atmosphere",
          "Perfect size for indie bands"
        ],
        additionalImages: [
          "https://images.unsplash.com/photo-1501386761578-eac5c94b800a",
          "https://images.unsplash.com/photo-1501386761578-eac5c94b800a"
        ]
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
      },
      {
        title: "Electronic Music Showcase",
        description: "Featured DJs and dance music",
        venueId: 5,
        date: new Date("2024-04-17T22:00:00"),
        price: 3500,
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7",
        performers: ["DJ Akira", "Techno Collective", "Bass Brothers"]
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