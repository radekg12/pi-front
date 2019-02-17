import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';
// Routable animations
export var slideInAnimation = trigger('routeAnimation', [
    transition('heroes <=> hero', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%'
            })
        ]),
        query(':enter', [
            style({ left: '-100%' })
        ]),
        query(':leave', animateChild()),
        group([
            query(':leave', [
                animate('300ms ease-out', style({ left: '100%' }))
            ]),
            query(':enter', [
                animate('300ms ease-out', style({ left: '0%' }))
            ])
        ]),
        query(':enter', animateChild()),
    ])
]);
/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
//# sourceMappingURL=animations.js.map