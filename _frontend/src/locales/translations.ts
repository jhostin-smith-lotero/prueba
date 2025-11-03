export type Language = "es" | "en";

export const SUPPORTED_LANGUAGES: Language[] = ["es", "en"];

type Schedule = Record<string, Record<string, string[]>>;

type DrawerMessages = {
  loadError: string;
  detailError: string;
  missingItem: string;
  purchaseFailed: string;
  equipFailed: string;
  purchased: string;
  equipped: string;
};

type DrawerTranslations = {
  closeAria: string;
  loading: string;
  yourCoinsLabel: string;
  typeLabel: string;
  qualityLabel: string;
  priceLabel: string;
  insufficientCoins: string;
  buyLabel: string;
  equipLabel: string;
  buyBusyLabel: string;
  equipBusyLabel: string;
  buyCta: string;
  equipCta: string;
  messages: DrawerMessages;
};

type ItemListTranslations = {
  loadError: string;
  viewItem: string;
};

type ItemCatalogTranslations = {
  names: Record<string, string>;
  types: Record<string, string>;
  qualities: Record<string, string>;
};

type ShopTranslations = {
  drawer: DrawerTranslations;
  itemList: ItemListTranslations;
  catAlt: string;
  hatFallback: string;
  accessoryFallback: string;
  catalog: ItemCatalogTranslations;
};

type SettingsTranslations = {
  header: { title: string; subtitle: string };
  navigation: { coinAlt: string };
  audio: {
    title: string;
    caption: string;
    controls: Record<"music" | "sfx", { label: string; hint: string }>;
    toggleEnable: string;
    toggleDisable: string;
  };
  language: {
    title: string;
    caption: string;
    options: Record<Language, string>;
  };
  session: {
    title: string;
    caption: string;
    logout: string;
    loggingOut: string;
  };
  loadError: string;
};

type HomeTranslations = {
  session: { study: string; rest: string };
  quickDurations: { short: string; medium: string; long: string };
  controls: {
    start: string;
    stop: string;
    pause: string;
    resume: string;
    openSettings: string;
    closeSettings: string;
  };
  sliders: {
    studyLabel: string;
    studyAria: string;
    restLabel: string;
    restAria: string;
  };
  tasks: {
    title: string;
    placeholder: string;
    add: string;
  };
  catAlt: string;
};

type CalendarTranslations = {
  title: string;
  days: string[];
  hours: string[];
  schedule: Schedule;
};

type CommonTranslations = {
  coinAlt: string;
  navigation: Record<"home" | "calendar" | "shop" | "settings", string>;
  actions: {
    play: string;
    stop: string;
    pause: string;
    close: string;
    settings: string;
  };
};

type MinutesSliderTranslations = {
  labelSuffix: string;
};

type Translations = {
  common: CommonTranslations;
  settings: SettingsTranslations;
  home: HomeTranslations;
  calendar: CalendarTranslations;
  shop: ShopTranslations;
  minutesSlider: MinutesSliderTranslations;
};

export const TRANSLATIONS: Record<Language, Translations> = {
  es: {
    common: {
      coinAlt: "moneda",
      navigation: {
        home: "inicio",
        calendar: "calendario",
        shop: "tienda",
        settings: "configuraci\u00F3n",
      },
      actions: {
        play: "reproducir",
        stop: "detener",
        pause: "pausar",
        close: "cerrar",
        settings: "ajustes",
      },
    },
    settings: {
      header: {
        title: "Configuraci\u00F3n",
        subtitle: "Personaliza la forma en que la app suena y te acompa\u00F1a.",
      },
      navigation: {
        coinAlt: "moneda",
      },
      audio: {
        title: "Audio",
        caption: "Ajusta cada pista seg\u00FAn tu preferencia.",
        controls: {
          music: {
            label: "M\u00FAsica",
            hint: "Melod\u00EDas de fondo durante tus sesiones.",
          },
          sfx: {
            label: "SFX",
            hint: "Efectos de sonido.",
          },
        },
        toggleEnable: "Activar",
        toggleDisable: "Desactivar",
      },
      language: {
        title: "Idioma",
        caption: "Selecciona c\u00F3mo se muestran los textos.",
        options: {
          es: "Espa\u00F1ol",
          en: "Ingl\u00E9s",
        },
      },
      session: {
        title: "Sesi\u00F3n",
        caption: "Cierra tu cuenta para cambiar de usuario.",
        logout: "Cerrar sesi\u00F3n",
        loggingOut: "Cerrando sesi\u00F3n...",
      },
      loadError: "Error al cargar la p\u00E1gina de configuraci\u00F3n",
    },
    home: {
      session: {
        study: "Estudio",
        rest: "Descanso",
      },
      quickDurations: {
        short: "Corto",
        medium: "Medio",
        long: "Largo",
      },
      controls: {
        start: "Iniciar sesi\u00F3n",
        stop: "Detener sesi\u00F3n",
        pause: "Pausar sesi\u00F3n",
        resume: "Reanudar sesi\u00F3n",
        openSettings: "Abrir ajustes",
        closeSettings: "Cerrar ajustes",
      },
      sliders: {
        studyLabel: "Minutos de estudio",
        studyAria: "Minutos de estudio",
        restLabel: "Minutos de descanso",
        restAria: "Minutos de descanso",
      },
      tasks: {
        title: "Tareas",
        placeholder: "Nombre de la tarea",
        add: "Agregar",
      },
      catAlt: "gato estudioso",
    },
    calendar: {
      title: "Calendario",
      days: ["Lunes", "Martes", "Mi\u00E9rcoles", "Jueves", "Viernes", "S\u00E1bado", "Domingo"],
      hours: [
        "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
      ],
      schedule: {
        Lunes: { "7:00": ["Gimnasio"], "10:00": ["Trabajo de estructuras"], "11:00": [], "20:00": ["Aprender Next.js"] },
        Martes: { "8:00": ["Estudiar contabilidad"] },
        Mi\u00E9rcoles: { "9:00": ["Doctor"], "11:00": ["Avanzar proyecto de plataformas"] },
        Jueves: { "13:00": [] },
        Viernes: { "10:00": ["F\u00FAtbol"] },
        S\u00E1bado: { "15:00": ["Salida con amigos"] },
        Domingo: { "12:00": ["Almuerzo con la familia"] },
      },
    },
    shop: {
      catAlt: "gato con almohadilla",
      hatFallback: "sombrero",
      accessoryFallback: "accesorio",
      itemList: {
        loadError: "Error al cargar los \u00EDtems",
        viewItem: "Ver {name}",
      },
      drawer: {
        closeAria: "Cerrar",
        loading: "Cargando\u2026",
        yourCoinsLabel: "Tus monedas",
        typeLabel: "Tipo",
        qualityLabel: "Calidad",
        priceLabel: "Precio",
        insufficientCoins: "No tienes suficientes monedas.",
        buyLabel: "Comprar por {price} \u{1F345}",
        equipLabel: "Equipar",
        buyBusyLabel: "Comprando\u2026",
        equipBusyLabel: "Equipando\u2026",
        buyCta: "comprar",
        equipCta: "equipar",
        messages: {
          loadError: "Error al cargar el \u00EDtem",
          detailError: "Error al cargar el detalle del \u00EDtem",
          missingItem: "Falta informaci\u00F3n del \u00EDtem",
          purchaseFailed: "No se pudo comprar",
          equipFailed: "No se pudo equipar",
          purchased: "\u00A1Comprado! Ahora puedes equiparlo.",
          equipped: "\u00A1Equipado!",
        },
      },
      catalog: {
        names: {
          "tabby cat": "Gato atigrado",
          "cow cat": "Gato vaca",
          "tie": "Corbata",
          "bow tie": "Corbatin",
          "heart collar": "Collar con corazon",
          "tomato collar": "Collar de tomate",
          "earring": "Arete",
          "tomato hat": "Sombrero de tomate",
          "orange tie": "Corbata naranja",
        },
        types: {
          hat: "Sombrero",
          accessory: "Accesorio",
          skin: "Aspecto",
          shirt: "Camisa",
          background: "Fondo",
        },
        qualities: {
          common: "Comun",
          uncommon: "Poco comun",
          rare: "Raro",
          epic: "Epico",
          legendary: "Legendario",
        },
      },
    },
    minutesSlider: {
      labelSuffix: "",
    },
  },
  en: {
    common: {
      coinAlt: "coin",
      navigation: {
        home: "home",
        calendar: "calendar",
        shop: "shop",
        settings: "settings",
      },
      actions: {
        play: "play",
        stop: "stop",
        pause: "pause",
        close: "close",
        settings: "settings",
      },
    },
    settings: {
      header: {
        title: "Settings",
        subtitle: "Customize how the app sounds and supports you.",
      },
      navigation: {
        coinAlt: "coin",
      },
      audio: {
        title: "Audio",
        caption: "Adjust each track to match your preference.",
        controls: {
          music: {
            label: "Music",
            hint: "Background melodies during your sessions.",
          },
          sfx: {
            label: "SFX",
            hint: "Sound effects.",
          },
        },
        toggleEnable: "Enable",
        toggleDisable: "Disable",
      },
      language: {
        title: "Language",
        caption: "Choose how the texts are displayed.",
        options: {
          es: "Spanish",
          en: "English",
        },
      },
      session: {
        title: "Session",
        caption: "Sign out of your account to switch users.",
        logout: "Log out",
        loggingOut: "Logging out...",
      },
      loadError: "Error loading the settings page",
    },
    home: {
      session: {
        study: "Study",
        rest: "Rest",
      },
      quickDurations: {
        short: "Short",
        medium: "Medium",
        long: "Long",
      },
      controls: {
        start: "Start session",
        stop: "Stop session",
        pause: "Pause session",
        resume: "Resume session",
        openSettings: "Open settings",
        closeSettings: "Close settings",
      },
      sliders: {
        studyLabel: "Study minutes",
        studyAria: "Study minutes",
        restLabel: "Rest minutes",
        restAria: "Rest minutes",
      },
      tasks: {
        title: "Tasks",
        placeholder: "Task name",
        add: "Add",
      },
      catAlt: "studious cat",
    },
    calendar: {
      title: "Calendar",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      hours: [
        "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
      ],
      schedule: {
        Monday: { "7:00": ["Gym"], "10:00": ["Structures work"], "11:00": [], "20:00": ["Learn Next.js"] },
        Tuesday: { "8:00": ["Study accounting"] },
        Wednesday: { "9:00": ["Doctor"], "11:00": ["Advance platforms project"] },
        Thursday: { "13:00": [] },
        Friday: { "10:00": ["Soccer"] },
        Saturday: { "15:00": ["Hang out with friends"] },
        Sunday: { "12:00": ["Lunch with family"] },
      },
    },
    shop: {
      catAlt: "cat with pad",
      hatFallback: "hat",
      accessoryFallback: "accessory",
      itemList: {
        loadError: "Error loading items",
        viewItem: "View {name}",
      },
      drawer: {
        closeAria: "Close",
        loading: "Loading\u2026",
        yourCoinsLabel: "Your coins",
        typeLabel: "Type",
        qualityLabel: "Quality",
        priceLabel: "Price",
        insufficientCoins: "You do not have enough coins.",
        buyLabel: "Buy for {price} \u{1F345}",
        equipLabel: "Equip",
        buyBusyLabel: "Buying\u2026",
        equipBusyLabel: "Equipping\u2026",
        buyCta: "buy",
        equipCta: "equip",
        messages: {
          loadError: "Unable to load the item",
          detailError: "Unable to load the item details",
          missingItem: "Item information is missing",
          purchaseFailed: "Unable to purchase",
          equipFailed: "Unable to equip",
          purchased: "Purchased! You can equip it now.",
          equipped: "Equipped!",
        },
      },
      catalog: {
        names: {
          "tabby cat": "Tabby cat",
          "cow cat": "Cow cat",
          "tie": "Tie",
          "bow tie": "Bow tie",
          "heart collar": "Heart collar",
          "tomato collar": "Tomato collar",
          "earring": "Earring",
          "tomato hat": "Tomato hat",
          "orange tie": "Orange tie",
        },
        types: {
          hat: "Hat",
          accessory: "Accessory",
          skin: "Skin",
          shirt: "Shirt",
          background: "Background",
        },
        qualities: {
          common: "Common",
          uncommon: "Uncommon",
          rare: "Rare",
          epic: "Epic",
          legendary: "Legendary",
        },
      },
    },
    minutesSlider: {
      labelSuffix: "",
    },
  },
};
