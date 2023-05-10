import 'i18next';
import { Resources as MyResources } from './i18nextResourceTypes';

declare module 'i18next' {
    interface CustomTypeOptions {
        returnNull: false;
        resources: MyResources;
    }
}
