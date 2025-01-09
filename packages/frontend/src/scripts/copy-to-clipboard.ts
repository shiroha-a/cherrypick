/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

/**
 * Clipboardに値をコピー(TODO: 文字列以外も対応)
 */
export async function copyToClipboard(input: string | null) {
	if (!input) return;

	try {

			if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
					await navigator.clipboard.writeText(input);
					return;
			}

			const textarea = document.createElement('textarea');
			textarea.value = input;
			textarea.style.position = 'fixed';
			textarea.style.left = '-999999px';
			textarea.style.top = '-999999px';
			document.body.appendChild(textarea);
			textarea.focus();
			textarea.select();

			document.execCommand('copy');
			document.body.removeChild(textarea);
	} catch (e) {
			console.error('Failed to copy text:', e);

			throw e;
	}
}
