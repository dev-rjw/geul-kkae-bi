export type HeaderData = {
  title: string;
  pcVisible: string;
  mobileVisible: string;
  headerClassName: string;
  titleClassName: string;
};

export type HeaderPcMenuData = {
  id: number;
  title: string;
  link?: string;
  children?: {
    title: string;
    link: string;
  }[];
};

export type HeaderPcMenuProps = {
  item: HeaderPcMenuData;
  hoveredMenu: number | null;
  onHover: () => void;
  onLeave: () => void;
};

export type HeaderMobileMenuData = {
  id: number;
  title: string;
  link?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  children?: {
    title: string;
    link: string;
  }[];
};

export type HeaderMobileMenuProps = {
  item: HeaderMobileMenuData;
};
