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
    def: string;
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
