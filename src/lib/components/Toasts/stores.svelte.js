/**
 * @type {Array<{message: string, type: string}>} Toast Queue
 */

export const toastQueue = $state([]);

/**
 *
 * @param {string} message
 * @param {'success' | 'error' | 'warning' | 'info'} type
 * @param {number} resetTime Time in milliseconds to remove the toast
 */
export function displayToast(message, type, resetTime = 3000) {
	toastQueue.push({ message, type });

	setTimeout(() => {
		toastQueue.shift();
	}, resetTime);
}