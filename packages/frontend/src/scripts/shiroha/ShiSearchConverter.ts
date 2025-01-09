import { defaultStore } from '@/store';

defaultStore.reactiveState.useSearchConversionSyntax = {
  where: 'device',
  default: false,
};

export function convertSearchSyntax(text: string | null): string | null {

  const isEnabled = defaultStore.state.useSearchConversionSyntax;

  if (!text || !isEnabled) {
    return text;
  }

  const searchKeywords = [
    '検索',
    'Search',
    'search',
    '검색'
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
