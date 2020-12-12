import dictionnary from './canto.json'

export interface Question {
  eng:  string,
  yale: string
}

export interface Chapter {
  id:         number,
  name:       string,
  questions:  Question[]
}

export interface Dictionary {
  chapters: Chapter[]
}

export const canto : Dictionary = dictionnary;

export const chapters = canto.chapters;

export const chapterNames = canto.chapters.map(c => c.name);
