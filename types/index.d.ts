interface HomeDetail {
  _id: string;
  seo: {
    pageTitle: string;
    metadescription: string;
  };
  tagline: string;
  content: any;
  intro: any;
  navigation: any;
  dotsZone: DotsZoneProps;
}

interface LogosDetail {
  partners: {
    name: string;
    logo: any;
  }[];
}
// types.ts
interface MenuDetail {
  footerMenu?: MenuDetail[];
  headerMenu?: MenuDetail[];
  _id: string;
  _type: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
  content: any;
  link: string;
  isAction?: boolean;
  type?: ["Pages" | "Douleurs" | "Ressources"];
  pages: any;
}

interface DotsZoneProps {
  text: string;
  callToAction?: {
    label: string;
    link?: {
      slug: {
        current: string;
      };
    };
  };
}

interface InfoPageDetail {
  _id: string;
  _ref: string;
  title: string;
  subtitle: string;
  image: any;
  sections: InfoPageSection[];
}
export type InfoPageDetail = InfoPageDetail[];

interface InfoPageSection {
  sectionTitle: string;
  sectionContent: any;
}
export type InfoPageSection = InfoPageSection[];

interface PainDetail {
  filter(arg0: (pain: PainDetail) => boolean): unknown;

  _id: string;
  _ref: string;
  name: string;
  slug: {
    current: string;
  };
  filters: string[];
  mainImage: {
    asset: {
      _ref: string;
    };

    hotspot: {
      x: number;
      y: number;
    };
  };
  medicalApproach: {
    def?: string;
    diagrams?: Diagram[];
    diag: string;
    sympt: string;
    why: string;
    auto: string;
    pros: string;
  };
  sexologicApproach: {
    body: string;
    norms: string;
    everydayLife: string;
    libido: string;
    charge: string;
    consent: string;
    mental: string;
    parenthood: string;
    checkup: string;
    treatments: string;
    pleasure: string;
  };
}

export interface Diagram {
  index: number;
  diagram: {
    asset: {
      _key: string;
      _ref: string;
    };
    caption: string;
    alternativeText: string;
  };
}
export type Diagrams = Diagram[];

export interface PainDashboardProps {
  pain: {
    name: string;
    slug: {
      current: string;
    };
  };
  isMed: boolean;
  setIsMed: React.Dispatch<React.SetStateAction<boolean>>;
  setIsInitialRender: React.Dispatch<React.SetStateAction<boolean>>;
}
export type PainDashboardProps = PainDashboardProp[];

export interface PainNavProps {
  pain: {
    name: string;
    slug: {
      current: string;
    };
  };
}
export type PainNavProps = PainNavProp[];

export interface GlossaryDetail {
  _id: string;
  _ref: string;
  term: string;
  slug: {
    current: string;
  };
  def: string;
  relatedPain: { _ref: string; term: string }[];
}
export type GlossaryDetails = GlossaryDetail[];

export interface MediaDetail {
  _id: string;
  title: string;
  author?: string;
  editor?: string;
  year?: string;
  edition?: number;
  isFootnote?: boolean;
  relatedPain?: { _type: "reference"; _ref: string }[]; // Make relatedPain optional
  filter: string;
  url?: string;
  tags: { name: string }[];
  isValidated: boolean;
}
export type MediaDetails = MediaDetail[];

export interface ExerciseDetail {
  length: string;
  _id: string;
  title: string;
  exerciseIntro: string;
  video: string;
  relatedPain?: {
    _type: "reference";
    _ref: string;
  }[];
  steps: {
    _key: string;
    title: string;
    stepDescription: string;
  }[];
}
export type ExerciseDetails = ExerciseDetail[];
``;
export interface DirectoryDetail {
  _id: string;
  category: string;
  name: string;
  firstName: string;
  subtitle: string;
  itemType: string;
  tagline: string;
  profession: {
    name: string;
  };
  email: string;
  url: string;
  relatedPain?: {
    _type: "reference";
    _ref: string;
    _id: string;
  }[];
  addresses: {
    _key: string;
    address: string;
    phoneIndicator: number;
    phone: string;
    accessibility: {
      name: string;
    }[];
  }[];
  isValidated: boolean;
  pricing: {
    pricingMin: number;
    pricingMax: number;
    isReimbursed: boolean;
    isReimbursedComp: boolean;
  };
  recommendations: {
    name: string;
  }[];
}
export type DirectoryDetails = DirectoryDetail[];
``;

export interface EventDetail {
  title: string;
  shortDef: string;
}
export type EventDetails = EventDetail[];

export interface typeformDetail {}
[];

interface AgendaDetail {
  title: string;
  eventDuration: "oneDay" | "manyDays";
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  eventStartDate: string;
  eventEndDate: string;
  shortDef: any;
  relatedPain: { name: string }[];
  region: string;
  eventLocation: "online" | "onSite";
}
