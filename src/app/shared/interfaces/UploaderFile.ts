export interface UploaderFile {
  name: string;
  tags: [string];
  size: number;
  jwtToken?: string;
}
