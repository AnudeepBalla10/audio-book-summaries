export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  description: string;
  duration: string;
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  title: string;
  duration: string;
  audioUrl: string;
}