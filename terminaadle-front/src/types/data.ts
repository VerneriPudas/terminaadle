export interface ServerAnswer {
  edition: number;
  page: number;
  year: number;
  image_url: string;
}

export interface ServerData {
  image_base64: string;
  answer_data: ServerAnswer;
}
