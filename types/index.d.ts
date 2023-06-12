export interface PainDetail {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
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
    schemas: Record<string, Schema>;
    // schemas: {
    //   schemaImage: {
    //     asset: {
    //       _ref: string;
    //       caption: string;
    //       alternativeText: string;
    //     };
    //   };
    //   hotspot: {
    //     x: number;
    //     y: number;
    //   };
    //   caption: string;
    //   alternativeText: string;
    // };
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
      _ref: string;
    };
    alternativeText: string;
    caption: string;
  };
}

export type Schemas = Schema[];

export interface PainNavProps {
  pain: {
    name: string;
  };
  isMed: boolean;
  setIsMed: React.Dispatch<React.SetStateAction<boolean>>;
}

export type PainNavProps = PainNavProp[];
