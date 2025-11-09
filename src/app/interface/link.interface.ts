export interface LinkRequest{
  name: string;
  url:  string;
}

export interface LinkResponse extends LinkRequest{
  id:   string;
}
