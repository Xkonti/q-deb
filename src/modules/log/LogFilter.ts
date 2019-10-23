import { ILogEntry } from '../common/ILogEntry';

export class LogFilter {
  public isActive: boolean = false;
  public messageFilter: string | null = null;
  public sourceFilter: string | null = null;
  public tagFilter: string | null = null;
  public timestampFilterEnd: Date | null = null;
  public timestampFilterStart: Date | null = null;

  public matchEntry(entry: ILogEntry): boolean {
    if (entry == null) {
      console.log('Can\'t match null log entry');
      return false;
    }
    if (!this.isActive) return true;

    if (this.messageFilter != null && this.messageFilter !== '') {
      if (entry.message == null) {
        console.log('Can\'t match null message');
        return false;
      } else if (!entry.message.includes(this.messageFilter)) return false;
    }

    if (this.sourceFilter != null) {
      // TODO: Add source filtering
      return false;
    }

    if (this.tagFilter != null && this.tagFilter !== '') {
      if (entry.tags == null) {
        console.log('Can\'t match null tags');
        return false;
      } else if (!entry.tags.includes(this.tagFilter)) return false;
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
