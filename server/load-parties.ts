import {Parties} from '../collections/parties';

export function loadParties() {
    if (Parties.find().count() === 0) {

    var parties = [
        {
            'name': 'Dubstep-Free Zone',
            'description': 'Can we please just for an evening not listen to dubstep.',
            'location': {
                name: 'Taichung Taiwan',
                lat: 24.1654604,
                lng: 120.694755
            },
            'public': true
        },
        {
            'name': 'All dubstep all the time',
            'description': 'Get it on!',
            'location': {
                name: 'Taipei Taiwan',
                lat: 25.155267,
                lng: 121.552572
            },
            'public': true
        },
        {
            'name': 'Savage lounging',
            'description': 'Leisure suit required. And only fiercest manners.',
            'location': {
                name: 'Tainan Taiwan',
                lat:22.996881,
                lng:120.202667
            },
            'public': false
        }
    ];

    for (var i = 0; i < parties.length; i++) {
        Parties.insert(parties[i]);
    }
  }
};
