export interface GalleryData {
  id: string;
  title: string;
  subtitle: string;
  images: {
    url: string;
    caption: string;
  }[];
}

export const galleries: Record<string, GalleryData> = {
  "niti-aayog": {
    id: "niti-aayog",
    title: "NITI Aayog National Technology Week Showcase",
    subtitle: "Presenting the Hand Gesture Vocalizer (HGV)",
    images: [
      {
        url: "/gallery/niti-aayog/pmKrish.jpg",
        caption: "Showcasing the Hand Gesture Vocalizer to the Hon'ble Prime Minister",
      },
      {
        url: "/gallery/niti-aayog/G20%20Sherpa%20MR.%20Amitabh%20Kanth.jpg",
        caption: "Showcasing the project to G20 Sherpa Mr. Amitabh Kant",
      },
      {
        url: "/gallery/niti-aayog/AIM%20DIRECTOR%20_DR%20CHINTAN%20VAISHNAV.jpg",
        caption: "Interacting with AIM Mission Director Dr. Chintan Vaishnav",
      },
      {
        url: "/gallery/niti-aayog/AIM%20DIrector.jpg",
        caption: "Discussion with AIM Mission Director Dr. Chintan Vaishnav",
      },
      { url: "/gallery/niti-aayog/IMG-20230511-WA0062.jpg", caption: "Setting up the exhibition booth" },
      { url: "/gallery/niti-aayog/IMG-20230511-WA0081.jpg", caption: "Early morning event preparations" },
      { url: "/gallery/niti-aayog/IMG-20230511-WA0087.jpg", caption: "Ready for the National Technology Week" },
      { url: "/gallery/niti-aayog/IMG-20230512-WA0017.jpg", caption: "Discussing the Hand Gesture Vocalizer details" },
      { url: "/gallery/niti-aayog/IMG-20230513-WA0082.jpg", caption: "Interacting with enthusiastic students" },
      { url: "/gallery/niti-aayog/IMG-20230513-WA0160.jpg", caption: "Demonstrating the prototype to visitors" },
      { url: "/gallery/niti-aayog/IMG-20230513-WA0169.jpg", caption: "Engaging with school students at the booth" },
      { url: "/gallery/niti-aayog/IMG-20230519-WA0037.jpg", caption: "Explaining the technology to delegates" },
      { url: "/gallery/niti-aayog/IMG-20230519-WA0047.jpg", caption: "Live demonstration of the sensor glove" },
      { url: "/gallery/niti-aayog/IMG-20230519-WA0054.jpg", caption: "Answering queries from the audience" },
      { url: "/gallery/niti-aayog/IMG-20230519-WA0059.jpg", caption: "Showcasing the project's real-world impact" },
      { url: "/gallery/niti-aayog/IMG-20230519-WA0060.jpg", caption: "Showcase day snapshots" },
      { url: "/gallery/niti-aayog/IMG-20230519-WA0061.jpg", caption: "Showcase day snapshots" },
      { url: "/gallery/niti-aayog/IMG-20230612-WA0006.jpg", caption: "Innovation Exhibition" },
      { url: "/gallery/niti-aayog/IMG-20230612-WA0007.jpg", caption: "Innovation Exhibition" },
      { url: "/gallery/niti-aayog/IMG_0573.JPG", caption: "Innovation Exhibition" },
      { url: "/gallery/niti-aayog/IMG_20231126_231012.jpg", caption: "Innovation Exhibition" },
      { url: "/gallery/niti-aayog/IMG_2649.JPG", caption: "Project demonstrations" },
      { url: "/gallery/niti-aayog/IMG_2656.JPG", caption: "Project demonstrations" },
      { url: "/gallery/niti-aayog/IMG_6003-1.JPG", caption: "Project demonstrations" },
      { url: "/gallery/niti-aayog/_MG_2902.JPG", caption: "Project demonstrations" },
    ],
  },
  "ncsc": {
    id: "ncsc",
    title: "National Children's Science Congress",
    subtitle: "Open Nationals/International level at SAL Education Campus",
    images: [
      { url: "/gallery/ncsc/1676466798010.jpeg", caption: "Presenting the environmental engineering project" },
      { url: "/gallery/ncsc/IMG-20230127-WA0094.jpg", caption: "NCSC Open Nationals Highlights" },
      { url: "/gallery/ncsc/IMG-20230129-WA0017.jpg", caption: "NCSC Open Nationals Highlights" },
      { url: "/gallery/ncsc/IMG-20230214-WA0000.jpg", caption: "Receiving Honors and Recognition" },
      { url: "/gallery/ncsc/IMG-20230214-WA0001.jpg", caption: "Receiving Honors and Recognition" },
      { url: "/gallery/ncsc/IMG-20230214-WA0002.jpg", caption: "Receiving Honors and Recognition" },
      { url: "/gallery/ncsc/IMG_20230302_221701.jpg", caption: "Representing KVS Jammu Region" },
      { url: "/gallery/ncsc/IMG_20230320_113305-01.jpeg", caption: "Representing KVS Jammu Region" },
    ],
  },
};
