export interface Word {
  channel: {
    total: number;
    num: number;
    title: string;
    start: number;
    description: string;
    link: string;
    item: WordItem[];
    lastbuilddate: string;
  };
}
export interface WordItem {
  word: string;
  sense: [
    {
      definition: string;
      link: string;
      sense_no: string;
      target_code: string;
      type: string;
      pos: string;
    },
  ];
}

export interface ExtractWordListFromWord {
  word: string;
  wordClass: string;
  definition: string;
}
