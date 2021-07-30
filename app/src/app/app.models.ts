export const API = 'http://localhost:3000';

export interface Media {
  src: string | ArrayBuffer | null;
  isVideo: boolean;
}

export interface Result {
  path: string;
  result: string;
}
