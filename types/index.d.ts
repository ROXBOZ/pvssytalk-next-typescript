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

interface HomeDetail {
  tagline: string;
  marquee: string;
  intro: {
    pitch: string;
    text: any;
  };
  about: {
    title: string;
    text: any;
    image: any;
  };
}
///

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
  itemType: string;
  tagline: string;
  profession: string;
  email: string;
  url: string;
  relatedPain?: {
    _type: "reference";
    _ref: string;
  }[];
  addresses: {
    _key: string;
    address: string;
    phone: string;
  }[];
  isValidated: boolean;
}
export type DirectoryDetails = DirectoryDetail[];
``;

export interface EventDetail {
  title: string;
  shortDef: string;
}
export type EventDetails = EventDetail[];
