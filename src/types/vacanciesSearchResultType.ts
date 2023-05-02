type MetroStation = {
  id: number;
  title: string;
  id_metro_line: number;
};

type TypeOfWork = {
  id: number;
  title: string;
};

type PlaceOfWork = {
  id: number;
  title: string;
};

type Education = {
  id: number;
  title: string;
};

type Experience = {
  id: number;
  title: string;
};

type MaritalStatus = {
  id: number;
  title: string;
};

type Children = {
  id: number;
  title: string;
};

type CataloguePosition = {
  id: number;
  title: string;
};

type Catalogue = {
  id: number;
  title: string;
  positions: CataloguePosition[];
};

type Gender = {
  id: number;
  title: string;
};

type Town = {
  id: number;
  title: string;
  declension: string;
  genitive: string;
};

type Agency = {
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
