/*
 * SPDX-FileCopyrightText: syuilo and misskey-project & noridev and cherrypick-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { store } from '@/store.js';

export function convertSearchSyntax(text: string | null): string | null {
	if (!text || !store.s.useSearchConversionSyntax) {
		return text;
	}

	const searchKeywords = [
		'検索',
		'Search',
		'search',
		'검색',
	];

	const searchPattern = new RegExp(`^(.*?)\\s+(${searchKeywords.join('|')})$`);

	const lines = text.split('\n');
	const convertedLines = lines.map(line => {
		if (searchPattern.test(line)) {
			return line.replace(searchPattern, '$1 [検索]');
		}
		return line;
	});

	return convertedLines.join('\n');
}
