export interface ImageRequest {
  name:          string;
  url:            string;
}

export interface ImageResponse extends ImageRequest {
  id:               string;
}

export const ImageEmpty: ImageResponse = {
  id:   '',
  name: '',
  url:  '',
};
