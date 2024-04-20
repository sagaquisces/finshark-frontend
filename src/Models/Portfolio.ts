export type PortfolioGet = {
  id: number;
  symbol: string;
  company: string;
  purchase: number;
  industry: string;
  marketCap: number;
  comments: any;
}

export type PortfolioPost = {
  symbol: string;
}