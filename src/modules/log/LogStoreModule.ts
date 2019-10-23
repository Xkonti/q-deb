import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import Store from '../../store/index';
import { ILogEntry } from '../common/ILogEntry';
import { LogFilter } from './LogFilter';
import { EServerStatus } from '../common/EServerStatus';

@Module({
  dynamic: true,
  store: Store,
  name: 'log',
  namespaced: true
})
export default class LogStoreModule extends VuexModule {
  public autoscroll: boolean = true;
  public filter: LogFilter = new LogFilter();
  public filteredLog: ILogEntry[] = [];
  public fullLog: ILogEntry[] = [];
  public selected: ILogEntry[] = [];
  public serverStatus: EServerStatus = EServerStatus.Off;

  @Mutation
  public SET_AUTOSCROLL(value: boolean) {
    this.autoscroll = value;
  }

  @Mutation
  public SET_SERVER_STATUS(value: EServerStatus) {
    this.serverStatus = value;
  }

  @Mutation
  public ADD_FULL_LOG_ENTRY(entry: ILogEntry) {
    this.fullLog.push(entry);
  }

  @Mutation
  public ADD_FILTERED_LOG_ENTRY(entry: ILogEntry) {
    this.filteredLog.push(entry);
  }

  @Mutation
  public CLEAR_LOGS() {
    this.fullLog = [];
    this.filteredLog = [];
  }

  @Mutation
  public SET_SELECTED(selectedEntries: ILogEntry[]) {
    this.selected = selectedEntries;
  }

  @Mutation
  public SET_FILTER(newFilter: LogFilter) {
    this.filter = newFilter;
  }

  @Mutation
  public SET_FILTERED_LOG(log: ILogEntry[]) {
    this.filteredLog = log;
  }

  @Action
  public setAutoscroll(value: boolean) {
    this.SET_AUTOSCROLL(value);
  }

  @Action
  public addNewEntry(entry: ILogEntry) {
    this.ADD_FULL_LOG_ENTRY(entry);
    if (this.filter.matchEntry(entry)) {
      this.ADD_FILTERED_LOG_ENTRY(entry);
    }
  }

  @Action
  public clearLogs() {
    this.CLEAR_LOGS();
  }

  @Action
  public selectEntries(entriesToSelect: ILogEntry[]) {
    this.SET_SELECTED(entriesToSelect);
  }

  @Action
  public setFilter(filter: LogFilter) {
    this.SET_FILTER(filter);

    if (filter.isActive) {
      const filtered = this.fullLog.filter(entry => filter.matchEntry(entry));
      this.SET_FILTERED_LOG(filtered);
    } else {
      this.SET_FILTERED_LOG(this.fullLog);
    }
  }

  @Action
  public setServerStatus(value: EServerStatus) {
    this.SET_SERVER_STATUS(value);
  }
}
