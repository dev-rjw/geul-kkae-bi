export type ShareUrlProps = {
  searchParams: { [key: string]: string | undefined };
};

export type GameData = {
  name: string;
  type: string;
  styles: {
    color: string;
    highlightScoreColor: string;
  };
};
