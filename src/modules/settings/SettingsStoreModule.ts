import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import Store from '../../store/index';

@Module({
  dynamic: true,
  store: Store,
  name: 'settings',
  namespaced: true
})
export default class SettingsStoreModule extends VuexModule {

  public isDialogVisible: boolean = false;

  @Mutation
  public SET_IS_DIALOG_VISIBLE(value: boolean) {
    this.isDialogVisible = value;
  }

  @Action
  public setIsDialogVisible(value: boolean) {
    this.SET_IS_DIALOG_VISIBLE(value);
  }
}
