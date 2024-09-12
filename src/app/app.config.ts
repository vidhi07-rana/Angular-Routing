import { ApplicationConfig } from "@angular/core";
import { routes } from "./app.routes";
import { provideRouter, withComponentInputBinding, withRouterConfig } from "@angular/router";

export const appConfig : ApplicationConfig= {
    providers: [provideRouter(routes, withComponentInputBinding(),withRouterConfig({
        paramsInheritanceStrategy:"always"//dynamic parameter values are injected in child routes this funcion is ud=sed mfor his
    }))

    ]
}
 
