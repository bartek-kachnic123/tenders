'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tenders', [
      {
        title: 'Przetarg na budowę drogi',
        offerStartDate: new Date('2025-04-01T08:00:00'),
        offerEndDate: new Date('2025-05-01T18:00:00'),
        institutionName: 'Gmina Warszawa',
        description: 'Budowa drogi w okolicach centrum miasta.',
        maxPrice: 500000.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Przetarg na remont szkoły',
        offerStartDate: new Date('2025-04-10T09:00:00'),
        offerEndDate: new Date('2025-05-10T17:00:00'),
        institutionName: 'Miasto Kraków',
        description: 'Remont budynku szkoły podstawowej w Krakowie.',
        maxPrice: 250000.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Zakup sprzętu komputerowego',
        offerStartDate: new Date('2025-03-15T10:30:00'),
        offerEndDate: new Date('2025-04-15T15:30:00'),
        institutionName: 'Politechnika Warszawska',
        description: 'Zakup nowoczesnych komputerów dla wydziału informatyki.',
        maxPrice: 150000.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Usługi sprzątające dla szpitala',
        offerStartDate: new Date('2024-05-10T08:00:00'),
        offerEndDate: new Date('2024-06-10T17:00:00'),
        institutionName: 'Szpital Uniwersytecki w Krakowie',
        description: 'Świadczenie usług sprzątających w budynkach szpitalnych.',
        maxPrice: 120000.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Budowa nowego mostu',
        offerStartDate: new Date('2025-04-01T12:00:00'),
        offerEndDate: new Date('2025-06-01T16:00:00'),
        institutionName: 'Województwo Lubuskie',
        description: 'Budowa mostu na rzece Odra.',
        maxPrice: 800000.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Zakup materiałów biurowych',
        offerStartDate: new Date('2024-04-20T10:00:00'),
        offerEndDate: new Date('2024-05-20T14:00:00'),
        institutionName: 'Ministerstwo Edukacji',
        description: 'Zakup artykułów biurowych dla Ministerstwa.',
        maxPrice: 50000.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Przetarg na budowę stadionu',
        offerStartDate: new Date('2025-03-01T08:00:00'),
        offerEndDate: new Date('2025-08-01T20:00:00'),
        institutionName: 'Miasto Wrocław',
        description: 'Budowa nowego stadionu sportowego w Wrocławiu.',
        maxPrice: 1500000.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Modernizacja infrastruktury miejskiej',
        offerStartDate: new Date('2025-03-15T11:00:00'),
        offerEndDate: new Date('2025-06-15T17:30:00'),
        institutionName: 'Gmina Poznań',
        description: 'Modernizacja dróg i chodników w centrum miasta.',
        maxPrice: 400000.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Przetarg na instalację fotowoltaiczną',
        offerStartDate: new Date('2025-02-25T09:30:00'),
        offerEndDate: new Date('2025-07-25T18:00:00'),
        institutionName: 'Miejskie Przedsiębiorstwo Energetyki Cieplnej',
        description: 'Instalacja paneli fotowoltaicznych na dachach budynków użyteczności publicznej.',
        maxPrice: 200000.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Zakup usług konsultingowych',
        offerStartDate: new Date('2025-03-01T08:30:00'),
        offerEndDate: new Date('2025-09-01T17:30:00'),
        institutionName: 'Narodowy Fundusz Zdrowia',
        description: 'Zakup usług konsultingowych dla NFZ w zakresie zarządzania projektami.',
        maxPrice: 100000.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tenders', null, {});
  }
};
