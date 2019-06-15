import {animate, animateChild, animation, group, query, stagger, style, transition, trigger} from '@angular/animations';

export const transAnimation = animation([
  style({
    height: '{{ height }}',
    opacity: '{{ opacity }}',
    backgroundColor: '{{ backgroundColor }}'
  }),
  animate('{{ time }}')
]);

export const slideInAnimation =
  trigger('routeAnimation', [
    transition('ProductListPage <=> ProductDetailsPage', [
      style({position: 'relative'}),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({left: '-100%'})
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('300ms ease-out', style({left: '100%'}))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({left: '0%'}))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
    transition('* <=> FilterPage', [
      style({position: 'relative'}),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({left: '-100%'})
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('200ms ease-out', style({left: '100%'}))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({left: '0%'}))
        ])
      ]),
      query(':enter', animateChild()),
    ])
  ]);

export function fadeIn(selector: string, duration = '400ms ease-out') {
  return [
    transition(' => ', [
      query(selector, [
        style({opacity: 0, transform: 'translateY(-5px)'}),
        stagger('60ms', [
          animate(duration, style({
            opacity: 1,
            transform: 'translateY(0px)'
          }))
        ])
      ], {optional: true})
    ])
  ];
}

export function fadeOut(selector = ':leave', duration = 300) {
  return [
    transition(' => ', [
      query(selector, [
        style({opacity: 1}),
        stagger('30ms', [
          animate(duration, style({
            opacity: 0
          }))
        ])
      ], {optional: true})
    ])
  ];
}


