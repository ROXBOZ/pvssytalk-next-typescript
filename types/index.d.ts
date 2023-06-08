export interface PainDetail {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  mainImage: {
    hotspot: boolean;
    caption: string;
    alternativeText: string;
    url: string;
  };
  medicalApproach: {
    def: string;
    schema1: {
      hotspot: boolean;
      caption: string;
      alternativeText: string;
    };
    schema2: {
      hotspot: boolean;
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
