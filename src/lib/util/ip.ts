import { browser } from "$app/environment";
import { getCurrentPosition, isGeolocationSupported } from "./geolocation.js";

export interface IpInfo {
	ip: string;
	network: string;
	version: string;
	city: string;
	region: string;
	region_code: string;
	country: string;
	country_name: string;
	country_code: string;
	country_code_iso3: string;
	country_capital: string;
	country_tld: string;
	continent_code: string;
	in_eu: boolean;
	postal: string;
	latitude: number;
	longitude: number;
	timezone: string;
	utc_offset: string;
	country_calling_code: string;
	currency: string;
	currency_name: string;
	languages: string;
	country_area: number;
	country_population: number;
	asn: string;
	org: string;
	// Enhanced with browser geolocation if available
	useBrowserGeolocation?: boolean;
	browserAccuracy?: number;
}

/**
 * Get user location information
 * @param useBrowserGeolocation - If true, try to use browser Geolocation API for more accurate position
 * @returns Promise with location information
 */
export const ip = async (
	useBrowserGeolocation = false,
): Promise<IpInfo> => {
	try {
		if (browser) {
			const item = localStorage.getItem("ipinfo");
			if (item) {
				const cached = JSON.parse(item);
				// If browser geolocation is requested and supported, try to enhance with accurate position
				if (useBrowserGeolocation && isGeolocationSupported()) {
					try {
						const position = await getCurrentPosition({
							enableHighAccuracy: true,
							timeout: 5000,
							maximumAge: 0,
						});
						cached.latitude = position.latitude;
						cached.longitude = position.longitude;
						cached.useBrowserGeolocation = true;
						cached.browserAccuracy = position.accuracy;
					} catch {
						// Fall back to IP-based location if geolocation fails
					}
				}
				return cached;
			}
		}

		const res = await fetch("https://ipapi.co/json/").then((r) => r.json());
		
		// Enhance with browser geolocation if requested and available
		if (browser && useBrowserGeolocation && isGeolocationSupported()) {
			try {
				const position = await getCurrentPosition({
					enableHighAccuracy: true,
					timeout: 5000,
					maximumAge: 0,
				});
				res.latitude = position.latitude;
				res.longitude = position.longitude;
				res.useBrowserGeolocation = true;
				res.browserAccuracy = position.accuracy;
			} catch {
				// Fall back to IP-based location if geolocation fails
			}
		}

		if (browser) {
			localStorage.setItem("ipinfo", JSON.stringify(res));
		}

		return res;
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (_) {
		return {
			ip: "127.0.0.1",
			asn: "AS0",
			city: "Localhost",
			continent_code: "NA",
			country: "US",
			country_calling_code: "+1",
			country_capital: "Washington",
			country_code: "US",
			country_code_iso3: "USA",
			country_name: "United States",
			country_population: 0,
			currency: "USD",
			currency_name: "Dollar",
			languages: "en-US,es-US,haw,fr",
			latitude: 0,
			longitude: 0,
			network: "Unknown",
			postal: "00000",
			region: "Local",
			region_code: "LOC",
			country_area: 0,
			timezone: "America/New_York",
			utc_offset: "-0500",
			version: "IPv4",
			in_eu: false,
			org: "Localhost",
			country_tld: ".us",
		};
	}
};
