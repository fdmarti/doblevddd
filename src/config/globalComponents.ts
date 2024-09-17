import { DButton, FabButton } from '@common/components/Buttons';
import { LoadingComponent, LoadingSpinner } from '@common/components/Loading';
import { PopupComponent } from '@common/components/Popup';
import { TableComponent } from '@common/components/Table';
import { TitleComponent } from '@common/components/Text';
import { BlockMainContent, DividerComponent } from '@common/components/content';

export const ComponentsStack = {
  DButton: DButton,
  FabButton: FabButton,
  LoadingComponent: LoadingComponent,
  LoadingSpinner: LoadingSpinner,
  PopupComponent: PopupComponent,
  TableComponent: TableComponent,
  TitleComponent: TitleComponent,
  BlockMainContent: BlockMainContent,
  DividerComponent: DividerComponent,
};

declare module 'vue' {
  export interface GlobalComponents {
    DButton: typeof DButton;
    FabButton: typeof FabButton;
    LoadingComponent: typeof LoadingComponent;
    LoadingSpinner: typeof LoadingSpinner;
    PopupComponent: typeof PopupComponent;
    TableComponent: typeof TableComponent;
    TitleComponent: typeof TitleComponent;
    DividerComponent: typeof DividerComponent;
    BlockMainContent: typeof BlockMainContent;
  }
}
