import { ILogEntry } from '../common/ILogEntry';

export class LogFilter {
  public isActive: boolean = false;
  public messageFilter: string | null = null;
  public sourceFilter: string | null = null;
  public tagFilter: string | null = null;
  public timestampFilterEnd: Date | null = null;
  public timestampFilterStart: Date | null = null;

  public matchEntry(entry: ILogEntry): boolean {
    if (!this.isActive) return true;

    if (this.messageFilter != null) {
      // TODO: Add message filtering
      return false;
    }

    if (this.sourceFilter != null) {
      // TODO: Add source filtering
      return false;
    }

    if (this.tagFilter != null) {
      if (!entry.tags.includes(this.tagFilter)) return false;
    }

    if (this.timestampFilterEnd != null) {
      // TODO: Add timestamp end filtering
      return false;
    }

    if (this.timestampFilterStart != null) {
      // TODO: Add timestamp start filtering
      return false;
    }

    return true;
  }
}
