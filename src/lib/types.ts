export type PlotStatus = "available" | "occupied" | "mine" | "reserved";

export interface Plot {
  id: string;
  code: string;
  row: number;
  col: number;
  sizeM2: number;
  status: PlotStatus;
  gardenerId?: string;
  gardenerName?: string;
  crops: string[];
  waitlist: number;
  lastWatered?: string;
}

export interface Member {
  id: string;
  name: string;
  emoji: string;
  color: string;
  role: "coordenador" | "membro";
  plotIds: string[];
  joinedAt: string;
  bio: string;
  badges: string[];
}

export type TaskType = "mutirao" | "manutencao" | "colheita" | "rega";

export interface GardenTask {
  id: string;
  title: string;
  description: string;
  type: TaskType;
  date: string;
  time: string;
  location: string;
  volunteersNeeded: number;
  volunteersSigned: string[];
  plotId?: string;
}

export interface GardenEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: "workshop" | "feira" | "confraternizacao" | "reuniao";
  attendees: number;
  going: boolean;
}

export type PostType = "anuncio" | "duvida" | "geral" | "colheita";

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorEmoji: string;
  authorColor: string;
  type: PostType;
  content: string;
  createdAt: string;
  likes: number;
  liked: boolean;
  comments: number;
}

export type ExchangeCategory = "semente" | "muda" | "ferramenta" | "adubo";
export type ExchangeType = "troca" | "doacao" | "emprestimo";

export interface ExchangeItem {
  id: string;
  title: string;
  category: ExchangeCategory;
  type: ExchangeType;
  ownerName: string;
  ownerEmoji: string;
  description: string;
  createdAt: string;
}

export interface WeatherInfo {
  tempC: number;
  condition: string;
  humidity: number;
  rainChancePct: number;
  icon: "sun" | "cloud" | "rain" | "cloud-sun";
}

export interface CurrentUser {
  id: string;
  name: string;
  emoji: string;
  color: string;
  plotIds: string[];
  notifications: number;
}
