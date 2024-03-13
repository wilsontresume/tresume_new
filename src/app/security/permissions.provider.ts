import { APP_INITIALIZER, FactoryProvider, Injector } from '@angular/core';
import { Permissions  } from './permissions.service';

export function providePermissions(service: Permissions, injector: Injector): () => Promise<any> {
    return function () { return service.load(injector); };
}

export const PermissionsProvider: FactoryProvider = {
    provide: APP_INITIALIZER,
    useFactory: providePermissions,
    deps: [Permissions, Injector],
    multi: true
};