const schema = [
  {
    address: 'continent',
    noun: {
      singular: 'continent',
      plural: 'continents',
    },
    properties: []
  },
  {
    address: 'currency',
    noun: {
      singular: 'currency',
      plural: 'currencies',
    },
    properties: [
      {
        property: 'iso',
        type: 'string',
        label: 'ISO standard code',
      },
      {
        property: 'symbol',
        type: 'string',
        label: 'symbol',
      },
    ]
  },
  {
    address: 'city',
    noun: {
      singular: 'city',
      plural: 'cities',
    },
    properties: []
  },
  {
    address: 'language',
    noun: {
      singular: 'language',
      plural: 'languages',
    },
    properties: [
      {
        property: 'speakersFirst',
        type: 'number',
        label: 'number of speakers as a first language',
      },
      {
        property: 'speakersSecond',
        type: 'number',
        label: 'number of speakers as a second language',
      },
    ]
  },
  {
    address: 'country',
    noun: {
      singular: 'country',
      plural: 'countries',
    },
    properties: [
      {
        property: 'iso2',
        type: 'string',
        label: 'ISO standard 2-letter country code',
      },
      {
        property: 'iso3',
        type: 'string',
        label: 'ISO standard 3-letter country code',
      },
      {
        property: 'popuation',
        type: 'number',
        label: 'population',
      },
      {
        property: 'size',
        type: 'number',
        label: 'area in square kilometres',
      },
      {
        property: 'languages',
        type: 'many-to-many',
        target: 'language',
        label: 'official languages',
      },
      {
        property: 'anthem',
        type: 'string',
        label: 'national anthem',
      },
      {
        property: 'continent',
        type: 'one-to-many',
        target: 'continent',
        label: 'continent',
      },
      {
        property: 'currency',
        type: 'one-to-many',
        target: 'currency',
        label: 'official currency',
      },
      {
        property: 'capital',
        type: 'one-to-one',
        target: 'city',
        label: 'capital city',
      },
    ]
  },
]
