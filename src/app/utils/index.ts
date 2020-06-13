export function getFileTagList(tagString: string) {
  return tagString.replace(new RegExp(' ', 'g'), '').split(',').filter((el) => el !== '');
}
