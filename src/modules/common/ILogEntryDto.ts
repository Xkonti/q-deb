export interface ILogEntryDto {
  id: number;
  exception: string;
  level: string;
  message: string;
  source: string;
  tags: string[];
  timestamp: string;
}
