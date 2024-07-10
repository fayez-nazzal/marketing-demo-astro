/* Types here are generated from the markdown files in the content folder.

------ PLEASE DO NOT MODIFY ------

Everything here won't be commited to git and will be overwritten on next build. */  

export type TLandingHome = {
  title: string;
  slug: string;
  sections: Section[];
}

type Section = {
  type: string;
  heading: string;
  subheading: string;
  cta: Cta;
  image: string;
}

type Cta = {
  text: string;
  url: string;
}