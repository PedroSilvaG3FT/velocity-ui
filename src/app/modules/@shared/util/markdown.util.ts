export class MarkdownUtil {
  public static arrayToMarkdown(data: string[]): string {
    while (data.length > 0 && data[data.length - 1].trim() === '') {
      data.pop();
    }

    if (data.length === 0) return '';
    else return data.slice(1).join('\n');
  }
}
