export interface IChatSetupOptionResponse {
  ID: number;
  Name: string;
  CreatedAt: string;
}

export interface IChatSetupOptionsItem {
  id: number;
  name: string;
  createdAt: string;
}

export interface IChatSetupSubmoduleItem {
  id: number;
  name: string;
}

export interface IChatSetupModuleItem extends IChatSetupOptionsItem {
  submodules: IChatSetupSubmoduleItem[];
}
