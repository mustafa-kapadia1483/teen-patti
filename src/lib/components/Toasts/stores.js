import { writable } from 'svelte/store';

export const toastQueue = writable([]);

export const displayToast = (message, type, resetTime = 3000) => {
	toastQueue.update((queue) => {
		queue.push({ message, type });
		return queue;
	});

	setTimeout(
		() =>
			toastQueue.update((queue) => {
				queue.shift();
				return queue;
			}),
		resetTime
	);
};
