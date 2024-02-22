export interface ICreateSubject {
  idUser: number;
  idSubModule: number;
  nameSubject: string;
}

export interface ICreateSubjectResponse {
  id: number;
  success: string;
}

export interface ISubjectResponse {
  ID: number;
  Name: string;
}

export interface ISubjectItem {
  id: number;
  name: string;
}

export interface ISendMessageItem {
  role: string;
  content: string;
}

export interface ISendMessage {
  idIDE: number;
  idUser: number;
  idModule: number;
  idSubject: number;
  idLanguage: number;
  idSubModule: number;
  idFramework: number;
  message: ISendMessageItem[];
}

export interface ISendMessageResponse {
  content: string;
}

export interface ISubjectMessagesTree {
  [key: number]: any[];
}
