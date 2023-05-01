export type MetroStation = {
  id: number;
  title: string;
  id_metro_line: number;
};

export type TypeOfWork = {
  id: number;
  title: string;
};

export type PlaceOfWork = {
  id: number;
  title: string;
};

export type Education = {
  id: number;
  title: string;
};

export type Experience = {
  id: number;
  title: string;
};

export type MaritalStatus = {
  id: number;
  title: string;
};

export type Children = {
  id: number;
  title: string;
};

export type CataloguePosition = {
  id: number;
  title: string;
};

export type Catalogue = {
  id: number;
  title: string;
  positions: CataloguePosition[];
};

export type Gender = {
  id: number;
  title: string;
};

export type Town = {
  id: number;
  title: string;
  declension: string;
  genitive: string;
};

export type Agency = {
  id: number;
  title: string;
};

export type VacancyObject = {
  id: number;
  id_client: number;
  payment_from: number;
  payment_to: number;
  date_pub_to: number;
  date_archived: number;
  date_published: number;
  address: null | string;
  payment: null | string;
  profession: string;
  work: string;
  metro: MetroStation[];
  currency: string;
  moveable: boolean;
  agreement: boolean;
  anonymous: boolean;
  type_of_work: TypeOfWork;
  place_of_work: PlaceOfWork;
  education: Education;
  experience: Experience;
  maritalstatus: MaritalStatus;
  children: Children;
  already_sent_on_vacancy: boolean;
  languages: any[];
  driving_licence: any[];
  catalogues: Catalogue[];
  agency: Agency;
  town: Town;
  client_logo: string;
  age_from: number;
  age_to: number;
  gender: Gender;
  firm_name: string;
  firm_activity: string;
  link: string;
};

export type VacanciesSearchResultType = {
  objects: VacancyObject[];
  total: number;
  corrected_keyword?: string;
  more: boolean;
};
