/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as os from '@/os.js';
import { i18n } from '@/i18n.js';

/**
 * Clipboardに値をコピー(TODO: 文字列以外も対応)
 */
export async function copyToClipboard(input: string | null, type?: string) {
	if (!input) return;

	try {
		if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
			await navigator.clipboard.writeText(input);
		} else {
			// navigator.clipboardが使えない環境(非セキュアコンテキスト等)向けのフォールバック
			const textarea = window.document.createElement('textarea');
			textarea.value = input;
			textarea.style.position = 'fixed';
			textarea.style.left = '-999999px';
			textarea.style.top = '-999999px';
			window.document.body.appendChild(textarea);
			textarea.focus();
			textarea.select();
			window.document.execCommand('copy');
			window.document.body.removeChild(textarea);
		}

		os.toast(type === 'link' ? i18n.ts.copiedLink : type === 'content' ? i18n.ts.copiedContent : i18n.ts.copiedToClipboard, 'copied');
	} catch (e) {
		console.error('Failed to copy text:', e);
		throw e;
	}
}
