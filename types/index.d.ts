export interface PainDetail {
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
    schemas: {
      schemaImage: {
        asset: {
          _ref: string;
          caption: string;
          alternativeText: string;
        };
      };
      hotspot: {
        x: number;
        y: number;
      };
      caption: string;
      alternativeText: string;
    };
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
export type PainDetails = PainDetail[];

export interface Schema {
  schemaImage: {
    asset: {
      _key: string;
      _ref: string;
    };
    alternativeText: string;
    caption: string;
  };
}
export type Schemas = Schema[];

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
  def: string;
  relatedPain: { _ref: string }[];
}
export type GlossaryDetails = GlossaryDetail[];

export interface MediaDetail {
  _id: string;
  title: string;
  author: string;
  editor: string;
  year: string;
  edition: number;
  isFootnote: boolean;
  relatedPain?: { _type: "reference"; _ref: string }[]; // Make relatedPain optional
  filter: { title: string; value: string };
  url?: string;
}
export type MediaDetails = MediaDetail[];

export interface ExerciseDetail {
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
}
export type DirectoryDetails = DirectoryDetail[];
``;
