// All page content lives here so the site can be edited without touching templates.
// Images are hotlinked from the current WordPress site; download them into
// /public/img and change the URLs when you retire the old site.
const WP = 'https://knightriker.com/wp-content/uploads';

module.exports = {
  name: 'Knight Riker Industries',
  tagline: 'Build the iconic KITT voicebox from Season 3 and 4',
  youtube: 'https://www.youtube.com/', // TODO: put your channel URL here
  logo: `${WP}/2025/01/flag.png`,
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Parts', href: '/parts' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' }
  ],
  home: {
    heading: 'Build the Iconic KITT Voicebox from Season 3 and 4',
    intro: 'Follow our tutorials to create your very own programmable voicebox inspired by the legendary KITT.',
    heroImage: '/img/hero-voicebox.png',
    heroImageWebp: '/img/hero-voicebox.webp',
    chips: ['Raspberry Pi Pico 2', 'Gerber files', '3D-printable case'],
    features: [
      { title: 'Schematic Diagram', text: 'We will go in-depth with step by step guides.' },
      {
        title: 'PCB Production',
        text: 'Gerber files available to order through PCB supplier.',
        images: [`${WP}/2025/01/20250118_232937-scaled.jpg`, `${WP}/2025/01/20241123_184137-scaled.jpg`]
      },
      { title: '3D Printing', text: '.stl files to print the case!' },
      { title: 'Created with the Raspberry Pi Pico 2', text: 'All the coding required to get you started!' }
    ],
    closingImage: `${WP}/2026/03/VoiceModule1.png`
  },
  parts: {
    heading: 'Parts Required',
    intro: 'This is a full list of parts and equipment required to build your own KITT voice box.',
    equipment: [
      'Soldering Iron',
      'Solder',
      'Solder Paste',
      'Heat gun or PCB Hot Plate',
      '3D Printer',
      'Utility knife',
      '12V Power Supply',
      'Computer'
    ],
    boards: [
      {
        name: 'LED Board',
        items: [
          'PCB Boards: One LED Board and One Voice Module Board',
          '19 × 100nF Capacitors',
          '6 × 10 LED Bar Display',
          '19 × WS2812B NeoPixel LEDs',
          '1 × RGB LED Driver Header',
          '1 × LED Driver Header',
          '1 × Power Header',
          '6 × 180Ohm Resistors',
          '2 × 150Ohm Resistors'
        ]
      },
      {
        name: 'Module Board',
        items: [
          '1 × Pi Pico 2',
          '2 × 10uF Tantalum Capacitor, Polarised',
          '1 × 10uF Capacitor, Polarised',
          '1 × 1N5817 Diode',
          '1 × ASM1117-1.8 Integrated Circuit',
          '1 × Adafruit DAC Audio Module',
          '1 × IR Sensor',
          '1 × PDM Mic',
          '1 × RGB LED Driver Female Header Connector',
          '1 × Speaker Amp',
          '1 × 12V Jack',
          '1 × LED Driver Female Header Connector',
          '1 × Power Female Header Connector',
          '1 × Power Switch',
          '10 × BC557ATA Transistors',
          '11 × 1kOhm Resistors',
          '1 × TSR_1-2450 Current Converter',
          '1 × Trimmer Variable Resistor',
          '4 × Push Buttons'
        ]
      }
    ]
  },
  gallery: {
    heading: 'Gallery',
    cta: 'Create your very own',
    images: [
      { src: `${WP}/2026/03/VoiceModuleUpdated-scaled.png`, alt: 'Voice module board, updated revision' },
      { src: `${WP}/2026/03/kittvoiceV4_4a-scaled.png`, alt: 'KITT voicebox V4 render' },
      { src: `${WP}/2026/03/20250125_104337-scaled.jpg`, alt: 'KITT voicebox build photo' },
      { src: `${WP}/2026/03/20241028_122734-scaled.jpg`, alt: 'KITT voicebox build photo' }
    ]
  },
  contact: { heading: 'Contact Us', intro: 'Questions about the build, the parts or the PCB files? Send a message and we will reply by email.' }
};
