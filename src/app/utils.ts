import { environment } from '../environments/environment'
import * as cryptoJS from 'crypto-js'
import { FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms'
import * as base58 from 'bs58'

export function getURL(path: string): string {
	return environment.backend.root + path
}

/**
 * Computes sha-256 hash from hex encoded data.
 *
 * @param data Hex encoded data
 */
export function sha256(data: string) {
	const hex = cryptoJS.enc.Hex.parse(data);
	const sha = cryptoJS.SHA256(hex).toString();
	return sha;
}

/**
 * Computes ripemd-160 hash from hex encoded data.
 *
 * @param data Hex encoded data
 */
export function ripemd160(data: string) {
	const hex = cryptoJS.enc.Hex.parse(data);
	const ripemd = cryptoJS.RIPEMD160(hex).toString();
	return ripemd;
}

/**
 * Computes ripemd-160 hash of sha-256 hash from hex encoded data.
 *
 * @param data Hex encoded data
 */
export function hash160(SignatureScript: string): string {
	return ripemd160(sha256(SignatureScript));
}



/**
 * Turn hex string into array buffer
 * @param str hex string
 */
function hexString2Ab(str: string): number[] {
	const result = [];

	while (str.length >= 2) {
		result.push(parseInt(str.substring(0, 2), 16));
		str = str.substring(2, str.length);
	}

	return result;
}

/**
 * Turn array buffer into hex string
 * @param arr Array like value
 */
export function ab2HexString(buffer: ArrayBuffer | ArrayBufferLike | ArrayLike<number>): string {
	const uint8Arr: Uint8Array = new Uint8Array(buffer)
	return Array.from(uint8Arr, (byte) => {
		return ('0' + (byte & 0xff).toString(16)).slice(-2)
	}).join('')
}

const ADDR_VERSION = '17';

/**
 *
 * @param programhash
 */
export function hexToBase58(hexEncoded: string): string {
	const data = ADDR_VERSION + hexEncoded;

	const hash = sha256(data);
	const hash2 = sha256(hash);
	const checksum = hash2.slice(0, 8);

	const datas = data + checksum;

	return base58.encode(hexString2Ab(datas));
}

export function base58ToHex(base58Encoded: string) {
	const decoded = base58.decode(base58Encoded);
	const hexEncoded = ab2HexString(decoded).substr(2, 40);
	if (base58Encoded !== hexToBase58(hexEncoded)) {
		throw new Error('[base58ToHex] decode encoded verify failed');
	}
	return hexEncoded;
}


export function reverseHex(hex: string) {
	if (hex.length % 2 !== 0) {
		throw new Error(`Incorrect Length: ${hex}`);
	}
	let out = '';
	for (let i = hex.length - 2; i >= 0; i -= 2) {
		out += hex.substr(i, 2);
	}
	return out;
}
