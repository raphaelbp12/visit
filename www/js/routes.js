angular.module('starter.routes', [
  'ionic',
  'restangular'
])
.config(function($stateProvider, $urlRouterProvider, RestangularProvider) {
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'app/home.html',
    controller: 'homeCtrl'
  })
  .state('events', {
    url: '/events',
    templateUrl: 'app/events/events.html',
    controller: 'eventsCtrl'
  })
  .state('slider', {
    url: '/slider',
    templateUrl: 'app/slider/slider.html',
    controller: 'sliderCtrl'
  })
  .state('sobre', {
    url: '/sobre',
    templateUrl: 'app/sobre/sobre.html',
    controller: 'sobreCtrl'
  })
  .state('post', {
    cache: false,
    url: '/post/:id',
    templateUrl: 'app/post/post.html',
    controller: 'postCtrl'
  })
  .state('comer', {
    cache: false,
    url: '/comer',
    abstract: true,
    templateUrl: 'app/category/comer.html',
    controller: 'categoryCtrl'
  })
  .state('comer.bares', {
    url: '/bares',
    views: {
      'comer-bares': {
        templateUrl: 'app/category/tab/tab.html',
        controller: 'tabCtrl',
        params: {term: 'bares', cat: 'cat_onde_comer'}
      }
    }
  })
  .state('comer.cafes', {
    url: '/cafes',
    views: {
      'comer-cafes': {
        templateUrl: 'app/category/tab/tab.html',
        controller: 'tabCtrl',
        params: {term: 'cafes', cat: 'cat_onde_comer'}
      }
    }
  })
  .state('comer.fastfood', {
    url: '/fastfood',
    views: {
      'comer-fastfood': {
        templateUrl: 'app/category/tab/tab.html',
        controller: 'tabCtrl',
        params: {term: 'fastfood', cat: 'cat_onde_comer'}
      }
    }
  })
  .state('comer.quiosques', {
    url: '/quiosques',
    views: {
      'comer-quiosques': {
        templateUrl: 'app/category/tab/tab.html',
        controller: 'tabCtrl',
        params: {term: 'quiosques', cat: 'cat_onde_comer'}
      }
    }
  })
  .state('comer.restaurantes', {
    url: '/restaurantes',
    views: {
      'comer-restaurantes': {
        templateUrl: 'app/category/tab/tab.html',
        controller: 'tabCtrl',
        params: {term: 'restaurantes', cat: 'cat_onde_comer'}
      }
    }
  })
  .state('comer.sorveterias', {
    url: '/sorveterias',
    views: {
      'comer-sorveterias': {
        templateUrl: 'app/category/tab/tab.html',
        controller: 'tabCtrl',
        params: {term: 'sorveterias', cat: 'cat_onde_comer'}
      }
    }
  })
  .state('fazer', {
    cache: false,
    url: '/fazer',
    abstract: true,
    templateUrl: 'app/category/fazer.html',
    controller: 'categoryCtrl'
  })
  .state('fazer.ao-ar-livre', {
    url: '/ao-ar-livre',
    views: {
      'fazer-ao-ar-livre': {
        templateUrl: 'app/category/tab/tab.html',
        controller: 'tabCtrl',
        params: {term: 'ao-ar-livre', cat: 'cat_que_fazer'}
      }
    }
  })
  .state('fazer.bem-estar', {
    url: '/bem-estar',
    views: {
      'fazer-bem-estar': {
        templateUrl: 'app/category/tab/tab.html',
        controller: 'tabCtrl',
        params: {term: 'bem-estar', cat: 'cat_que_fazer'}
      }
    }
  })
  .state('fazer.compras', {
    url: '/compras',
    views: {
      'fazer-compras': {
        templateUrl: 'app/category/tab/tab.html',
        controller: 'tabCtrl',
        params: {term: 'compras', cat: 'cat_que_fazer'}
      }
    }
  })
  .state('fazer.cultura-arte', {
    url: '/cultura-arte',
    views: {
      'fazer-cultura-arte': {
        templateUrl: 'app/category/tab/tab.html',
        controller: 'tabCtrl',
        params: {term: 'cultura-arte', cat: 'cat_que_fazer'}
      }
    }
  })
  .state('fazer.esportes', {
    url: '/esportes',
    views: {
      'fazer-esportes': {
        templateUrl: 'app/category/tab/tab.html',
        controller: 'tabCtrl',
        params: {term: 'esportes', cat: 'cat_que_fazer'}
      }
    }
  })
  .state('fazer.vida-noturna', {
    url: '/vida-noturna',
    views: {
      'fazer-vida-noturna': {
        templateUrl: 'app/category/tab/tab.html',
        controller: 'tabCtrl',
        params: {term: 'vida-noturna', cat: 'cat_que_fazer'}
      }
    }
  })
  .state('ficar', {
    cache: false,
    url: '/ficar',
    abstract: true,
    templateUrl: 'app/category/ficar.html',
    controller: 'categoryCtrl'
  })
  .state('ficar.albergues', {
    url: '/albergues',
    views: {
      'ficar-albergues': {
        templateUrl: 'app/category/tab/tab.html',
        controller: 'tabCtrl',
        params: {term: 'albergues', cat: 'cat_onde_ficar'}
      }
    }
  })
  .state('ficar.apart-hoteis', {
    url: '/apart-hoteis',
    views: {
      'ficar-apart-hoteis': {
        templateUrl: 'app/category/tab/tab.html',
        controller: 'tabCtrl',
        params: {term: 'apart-hoteis', cat: 'cat_onde_ficar'}
      }
    }
  })
  .state('ficar.cama-e-cafe', {
    url: '/cama-e-cafe',
    views: {
      'ficar-cama-e-cafe': {
        templateUrl: 'app/category/tab/tab.html',
        controller: 'tabCtrl',
        params: {term: 'cama-e-cafe', cat: 'cat_onde_ficar'}
      }
    }
  })
  .state('ficar.hoteis', {
    url: '/hoteis',
    views: {
      'ficar-hoteis': {
        templateUrl: 'app/category/tab/tab.html',
        controller: 'tabCtrl',
        params: {term: 'hoteis', cat: 'cat_onde_ficar'}
      }
    }
  })
  .state('ficar.pousada', {
    url: '/pousada',
    views: {
      'ficar-pousada': {
        templateUrl: 'app/category/tab/tab.html',
        controller: 'tabCtrl',
        params: {term: 'pousada', cat: 'cat_onde_ficar'}
      }
    }
  });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');
});
