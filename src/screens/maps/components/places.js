const keyGenerator = () => "_" + Math.random().toString(36).substr(2, 9);

export const places = [
  {
    categoria: {
      name: "Dónde comer",
      places: [
        {
          key: keyGenerator(),
          name: "O Reily 304",
          type: "Restaurant",
          valoracion: "9",
          coordenadas: {
            latitude: 23.139328,
            longitude: -82.353298,
          },
        },
        {
          key: keyGenerator(),
          name: "El del Frente",
          type: "Restaurant",
          valoracion: "9",
          coordenadas: {
            latitude: 23.139276,
            longitude: -82.353295,
          },
        },
        {
          key: keyGenerator(),
          name: "Somos Cuba",
          type: "Restaurant",
          valoracion: "9.6",
          coordenadas: {
            latitude: 23.138366,
            longitude: -82.351098,
          },
        },
        {
          key: keyGenerator(),
          name: "Buena Vista Curry Club",
          type: "Restaurant",
          valoracion: "9.5",
          coordenadas: {
            latitude: 23.141422,
            longitude: -82.353083,
          },
        },
        {
          key: keyGenerator(),
          name: "II Restico",
          type: "Restaurant",
          valoracion: "9.4",
          coordenadas: {
            latitude: 23.139607,
            longitude: -82.354287,
          },
        },
        {
          key: keyGenerator(),
          name: "Mundo Pizza",
          type: "Restaurant",
          valoracion: "9.4",
          coordenadas: {
            latitude: 23.140275,
            longitude: -82.352756,
          },
        },
        {
          key: keyGenerator(),
          name: "Van van",
          type: "Restaurant",
          valoracion: "9.2",
          coordenadas: {
            latitude: 23.139607,
            longitude: -82.354287,
          },
        },
        {
          key: keyGenerator(),
          name: "Doña Alicia",
          type: "Restaurant",
          valoracion: "9.2",
          coordenadas: {
            longitude: -82.35186036676168,
            latitude: 23.1319350777086,
          },
        },
        {
          key: keyGenerator(),
          name: "El Meson de Rosalia",
          type: "Restaurant",
          valoracion: "9.2",
          coordenadas: {
            longitude: -82.35632624477147,
            latitude: 23.133957955377124,
          },
        },
        {
          key: keyGenerator(),
          name: "Kilometro Zero",
          type: "Restaurant",
          valoracion: "9.2",
          coordenadas: {
            longitude: -82.35736761242151,
            latitude: 23.13569499744716,
          },
        },
      ],
    },
  },
];
