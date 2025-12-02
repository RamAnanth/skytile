export interface City {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export const predefinedCities: City[] = [
  // North America
  { name: "New York", country: "United States", lat: 40.7128, lon: -74.0060 },
  { name: "Los Angeles", country: "United States", lat: 34.0522, lon: -118.2437 },
  { name: "Chicago", country: "United States", lat: 41.8781, lon: -87.6298 },
  { name: "San Francisco", country: "United States", lat: 37.7749, lon: -122.4194 },
  { name: "Miami", country: "United States", lat: 25.7617, lon: -80.1918 },
  { name: "Toronto", country: "Canada", lat: 43.6532, lon: -79.3832 },
  { name: "Vancouver", country: "Canada", lat: 49.2827, lon: -123.1207 },
  { name: "Montreal", country: "Canada", lat: 45.5017, lon: -73.5673 },
  { name: "Mexico City", country: "Mexico", lat: 19.4326, lon: -99.1332 },
  
  // Europe
  { name: "London", country: "United Kingdom", lat: 51.5074, lon: -0.1278 },
  { name: "Paris", country: "France", lat: 48.8566, lon: 2.3522 },
  { name: "Berlin", country: "Germany", lat: 52.5200, lon: 13.4050 },
  { name: "Rome", country: "Italy", lat: 41.9028, lon: 12.4964 },
  { name: "Madrid", country: "Spain", lat: 40.4168, lon: -3.7038 },
  { name: "Barcelona", country: "Spain", lat: 41.3851, lon: 2.1734 },
  { name: "Amsterdam", country: "Netherlands", lat: 52.3676, lon: 4.9041 },
  { name: "Vienna", country: "Austria", lat: 48.2082, lon: 16.3738 },
  { name: "Prague", country: "Czechia", lat: 50.0755, lon: 14.4378 },
  { name: "Stockholm", country: "Sweden", lat: 59.3293, lon: 18.0686 },
  { name: "Copenhagen", country: "Denmark", lat: 55.6761, lon: 12.5683 },
  { name: "Dublin", country: "Ireland", lat: 53.3498, lon: -6.2603 },
  { name: "Athens", country: "Greece", lat: 37.9838, lon: 23.7275 },
  { name: "Istanbul", country: "Turkey", lat: 41.0082, lon: 28.9784 },
  { name: "Zurich", country: "Switzerland", lat: 47.3769, lon: 8.5417 },
  { name: "Lisbon", country: "Portugal", lat: 38.7223, lon: -9.1393 },
  { name: "Warsaw", country: "Poland", lat: 52.2297, lon: 21.0122 },
  { name: "Budapest", country: "Hungary", lat: 47.4979, lon: 19.0402 },
  
  // Asia
  { name: "Tokyo", country: "Japan", lat: 35.6762, lon: 139.6503 },
  { name: "Seoul", country: "South Korea", lat: 37.5665, lon: 126.9780 },
  { name: "Shanghai", country: "China", lat: 31.2304, lon: 121.4737 },
  { name: "Beijing", country: "China", lat: 39.9042, lon: 116.4074 },
  { name: "Hong Kong", country: "Hong Kong", lat: 22.3193, lon: 114.1694 },
  { name: "Singapore", country: "Singapore", lat: 1.3521, lon: 103.8198 },
  { name: "Bangkok", country: "Thailand", lat: 13.7563, lon: 100.5018 },
  { name: "Mumbai", country: "India", lat: 19.0760, lon: 72.8777 },
  { name: "Delhi", country: "India", lat: 28.6139, lon: 77.2090 },
  { name: "Kolkata", country: "India", lat: 22.5726, lon: 88.3639 },
  { name: "Chennai", country: "India", lat: 13.0827, lon: 80.2707 },
  { name: "Bengaluru", country: "India", lat: 12.9716, lon: 77.5946 },
  { name: "Hyderabad", country: "India", lat: 17.3850, lon: 78.4867 },
  { name: "Dubai", country: "United Arab Emirates", lat: 25.2048, lon: 55.2708 },
  { name: "Jakarta", country: "Indonesia", lat: -6.2088, lon: 106.8456 },
  { name: "Manila", country: "Philippines", lat: 14.5995, lon: 120.9842 },
  { name: "Taipei", country: "Taiwan", lat: 25.0330, lon: 121.5654 },
  
  // Oceania
  { name: "Sydney", country: "Australia", lat: -33.8688, lon: 151.2093 },
  { name: "Melbourne", country: "Australia", lat: -37.8136, lon: 144.9631 },
  { name: "Auckland", country: "New Zealand", lat: -36.8485, lon: 174.7633 },
  { name: "Perth", country: "Australia", lat: -31.9505, lon: 115.8605 },
  
  // South America
  { name: "São Paulo", country: "Brazil", lat: -23.5505, lon: -46.6333 },
  { name: "Rio de Janeiro", country: "Brazil", lat: -22.9068, lon: -43.1729 },
  { name: "Buenos Aires", country: "Argentina", lat: -34.6037, lon: -58.3816 },
  { name: "Lima", country: "Peru", lat: -12.0464, lon: -77.0428 },
  { name: "Santiago", country: "Chile", lat: -33.4489, lon: -70.6693 },
  
  // Africa
  { name: "Cape Town", country: "South Africa", lat: -33.9249, lon: 18.4241 },
  { name: "Johannesburg", country: "South Africa", lat: -26.2041, lon: 28.0473 },
  { name: "Cairo", country: "Egypt", lat: 30.0444, lon: 31.2357 },
  { name: "Lagos", country: "Nigeria", lat: 6.5244, lon: 3.3792 },
  { name: "Nairobi", country: "Kenya", lat: -1.2921, lon: 36.8219 },
  { name: "Casablanca", country: "Morocco", lat: 33.5731, lon: -7.5898 },
  { name: "Accra", country: "Ghana", lat: 5.6037, lon: -0.1870 },
  { name: "Addis Ababa", country: "Ethiopia", lat: 9.1450, lon: 38.7667 },
];

