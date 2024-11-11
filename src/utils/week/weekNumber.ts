const startSeason = new Date(2024, 9, 27);
const now = new Date();
export const weekNumber = Math.floor((now.getTime() - startSeason.getTime()) / 604800000) + 1;
