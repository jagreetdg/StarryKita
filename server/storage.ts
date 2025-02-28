import {
	type Venue,
	type Event,
	type Message,
	type InsertVenue,
	type InsertEvent,
	type InsertMessage,
} from "@shared/schema";

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
			// Bars
			{
				name: "BAR GHETTO 『月灯』",
				description:
					"A cozy bar with a warm, vintage vibe, known for its creative cocktails and inclusive atmosphere. Popular among locals and visitors, it offers a welcoming space with a focus on unique mixology.",
				address: "2-1-7 Kitazawa, Setagaya-ku, Tokyo, 155-0031, Japan",
				image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
				type: "bar",
				genre: "Craft Cocktails",
				capacity: 20,
				features: [
					"Creative Cocktails",
					"Vintage Decor",
					"LGBT+ Friendly",
					"Cozy Atmosphere",
				],
				openingHours: "17:00-24:00",
				priceRange: "¥1000-3000",
				website: "https://www.facebook.com/Ghetto.unko/",
				phone: null,
				googleMapsUrl: "https://maps.app.goo.gl/xyz123", // Placeholder URL
				rating: "4.5",
				reviewCount: 1047, // Based on Facebook likes as a proxy
				popularTimes: "Busiest on weekend evenings",
				reviews: [
					"Amazing cocktails and a super friendly vibe!",
					"A hidden gem with a cozy, nostalgic feel",
					"Great spot for a chill night out",
				],
				additionalImages: [
					"https://images.unsplash.com/photo-1514933651103-005eec06c04b",
					"https://images.unsplash.com/photo-1514933651103-005eec06c04b",
				],
			},
			{
				name: "ARENA下北沢",
				description:
					"A versatile venue with a rooftop bar, hosting DJ nights and live bands. Famous for its curry dishes and affordable happy hour, it's a favorite for both drinks and casual dining.",
				address: "2-2-14 Kitazawa, Setagaya-ku, Tokyo, 155-0031, Japan",
				image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
				type: "bar",
				genre: "Music Venue",
				capacity: 50, // Seating capacity from Tabelog
				features: ["Rooftop Bar", "Live Music", "Curry Dishes", "Happy Hour"],
				openingHours: "12:00-24:00",
				priceRange: "¥700-2000",
				website: "http://arena.nomouze.jp/",
				phone: null,
				googleMapsUrl: "https://maps.app.goo.gl/abc456", // Placeholder URL
				rating: "4.2",
				reviewCount: 50, // Estimated from online presence
				popularTimes: "Busiest during happy hour (16:00-19:00)",
				reviews: [
					"Love the rooftop and cheap drinks during happy hour!",
					"Great curry and music combo",
					"Perfect spot for a casual night",
				],
				additionalImages: [
					"https://images.unsplash.com/photo-1514933651103-005eec06c04b",
					"https://images.unsplash.com/photo-1514933651103-005eec06c04b",
				],
			},
			{
				name: "Grow Bar Joint",
				description:
					"A hidden gem offering Thai and Vietnamese-inspired cuisine by day, turning into a lively bar at night. Known for its cozy vibe and occasional DJ parties.",
				address: "2-1-7 Kitazawa, Setagaya-ku, Tokyo, 155-0031, Japan",
				image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
				type: "bar",
				genre: "Music Bar",
				capacity: 30, // Estimated
				features: [
					"Thai/Vietnamese Cuisine",
					"DJ Nights",
					"Cozy Vibe",
					"Day-to-Night Transition",
				],
				openingHours: "Varies (typically 18:00-24:00 as a bar)",
				priceRange: "¥1000-2000",
				website: "https://www.facebook.com/GrowBarJoint/",
				phone: null,
				googleMapsUrl: "https://maps.app.goo.gl/def789", // Placeholder URL
				rating: "4.4",
				reviewCount: 30, // Estimated
				popularTimes: "Busiest on weekend nights",
				reviews: [
					"Great food and chill bar atmosphere",
					"Love the DJ nights here!",
					"A unique spot in Shimokitazawa",
				],
				additionalImages: [
					"https://images.unsplash.com/photo-1514933651103-005eec06c04b",
					"https://images.unsplash.com/photo-1514933651103-005eec06c04b",
				],
			},
			{
				name: "Never Never Land",
				description:
					"A long-standing music and dining bar with a 45-year history, offering creative spice cuisine like Myanmar-style curry. Known for its friendly, magical atmosphere.",
				address: "3-19-3 Kitazawa, Setagaya-ku, Tokyo, 155-0031, Japan",
				image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
				type: "bar",
				genre: "Music & Dining",
				capacity: 30, // Estimated
				features: [
					"Creative Spice Cuisine",
					"Live Music",
					"Friendly Staff",
					"Historic Vibe",
				],
				openingHours: "18:00-24:00",
				priceRange: "¥1000-2000",
				website: "http://simokitanever.jugem.jp/",
				phone: null,
				googleMapsUrl: "https://maps.app.goo.gl/ghi012", // Placeholder URL
				rating: "4.6",
				reviewCount: 75, // Estimated from Tabelog
				popularTimes: "Busiest on Friday and Saturday nights",
				reviews: [
					"The curry is amazing and the vibe is so welcoming",
					"A Shimokitazawa classic!",
					"Perfect mix of music and food",
				],
				additionalImages: [
					"https://images.unsplash.com/photo-1514933651103-005eec06c04b",
					"https://images.unsplash.com/photo-1514933651103-005eec06c04b",
				],
			},
			{
				name: "Bar Juice",
				description:
					"Likely a misnaming; assumed to be Live Juice, a daytime juice and smoothie bar offering cold-pressed drinks. Not a traditional bar but included for completeness.",
				address: "5-36-17 Daizawa, Setagaya-ku, Tokyo, 155-0032, Japan",
				image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
				type: "bar",
				genre: "Juice & Smoothies",
				capacity: 20, // Estimated
				features: [
					"Cold-Pressed Juices",
					"Healthy Drinks",
					"Daytime Only",
					"Casual Seating",
				],
				openingHours: "09:00-15:00",
				priceRange: "¥500-1000",
				website: "http://livejuice.tokyo/",
				phone: null,
				googleMapsUrl: "https://maps.app.goo.gl/jkl345", // Placeholder URL
				rating: "4.3",
				reviewCount: 40, // Estimated
				popularTimes: "Busiest in the morning",
				reviews: [
					"Fresh and tasty juices!",
					"Great for a healthy stop",
					"Not really a night bar, but lovely daytime spot",
				],
				additionalImages: [
					"https://images.unsplash.com/photo-1514933651103-005eec06c04b",
					"https://images.unsplash.com/photo-1514933651103-005eec06c04b",
				],
			},
			{
				name: "haru no oto",
				description:
					"A family-friendly cafe & bar that welcomes children on Sundays until 8 PM. Known for its cultural activities and relaxed atmosphere near Shimokitazawa Station.",
				address: "2-32-8 Kitazawa, Setagaya-ku, Tokyo, 155-0032, Japan",
				image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
				type: "bar",
				genre: "Cafe & Bar",
				capacity: 25, // Estimated
				features: [
					"Family-Friendly",
					"Cultural Activities",
					"Casual Drinks",
					"Proximity to Station",
				],
				openingHours: "12:00-15:30 (cafe), 17:00-24:00 (bar)",
				priceRange: "¥1000-2000",
				website: "https://www.facebook.com/haru.no.oto.shimokitazawa/",
				phone: null,
				googleMapsUrl: "https://maps.app.goo.gl/mno678", // Placeholder URL
				rating: "4.2",
				reviewCount: 35, // Estimated
				popularTimes: "Busiest on weekend evenings",
				reviews: [
					"Love that it's kid-friendly on Sundays",
					"Great spot for a relaxed drink",
					"Nice cultural vibe",
				],
				additionalImages: [
					"https://images.unsplash.com/photo-1514933651103-005eec06c04b",
					"https://images.unsplash.com/photo-1514933651103-005eec06c04b",
				],
			},
			{
				name: "MEIMEI",
				description:
					"Assumed to be DJ Bar Meimei, opened in December 2023, focusing on house and techno music. A fresh addition to Shimokitazawa's nightlife with a modern music focus.",
				address:
					"Unknown, likely in Shimokitazawa, Setagaya-ku, Tokyo, 155-0031, Japan",
				image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
				type: "bar",
				genre: "House/Techno",
				capacity: 40, // Estimated
				features: [
					"House Music",
					"Techno DJs",
					"Modern Vibe",
					"Late-Night Scene",
				],
				openingHours: "20:00-05:00 (assumed)",
				priceRange: "¥1500-3000",
				website:
					"https://www.facebook.com/p/DJ-Bar-Meimei-Shimokitazawa-61558538071846/",
				phone: null,
				googleMapsUrl: "https://maps.app.goo.gl/pqr901", // Placeholder URL
				rating: "4.5",
				reviewCount: 20, // Estimated due to recent opening
				popularTimes: "Busiest late at night",
				reviews: [
					"Awesome beats and great energy",
					"New spot with a cool crowd",
					"Perfect for techno lovers",
				],
				additionalImages: [
					"https://images.unsplash.com/photo-1514933651103-005eec06c04b",
					"https://images.unsplash.com/photo-1514933651103-005eec06c04b",
				],
			},
			{
				name: "BAR FORCE",
				description:
					"A late-night bar with a rock and roll atmosphere, open until 5 AM. Known for its energetic vibe and affordable drinks, it's a staple for night owls.",
				address: "2-32-7 Kitazawa, Setagaya-ku, Tokyo, 155-0032, Japan",
				image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
				type: "bar",
				genre: "Rock Bar",
				capacity: 30, // Estimated
				features: [
					"Rock Music",
					"Late-Night Hours",
					"Affordable Drinks",
					"Energetic Vibe",
				],
				openingHours: "20:00-05:00 (Closed Mondays)",
				priceRange: "¥800-1500",
				website: "https://love-shimokitazawa.jp/archives/36101",
				phone: null,
				googleMapsUrl: "https://maps.app.goo.gl/stu234", // Placeholder URL
				rating: "4.3",
				reviewCount: 50, // Estimated
				popularTimes: "Busiest after midnight",
				reviews: [
					"Great rock vibe and cheap drinks",
					"Perfect for late-night hangs",
					"Staff are super cool",
				],
				additionalImages: [
					"https://images.unsplash.com/photo-1514933651103-005eec06c04b",
					"https://images.unsplash.com/photo-1514933651103-005eec06c04b",
				],
			},
			{
				name: "COUNTER CLUB",
				description:
					"A music bar with top-notch sound systems, hosting DJ sets and live performances. Popular among audiophiles and nightlife enthusiasts.",
				address: "5-29-15 Daizawa, Setagaya-ku, Tokyo, 155-0032, Japan",
				image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
				type: "bar",
				genre: "Music Bar",
				capacity: 100, // Estimated
				features: [
					"High-Quality Sound",
					"DJ Sets",
					"Live Music",
					"Late-Night Hours",
				],
				openingHours: "18:00-05:00",
				priceRange: "¥1200-2500",
				website: "https://counter-club.com/",
				phone: null,
				googleMapsUrl: "https://maps.app.goo.gl/vwx567", // Placeholder URL
				rating: "4.7",
				reviewCount: 80, // Estimated
				popularTimes: "Busiest on weekend nights",
				reviews: [
					"The sound system is unreal!",
					"Great music and vibe",
					"A must-visit for music lovers",
				],
				additionalImages: [
					"https://images.unsplash.com/photo-1514933651103-005eec06c04b",
					"https://images.unsplash.com/photo-1514933651103-005eec06c04b",
				],
			},
			{
				name: "Music Bar ROCKAHOLIC Shimokitazawa",
				description:
					"A rock bar with live performances and DJ sets, popular among music lovers. Known for its large capacity and vibrant rock scene.",
				address: "2-6-5 Kitazawa, Setagaya-ku, Tokyo, 155-0032, Japan",
				image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
				type: "bar",
				genre: "Rock Bar",
				capacity: 200, // Standing capacity from website
				features: [
					"Live Rock Performances",
					"DJ Sets",
					"Large Venue",
					"Rock Atmosphere",
				],
				openingHours: "18:00-05:00",
				priceRange: "¥2500",
				website: "https://bar-rockaholic.jp/shimokita/",
				phone: null,
				googleMapsUrl: "https://maps.app.goo.gl/yza890", // Placeholder URL
				rating: "4.6",
				reviewCount: 120, // Estimated
				popularTimes: "Busiest on Friday and Saturday nights",
				reviews: [
					"Epic rock nights!",
					"Huge space and great music",
					"A rock lover's paradise",
				],
				additionalImages: [
					"https://images.unsplash.com/photo-1514933651103-005eec06c04b",
					"https://images.unsplash.com/photo-1514933651103-005eec06c04b",
				],
			},
			{
				name: "ハーフムーンＯ・Ｋ",
				description:
					"Assumed to be Half Moon Hall, a multi-purpose event space hosting concerts and art events. Offers a versatile experience beyond a typical bar.",
				address:
					"Unknown, likely in Shimokitazawa, Setagaya-ku, Tokyo, 155-0031, Japan",
				image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
				type: "bar",
				genre: "Multi-Purpose",
				capacity: 150, // From website
				features: [
					"Live Concerts",
					"Art Events",
					"Versatile Space",
					"Event-Driven",
				],
				openingHours: "Varies by event",
				priceRange: "Varies",
				website: "http://www.halfmoonhall.com/",
				phone: null,
				googleMapsUrl: "https://maps.app.goo.gl/bcd123", // Placeholder URL
				rating: "4.4",
				reviewCount: 60, // Estimated
				popularTimes: "Busiest during event nights",
				reviews: [
					"Cool space for concerts",
					"Unique venue with lots going on",
					"Great for artsy nights",
				],
				additionalImages: [
					"https://images.unsplash.com/photo-1514933651103-005eec06c04b",
					"https://images.unsplash.com/photo-1514933651103-005eec06c04b",
				],
			},
			{
				name: "Poor Cow",
				description:
					"A rock bar with an extensive music collection, run by punk rock icon FIFI. A popular hangout for musicians and rock enthusiasts.",
				address: "2-9-24 Kitazawa, Setagaya-ku, Tokyo, 155-0032, Japan",
				image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
				type: "bar",
				genre: "Rock Bar",
				capacity: 30, // Estimated
				features: [
					"Rock Music",
					"Musician Hangout",
					"Extensive Jukebox",
					"Late-Night Vibe",
				],
				openingHours: "18:00-02:00",
				priceRange: "¥800-1500",
				website: "https://www.tokyogigguide.com/en/gigs/venue/676",
				phone: null,
				googleMapsUrl: "https://maps.app.goo.gl/efg456", // Placeholder URL
				rating: "4.5",
				reviewCount: 70, // Estimated
				popularTimes: "Busiest on weekend evenings",
				reviews: [
					"FIFI is a legend, great music!",
					"Perfect spot for rock fans",
					"Cozy and full of character",
				],
				additionalImages: [
					"https://images.unsplash.com/photo-1514933651103-005eec06c04b",
					"https://images.unsplash.com/photo-1514933651103-005eec06c04b",
				],
			},
			{
				name: "Good Time Bar",
				description:
					"Assumed to be Good Heavens!, a British-style bar with live music and comedy nights. Known for its authentic vibe and diverse events.",
				address:
					"Unknown, likely in Shimokitazawa, Setagaya-ku, Tokyo, 155-0031, Japan",
				image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
				type: "bar",
				genre: "British Bar",
				capacity: 25, // Estimated
				features: [
					"Live Music",
					"Comedy Nights",
					"British Atmosphere",
					"Craft Beer",
				],
				openingHours: "17:00-01:00",
				priceRange: "¥900-1800",
				website: "https://www.timeout.com/tokyo/bars-and-pubs/good-heavens",
				phone: null,
				googleMapsUrl: "https://maps.app.goo.gl/hij789", // Placeholder URL
				rating: "4.3",
				reviewCount: 55, // Estimated
				popularTimes: "Busiest on event nights",
				reviews: [
					"Feels like a British pub in Tokyo!",
					"Great comedy and music",
					"Nice beer selection",
				],
				additionalImages: [
					"https://images.unsplash.com/photo-1514933651103-005eec06c04b",
					"https://images.unsplash.com/photo-1514933651103-005eec06c04b",
				],
			},

			// Live Houses
			{
				name: "Shelter Shimokitazawa",
				description:
					"A renowned live house known for hosting quality indie rock acts. A staple in Shimokitazawa's music scene, offering an intimate concert experience.",
				address:
					"Unknown, likely near Shimokitazawa Station, Setagaya-ku, Tokyo, 155-0031, Japan",
				image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
				type: "live_house",
				genre: "Indie Rock",
				capacity: 150, // Estimated
				features: [
					"Indie Rock Shows",
					"Intimate Venue",
					"Live Music",
					"Local Talent",
				],
				openingHours: "Varies by event",
				priceRange: "¥2000-4000",
				website: null,
				phone: null,
				googleMapsUrl: "https://maps.app.goo.gl/klm012", // Placeholder URL
				rating: "4.7",
				reviewCount: 100, // Estimated
				popularTimes: "Busiest on concert nights",
				reviews: [
					"Best spot for indie rock",
					"Small but amazing energy",
					"A Shimokitazawa must-visit",
				],
				additionalImages: [
					"https://images.unsplash.com/photo-1514933651103-005eec06c04b",
					"https://images.unsplash.com/photo-1514933651103-005eec06c04b",
				],
			},
			{
				name: "BASEMENT BAR",
				description:
					"A cozy live house specializing in indie rock performances. Known for its quality events and proximity to Shimokitazawa Station.",
				address:
					"Unknown, likely near Shimokitazawa Station, Setagaya-ku, Tokyo, 155-0031, Japan",
				image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
				type: "live_house",
				genre: "Indie Rock",
				capacity: 100, // Estimated
				features: [
					"Indie Rock Events",
					"Cozy Setting",
					"Live Music",
					"Central Location",
				],
				openingHours: "Varies by event",
				priceRange: "¥2000-3500",
				website: "https://www.tokyogigguide.com/en/gigs/venue/18",
				phone: null,
				googleMapsUrl: "https://maps.app.goo.gl/nop345", // Placeholder URL
				rating: "4.6",
				reviewCount: 80, // Estimated
				popularTimes: "Busiest on weekend event nights",
				reviews: [
					"Awesome indie shows!",
					"Small venue with big vibes",
					"Great sound quality",
				],
				additionalImages: [
					"https://images.unsplash.com/photo-1514933651103-005eec06c04b",
					"https://images.unsplash.com/photo-1514933651103-005eec06c04b",
				],
			},
			{
				name: "Shimokitazawa THREE",
				description:
					"A live house supporting local artists with regular events. Known for its intimate setting and commitment to emerging talent.",
				address:
					"Unknown, likely near Shimokitazawa Station, Setagaya-ku, Tokyo, 155-0031, Japan",
				image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
				type: "live_house",
				genre: "Music Venue",
				capacity: 80, // Estimated
				features: [
					"Local Artists",
					"Intimate Shows",
					"Live Music",
					"Supportive Atmosphere",
				],
				openingHours: "Varies by event",
				priceRange: "¥1500-3000",
				website: null,
				phone: null,
				googleMapsUrl: "https://maps.app.goo.gl/qrs678", // Placeholder URL
				rating: "4.5",
				reviewCount: 60, // Estimated
				popularTimes: "Busiest on weekend nights",
				reviews: [
					"Love the local talent here",
					"Cozy and supportive vibe",
					"Great for discovering new music",
				],
				additionalImages: [
					"https://images.unsplash.com/photo-1514933651103-005eec06c04b",
					"https://images.unsplash.com/photo-1514933651103-005eec06c04b",
				],
			},
			{
				name: "下北沢LOFT",
				description:
					"A well-known live house offering a variety of music performances. A key player in Shimokitazawa's vibrant live music scene.",
				address:
					"Unknown, likely near Shimokitazawa Station, Setagaya-ku, Tokyo, 155-0031, Japan",
				image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
				type: "live_house",
				genre: "Music Venue",
				capacity: 120, // Estimated
				features: [
					"Live Performances",
					"Diverse Music",
					"Vibrant Scene",
					"Central Location",
				],
				openingHours: "Varies by event",
				priceRange: "¥2000-4000",
				website: null,
				phone: null,
				googleMapsUrl: "https://maps.app.goo.gl/tuv901", // Placeholder URL
				rating: "4.6",
				reviewCount: 90, // Estimated
				popularTimes: "Busiest on concert nights",
				reviews: [
					"Always a great show here",
					"Classic Shimokitazawa venue",
					"Perfect for music lovers",
				],
				additionalImages: [
					"https://images.unsplash.com/photo-1514933651103-005eec06c04b",
					"https://images.unsplash.com/photo-1514933651103-005eec06c04b",
				],
			},
		];

		mockVenues.forEach((venue) => {
			const venueWithId: Venue = {
				id: this.currentIds.venue,
				...venue,
				website: venue.website ?? null,
				phone: venue.phone ?? null,
				googleMapsUrl: venue.googleMapsUrl ?? null,
				rating: venue.rating ?? null,
				reviewCount: venue.reviewCount ?? null,
				popularTimes: venue.popularTimes ?? null,
				reviews: venue.reviews ?? null,
				additionalImages: venue.additionalImages ?? null,
			};
			this.venues.set(this.currentIds.venue, venueWithId);
			this.currentIds.venue++;
		});

		const mockEvents: InsertEvent[] = [
			// Existing Events
			{
				title: "Ghetto Groove Night",
				description:
					"A soulful DJ night featuring funky beats and a relaxed vibe in the cozy confines of BAR GHETTO Tsuki.",
				venueId: 1, // BAR GHETTO Tsuki
				date: new Date("2025-06-15T21:00:00"),
				price: 0,
				image: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73",
				performers: ["DJ G"],
			},
			{
				title: "ARENA Shimokitazawa Presents: Groove Night",
				description:
					"An electrifying night of electronic music with top DJs spinning on the rooftop, complete with curry specials.",
				venueId: 2, // ARENA Shimokitazawa
				date: new Date("2025-03-15T21:00:00"),
				price: 2000,
				image: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73",
				performers: ["DJ A", "DJ B", "DJ C"],
			},
			{
				title: "Drunk Tunes Vol.5",
				description:
					"A high-energy rock night featuring local bands, showcasing Shimokitazawa's vibrant music scene.",
				venueId: 10, // Music Bar ROCKAHOLIC Shimokitazawa
				date: new Date("2025-03-22T20:00:00"),
				price: 2500,
				image: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73",
				performers: ["The Rockers", "Electric Groove"],
			},
			{
				title: "Art and Music Fusion Night",
				description:
					"An evening blending live music with art exhibitions, offering a unique cultural experience at Half Moon Hall.",
				venueId: 11, // Half Moon Hall (ハーフムーンＯ・Ｋ)
				date: new Date("2025-07-20T18:00:00"),
				price: 1500,
				image: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73",
				performers: ["Artist A", "Musician B"],
			},
			{
				title: "Punk Rock Night with Local Bands",
				description:
					"A raw and energetic night of punk rock, hosted by punk icon FIFI at Poor Cow.",
				venueId: 12, // Poor Cow
				date: new Date("2025-08-05T20:00:00"),
				price: 1500,
				image: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73",
				performers: ["Punk Band 1", "Punk Band 2"],
			},
			{
				title: "Laugh Out Loud: Comedy Night",
				description:
					"A night of stand-up comedy with local and international comedians, bringing British humor to Shimokitazawa.",
				venueId: 13, // Good Time Bar (Good Heavens!)
				date: new Date("2025-09-12T19:00:00"),
				price: 2000,
				image: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73",
				performers: ["Comedian 1", "Comedian 2", "Comedian 3"],
			},
			{
				title: "Shelter Shimokitazawa Presents: Rising Stars Night",
				description:
					"A showcase of Tokyo's best new indie rock bands, packed into Shelter's intimate venue.",
				venueId: 14, // Shelter Shimokitazawa
				date: new Date("2025-04-10T20:00:00"),
				price: 2500,
				image: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73",
				performers: ["Band X", "Band Y", "Band Z"],
			},
			{
				title: "BASEMENT BAR Presents: Acoustic Sessions",
				description:
					"An intimate evening of acoustic performances by indie artists, highlighting Shimokitazawa's underground scene.",
				venueId: 15, // BASEMENT BAR
				date: new Date("2025-10-25T19:00:00"),
				price: 1800,
				image: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73",
				performers: ["Singer-Songwriter A", "Duo B"],
			},
			{
				title: "Shimokitazawa LOFT: Metal Mania",
				description:
					"A heavy metal night with top bands, delivering a loud and intense experience at LOFT.",
				venueId: 17, // Shimokitazawa LOFT
				date: new Date("2025-11-15T20:00:00"),
				price: 3000,
				image: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73",
				performers: ["Metal Band 1", "Metal Band 2"],
			},

			// New Events
			{
				title: "Thai Beats & Drinks",
				description:
					"A night of Southeast Asian-inspired music and cocktails, blending Thai rhythms with Shimokitazawa's cozy bar scene.",
				venueId: 3, // Grow Bar Joint
				date: new Date("2025-05-18T20:00:00"),
				price: 1000,
				image: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73",
				performers: ["DJ Som", "Thai Groove Collective"],
			},
			{
				title: "Never Never Land: Spice & Song Night",
				description:
					"A unique evening pairing creative spice cuisine with live acoustic performances, celebrating 45 years of history.",
				venueId: 4, // Never Never Land
				date: new Date("2025-06-22T19:00:00"),
				price: 1500,
				image: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73",
				performers: ["Acoustic Duo N", "Spice Singer"],
			},
			{
				title: "MEIMEI Techno Takeover",
				description:
					"A late-night techno extravaganza with cutting-edge DJs, turning MEIMEI into a pulsating dance haven.",
				venueId: 7, // MEIMEI (DJ Bar Meimei)
				date: new Date("2025-07-10T22:00:00"),
				price: 2000,
				image: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73",
				performers: ["DJ Tek", "Neon Pulse"],
			},
			{
				title: "BAR FORCE: Rock 'n' Roll Revival",
				description:
					"A late-night rock 'n' roll bash with live bands, keeping the party going until dawn.",
				venueId: 8, // BAR FORCE
				date: new Date("2025-08-15T21:00:00"),
				price: 1200,
				image: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73",
				performers: ["Rock Revivalists", "Midnight Riffs"],
			},
			{
				title: "COUNTER CLUB: Electronica Odyssey",
				description:
					"An immersive night of electronic music with high-quality sound, featuring local and guest DJs.",
				venueId: 9, // COUNTER CLUB
				date: new Date("2025-09-20T20:00:00"),
				price: 1800,
				image: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73",
				performers: ["DJ Echo", "Synth Voyager"],
			},
			{
				title: "ROCKAHOLIC Presents: Punkapalooza",
				description:
					"A wild punk rock night with multiple bands, bringing chaos and energy to Shimokitazawa.",
				venueId: 10, // Music Bar ROCKAHOLIC Shimokitazawa (additional event)
				date: new Date("2025-10-12T19:00:00"),
				price: 2800,
				image: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73",
				performers: ["Punk Riot", "Chaos Crew", "Screamers"],
			},
			{
				title: "Shelter Shimokitazawa: Punk Throwdown",
				description:
					"A high-octane punk night with local legends, packed into Shelter's gritty space.",
				venueId: 14, // Shelter Shimokitazawa (additional event)
				date: new Date("2025-11-01T20:00:00"),
				price: 2300,
				image: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73",
				performers: ["Tokyo Punks", "Rebel Yell"],
			},
			{
				title: "THREE Presents: Indie Showcase",
				description:
					"A night of emerging indie talent, supporting local artists in an intimate setting.",
				venueId: 16, // Shimokitazawa THREE
				date: new Date("2025-04-25T19:00:00"),
				price: 2000,
				image: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73",
				performers: ["Indie Starlets", "Echo Roots"],
			},
		];

		mockEvents.forEach((event) => {
			this.events.set(this.currentIds.event, {
				id: this.currentIds.event,
				...event,
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
		return Array.from(this.events.values()).filter(
			(event) => event.venueId === venueId
		);
	}

	async createMessage(message: InsertMessage): Promise<Message> {
		const id = this.currentIds.message++;
		const newMessage = {
			id,
			...message,
			createdAt: new Date(),
		};
		this.messages.set(id, newMessage);
		return newMessage;
	}
}

export const storage = new MemStorage();
