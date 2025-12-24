import { PUB_DISABLE_ALL_EXTERNAL_REQUESTS } from "$env/static/public";
import { env as dynamicEnv } from "$env/dynamic/public";
import { log } from "$lib/util/logger";

// Use dynamic env to handle cases where PUB_ENV might not be defined (e.g., in Vercel)
// Fallback to "production" if not set
const PUB_ENV = dynamicEnv.PUB_ENV ?? "production";

export const GITHUB_URL_VERT = "https://github.com/VERT-sh/VERT";
export const GITHUB_URL_VERTD = "https://github.com/VERT-sh/vertd";
export const GITHUB_API_URL = "https://api.github.com/repos/VERT-sh/VERT";
export const DISCORD_URL = "https://discord.gg/kqevGxYPak";
export const VERT_NAME =
	PUB_ENV === "development"
		? "ConvertOnline Local"
		: PUB_ENV === "nightly"
			? "ConvertOnline Nightly"
			: "ConvertOnline";
export const CONTACT_EMAIL = "xiongfh2000@outlook.com";

// i'm not entirely sure this should be in consts.ts, but it is technically a constant as .env is static for ConvertOnline
export const DISABLE_ALL_EXTERNAL_REQUESTS =
	PUB_DISABLE_ALL_EXTERNAL_REQUESTS === "true";

export const GB = 1024 * 1024 * 1024;

/**
 * Binary search for a max value without knowing the exact value, only that it
 * can be under or over It dose not test every number but instead looks for
 * 1,2,4,8,16,32,64,128,96,95 to figure out that you thought about #96 from
 * 0-infinity
 *
 * @example findFirstPositive(x => matchMedia(`(max-resolution: ${x}dpi)`).matches)
 * @author Jimmy Wärting
 * @see {@link https://stackoverflow.com/a/72124984/1008999}
 * @param {function} f The function to run the test on (should return truthy or falsy values)
 * @param {bigint} [b=1] Where to start looking from
 * @param {function} d privately used to calculate the next value to test
 * @returns {bigint} Integer
 */
function findFirstPositive(
	f: (x: bigint) => number,
	b = 1n,
	d = (e: bigint, g: bigint, c?: bigint): bigint =>
		g < e
			? -1n
			: 0 < f((c = (e + g) >> 1n))
				? c == e || 0 >= f(c - 1n)
					? c
					: d(e, c - 1n)
				: d(c + 1n, g),
): bigint {
	for (; 0 >= f(b); b <<= 1n);
	return d(b >> 1n, b) - 1n;
}

export const getMaxArrayBufferSize = (): number => {
	if (typeof window === "undefined") return 2 * GB; // default for SSR

	// check cache first
	const cached = localStorage.getItem("maxArrayBufferSize");
	if (cached) {
		const parsed = Number(cached);
		log(["converters"], `using cached max ArrayBuffer size: ${parsed} bytes`);
		if (!isNaN(parsed) && parsed > 0) return parsed;
	}

	// detect max size using binary search
	const maxSize = findFirstPositive((x) => {
		try {
			new ArrayBuffer(Number(x));
			return 0; // false = can allocate
		} catch {
			return 1; // true = cannot allocate
		}
	});

	const result = Number(maxSize);
	localStorage.setItem("maxArrayBufferSize", result.toString());
	log(["converters"], `detected max ArrayBuffer size: ${result} bytes`);

	return result;
};

// Use a getter function to avoid SSR issues with localStorage
let _maxArrayBufferSize: number | null = null;
export const getMAX_ARRAY_BUFFER_SIZE = (): number => {
	if (_maxArrayBufferSize === null) {
		_maxArrayBufferSize = getMaxArrayBufferSize();
	}
	return _maxArrayBufferSize;
};

// For backward compatibility, export a lazy-initialized constant
export const MAX_ARRAY_BUFFER_SIZE = getMAX_ARRAY_BUFFER_SIZE();
