import { browser } from "$app/environment";

export interface GeolocationPosition {
	latitude: number;
	longitude: number;
	accuracy?: number;
	altitude?: number | null;
	altitudeAccuracy?: number | null;
	heading?: number | null;
	speed?: number | null;
	timestamp: number;
}

export interface GeolocationError {
	code: number;
	message: string;
}

/**
 * Get user's current position using browser Geolocation API
 * @param options - Geolocation options (enableHighAccuracy, timeout, maximumAge)
 * @returns Promise with position data
 */
export const getCurrentPosition = (
	options?: PositionOptions,
): Promise<GeolocationPosition> => {
	return new Promise((resolve, reject) => {
		if (!browser) {
			reject({
				code: 0,
				message: "Geolocation is not available in server-side environment",
			});
			return;
		}

		if (!navigator.geolocation) {
			reject({
				code: 0,
				message: "Geolocation is not supported by this browser",
			});
			return;
		}

		const defaultOptions: PositionOptions = {
			enableHighAccuracy: false,
			timeout: 10000,
			maximumAge: 60000, // Cache for 1 minute
			...options,
		};

		navigator.geolocation.getCurrentPosition(
			(position) => {
				resolve({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					accuracy: position.coords.accuracy,
					altitude: position.coords.altitude,
					altitudeAccuracy: position.coords.altitudeAccuracy,
					heading: position.coords.heading,
					speed: position.coords.speed,
					timestamp: position.timestamp,
				});
			},
			(error) => {
				reject({
					code: error.code,
					message: error.message,
				});
			},
			defaultOptions,
		);
	});
};

/**
 * Watch user's position changes
 * @param callback - Callback function for position updates
 * @param options - Geolocation options
 * @returns Watch ID that can be used to stop watching
 */
export const watchPosition = (
	callback: (position: GeolocationPosition) => void,
	options?: PositionOptions,
): number | null => {
	if (!browser || !navigator.geolocation) {
		return null;
	}

	const defaultOptions: PositionOptions = {
		enableHighAccuracy: false,
		timeout: 10000,
		maximumAge: 60000,
		...options,
	};

	return navigator.geolocation.watchPosition(
		(position) => {
			callback({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
				accuracy: position.coords.accuracy,
				altitude: position.coords.altitude,
				altitudeAccuracy: position.coords.altitudeAccuracy,
				heading: position.coords.heading,
				speed: position.coords.speed,
				timestamp: position.timestamp,
			});
		},
		(error) => {
			console.error("Geolocation error:", error);
		},
		defaultOptions,
	);
};

/**
 * Stop watching position
 * @param watchId - Watch ID returned by watchPosition
 */
export const clearWatch = (watchId: number): void => {
	if (browser && navigator.geolocation) {
		navigator.geolocation.clearWatch(watchId);
	}
};

/**
 * Check if geolocation is supported and available
 */
export const isGeolocationSupported = (): boolean => {
	return browser && "geolocation" in navigator;
};

/**
 * Check if geolocation permission is granted
 */
export const checkGeolocationPermission = async (): Promise<PermissionState> => {
	if (!browser || !("permissions" in navigator)) {
		return "prompt";
	}

	try {
		const result = await navigator.permissions.query({ name: "geolocation" });
		return result.state;
	} catch {
		return "prompt";
	}
};

