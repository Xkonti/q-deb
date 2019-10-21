export interface ILogEntry {
  id: number;
  exception: string;
  level: string;
  message: string;
  source: string;
  tags: string[];
  timestamp: Date;
}
