import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import Store from '../../store/index';
import { EServerStatus } from '../common/EServerStatus';
import { ServerSettings } from './ServerSettings';
import { ipcRenderer } from 'electron';

@Module({
  dynamic: true,
  store: Store,
  name: 'server',
  namespaced: true
})
export default class ServerStoreModule extends VuexModule {
  public settings: ServerSettings = new ServerSettings();
  public status: EServerStatus = EServerStatus.Off;

  @Mutation
  public SET_SETTINGS(value: ServerSettings) {
    this.settings = value;
  }

  @Mutation
  public SET_STATUS(value: EServerStatus) {
    this.status = value;
  }

  @Action
  public setServerStatus(value: EServerStatus) {
    this.SET_STATUS(value);
  }

  @Action
  public startServer(settings: ServerSettings) {
    if (settings.port == null || settings.port <= 0)
      throw new Error(
        `Server settings port value (${settings.port}) is invalid!`
      );
    if (settings.url == null || !settings.url.startsWith('/'))
      throw new Error(
        `Server settings url value ('${settings.url}') is invalid!`
      );
    this.SET_SETTINGS(settings);
    ipcRenderer.send('start-server', settings);
    this.setServerStatus(EServerStatus.Starting);
  }

  @Action
  public stopServer() {
    ipcRenderer.send('stop-server');
    this.setServerStatus(EServerStatus.Stopping);
  }
}
