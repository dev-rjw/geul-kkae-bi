export type CardData = {
  id: number;
  badge: string;
  difficulty: number;
  title: string;
  description: string[];
  link: string;
  styles: {
    bg: string;
    bgImage: string;
    badgeColor: string;
    difficultyTextColor: string;
    difficultyIconColor: string;
    titleColor: string;
    contentColor: string;
    buttonColor: string;
    buttonIconColor: string;
  };
};

export type GameCardProps = {
  card: CardData;
  hoveredCard: number | null;
  onHover: () => void;
  onLeave: () => void;
};
