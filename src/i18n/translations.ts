export type Lang = 'pl' | 'en'

export type TranslationKey = keyof typeof translations.pl

export const translations = {
  pl: {
    'meta.title': 'Idzi Łopatniuk – Analityk danych',
    'nav.about': 'O mnie',
    'nav.experience': 'Doświadczenie',
    'nav.projects': 'Projekty',
    'nav.education': 'Wykształcenie',
    'nav.certificates': 'Certyfikaty',
    'nav.skills': 'Umiejętności',
    'nav.aria': 'Nawigacja po stronie',
    'nav.aria_to_en': 'Przełącz na angielski',
    'nav.aria_to_pl': 'Przełącz na polski',
    'hero.role': 'Analityk danych',
    location: 'Gdynia, Polska',
    'hero.phone': '+48 532 076 153',
    'hero.email': 'idzi.lopatniuk@gmail.com',
    'hero.phone_aria': 'Zadzwoń',
    'hero.email_aria': 'Napisz e-mail',
    'skill.etl': 'ETL',
    'skill.validation': 'Walidacja danych',
    'skill.eda': 'Analiza eksploracyjna',
    'skill.regression': 'Regresja',
    'skill.inference': 'Wnioskowanie statystyczne',
    'skill.timeseries': 'Analiza szeregów czasowych',
    'skill.multivariate': 'Analiza wielowymiarowa',
    'skill.viz': 'Wizualizacja wyników',
    'cert.powerbi.title': 'Power BI',
    'cert.powerbi.org': 'Santander Open Academy',
    'cert.ids.title': 'Introduction to Data Science',
    'cert.ids.org': 'Santander Open Academy',
    'cert.dt.title': 'Digital Transformation',
    'cert.dt.org': 'Santander Open Academy',
    'cert.english.title': 'Angielski C1',
    'cert.english.org': 'Uniwersytet Gdański',
    'cert.aif.title': 'AI Fundamentals',
    'cert.aif.org': 'DataCamp',
    'section.about': 'O mnie',
    'section.experience': 'Doświadczenie',
    'section.projects_selected': 'Wybrane projekty',
    'projects.scroll_hint': 'Przewiń, aby przeglądać →',
    'section.education': 'Wykształcenie',
    'section.certificates': 'Certyfikaty',
    'section.skills': 'Umiejętności',
    'skills.stack': 'Stack',
    'skills.analytics': 'Analityka',
    'cert.open': 'Otwórz PDF',
    'about.text':
      'Student studiów magisterskich na kierunku Informatyka i Ekonometria (specjalizacja Big Data) na Uniwersytecie Gdańskim, absolwent Modelowania Matematycznego i Analizy Danych. W pracy z danymi przechodzę pełny proces analityczny — ETL, czyszczenie, walidację, analizę i wizualizację — z wykorzystaniem SQL, MS Excel (Power Query), Power BI, Pythona i R. Podczas stażu w Dziale Rozwoju Systemów Giełdowych na Giełdzie Papierów Wartościowych w Warszawie (projekt WATS) pracowałem z danymi rynkowymi, weryfikacją jakości danych i analizą procesów operacyjnych. Stawiam na dokładność, przejrzyste wnioski i analizy, które da się obronić — od jakości danych po ostateczny raport.',
    'exp1.title': 'Stażysta w Dziale Rozwoju Systemów Giełdowych',
    'exp1.org': 'Giełda Papierów Wartościowych w Warszawie · projekt GPW WATS',
    'exp1.b1': 'Pozyskiwanie, czyszczenie i strukturyzacja danych rynkowych.',
    'exp1.b2': 'Weryfikacja jakości danych i poprawności zapisów w aplikacji STORK.',
    'exp1.b3': 'Analiza i parametryzacja alertów nadzorczych.',
    'exp1.b4': 'Analiza procesów rozliczeniowych na rynkach europejskich.',
    'exp1.badge': 'Staż',
    'proj1.title': 'Opóźnienia lotów USA',
    'proj1.sub': 'Power BI · Tableau · DAX · model gwiazdy',
    'proj1.p1':
      'Analiza 5,8 mln lotów krajowych w USA (2015, BTS/Kaggle) w dwóch narzędziach BI: w Power BI zbudowałem model gwiazdy z role-playing dimensions dla lotnisk odlotu i przylotu, w Tableau — logiczną warstwę relacji bez sztywnego joinowania.',
    'proj1.p2':
      'Dashboardy obejmują punktualność wg standardu BTS (≤15 min), rankingi Top N lotnisk, stanów i tras, parametry What-If (próg opóźnienia, typ odlotów/przylotów) oraz dekompozycję przyczyn opóźnień (linia lotnicza, pogoda, system, samolot). Projekt zawiera audyt jakości danych i zestaw miar DAX.',
    'proj5.title': 'Analiza danych w ubezpieczeniach',
    'proj5.sub': 'Aktuariat · Python · tablice życia',
    'proj5.p1':
      'Model aktuarialny na tablicach trwania życia 2019: wyznaczenie dystrybuanty śmiertelności oraz symulacja dożywotniego ubezpieczenia na życie dla kobiety w wieku 80 lat.',
    'proj5.p2':
      'W Pythonie zaimplementowałem funkcje składek netto (A¹), składek aktuarialnych (ä̈¹) i rezerwy składek przy i = 7% i sumie ubezpieczenia 250 tys. zł — z wizualizacją dystrybuanty i tabelą wyników w raporcie.',
    'tag.actuarial': 'Aktuariat',
    'proj6.title': 'NASA NEO — klasyfikacja asteroid',
    'proj6.sub': 'Regresja logistyczna · LASSO · PCR · R',
    'proj6.p1':
      'Analiza ~90 tys. obiektów Near Earth Objects z NASA: klasyfikacja hazardous vs non-hazardous po balansowaniu klas i standaryzacji cech (średnica, prędkość, odległość, jasność).',
    'proj6.p2':
      'Porównałem regresję logistyczną, LASSO i PCR — najwyższe accuracy LASSO (86,2%), najwyższa sensitivity PCR (98,8%). Pełna EDA, macierze pomyłek i raport z interpretacją modeli.',
    'proj7.title': 'Klasyfikacja cukrzycy — Indian Pima',
    'proj7.sub': 'R · regresja logistyczna · KNN · drzewa decyzyjne',
    'proj7.p1':
      'Projekt z Pracowni Analizy Danych (licencjat): klasyfikacja binarna cukrzycy na zbiorze Pima Indians (768 obserwacji). Współautor: Maksym Dunajewski.',
    'proj7.p2':
      'Porównałem trzy modele — KNN (~78% accuracy), drzewo decyzyjne i regresję logistyczną. Pełna EDA, dobór zmiennych, optymalizacja hiperparametrów i raport z macierzami pomyłek.',
    'proj2.sub': 'Analiza wielowymiarowa · R · BDL',
    'proj2.p1':
      'Porównanie 16 województw Polski na podstawie 22 wskaźników społeczno-ekonomicznych z Banku Danych Lokalnych GUS (rok 2024): rynek pracy, inwestycje, mieszkalnictwo, edukacja, B+R i infrastruktura.',
    'proj2.p2':
      'W R zaimplementowałem pełny pipeline: analiza wstępna i diagnostyka zmiennych, PCA, selekcję Hellwiga, grupowanie hierarchiczne i k-means, rankingi TOPSIS/COPRAS oraz analizę kanoniczną. Wyniki zapisane jako tabele i wykresy w raporcie końcowym.',
    'proj3.title': 'Analiza statystyk NBA',
    'proj3.sub': 'End-to-End Analytics · R',
    'proj3.p1':
      'Projekt end-to-end w R: pozyskanie danych o zawodnikach i meczach NBA, czyszczenie, walidacja spójności oraz przygotowanie zestawu pod analizę statystyczną.',
    'proj3.p2':
      'Wykonałem analizę eksploracyjną kluczowych metryk, modele regresyjne wyjaśniające zależności między statystykami a wynikami oraz wizualizacje podsumowujące wnioski — od surowych danych po czytelny raport analityczny.',
    'proj4.p1':
      'System do transmisji pokera na żywo: rozpoznawanie kart i stanu stołu z obrazu wideo w czasie rzeczywistym z wykorzystaniem OpenCV i modeli PyTorch.',
    'proj4.p2':
      'Obejmuje pipeline przetwarzania strumienia, walidację poprawności odczytów, agregację statystyk rozdania i prezentację wyników na żywo — z naciskiem na niezawodność danych przy dynamicznym wejściu wizualnym.',
    'tag.validation': 'Walidacja',
    'edu1.title': 'Studia magisterskie',
    'edu1.org': '2025 – obecnie · Uniwersytet Gdański',
    'edu1.desc': 'Informatyka i Ekonometria<br>Specjalizacja: Big Data',
    'edu2.title': 'Studia licencjackie',
    'edu2.org': '2022 – 2025 · Uniwersytet Gdański',
    'edu2.desc': 'Modelowanie Matematyczne<br>i Analiza Danych',
    'footer.rodo':
      'Wyrażam zgodę na przetwarzanie moich danych osobowych dla potrzeb procesu rekrutacji zgodnie z RODO (UE 2016/679).',
  },
  en: {
    'meta.title': 'Idzi Łopatniuk – Data Analyst',
    'nav.about': 'About',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.education': 'Education',
    'nav.certificates': 'Certificates',
    'nav.skills': 'Skills',
    'nav.aria': 'Site navigation',
    'nav.aria_to_en': 'Switch to English',
    'nav.aria_to_pl': 'Switch to Polish',
    'hero.role': 'Data Analyst',
    location: 'Gdynia, Poland',
    'hero.phone': '+48 532 076 153',
    'hero.email': 'idzi.lopatniuk@gmail.com',
    'hero.phone_aria': 'Call',
    'hero.email_aria': 'Send email',
    'skill.etl': 'ETL',
    'skill.validation': 'Data validation',
    'skill.eda': 'Exploratory analysis',
    'skill.regression': 'Regression',
    'skill.inference': 'Statistical inference',
    'skill.timeseries': 'Time series analysis',
    'skill.multivariate': 'Multivariate analysis',
    'skill.viz': 'Data visualization',
    'cert.powerbi.title': 'Power BI',
    'cert.powerbi.org': 'Santander Open Academy',
    'cert.ids.title': 'Introduction to Data Science',
    'cert.ids.org': 'Santander Open Academy',
    'cert.dt.title': 'Digital Transformation',
    'cert.dt.org': 'Santander Open Academy',
    'cert.english.title': 'English C1',
    'cert.english.org': 'University of Gdańsk',
    'cert.aif.title': 'AI Fundamentals',
    'cert.aif.org': 'DataCamp',
    'section.about': 'About',
    'section.experience': 'Experience',
    'section.projects_selected': 'Selected Projects',
    'projects.scroll_hint': 'Scroll to explore →',
    'section.education': 'Education',
    'section.certificates': 'Certificates',
    'section.skills': 'Skills',
    'skills.stack': 'Stack',
    'skills.analytics': 'Analytics',
    'cert.open': 'Open PDF',
    'about.text':
      "Master's student in Computer Science and Econometrics (Big Data specialization) at the University of Gdańsk, graduate of Mathematical Modelling and Data Analysis. In my data work I cover the full analytical process — ETL, cleaning, validation, analysis, and visualization — using SQL, MS Excel (Power Query), Power BI, Python, and R. During my internship at the Exchange Systems Development Department of the Warsaw Stock Exchange (WATS project), I worked with market data, data quality verification, and operational process analysis. I focus on accuracy, clear insights, and analyses that hold up — from data quality to the final report.",
    'exp1.title': 'Intern, Exchange Systems Development Department',
    'exp1.org': 'Warsaw Stock Exchange · WATS project',
    'exp1.b1': 'Acquisition, cleaning, and structuring of market data.',
    'exp1.b2': 'Data quality verification and correctness checks in the STORK application.',
    'exp1.b3': 'Analysis and parameterization of supervisory alerts.',
    'exp1.b4': 'Analysis of settlement processes on European markets.',
    'exp1.badge': 'Internship',
    'proj1.title': 'US Flight Delays',
    'proj1.sub': 'Power BI · Tableau · DAX · star schema',
    'proj1.p1':
      'Analysis of 5.8M domestic US flights (2015, BTS/Kaggle) in two BI tools: in Power BI I built a star schema with role-playing dimensions for departure and arrival airports; in Tableau — a logical relationship layer without rigid joins.',
    'proj1.p2':
      'Dashboards cover on-time performance per BTS standard (≤15 min), Top N rankings for airports, states, and routes, What-If parameters (delay threshold, departure/arrival type), and delay cause breakdown (airline, weather, system, aircraft). The project includes a data quality audit and a set of DAX measures.',
    'proj5.title': 'Insurance Data Analysis',
    'proj5.sub': 'Actuarial · Python · life tables',
    'proj5.p1':
      'Actuarial model based on 2019 life tables: mortality distribution function and simulation of whole life insurance for an 80-year-old woman.',
    'proj5.p2':
      'In Python I implemented net premium (A¹), actuarial annuity (ä̈¹), and premium reserve functions at i = 7% and sum insured of PLN 250k — with distribution visualization and results table in the report.',
    'tag.actuarial': 'Actuarial',
    'proj6.title': 'NASA NEO — Asteroid Classification',
    'proj6.sub': 'Logistic regression · LASSO · PCR · R',
    'proj6.p1':
      'Analysis of ~90k NASA Near Earth Objects: hazardous vs non-hazardous classification after class balancing and feature standardization (diameter, velocity, distance, magnitude).',
    'proj6.p2':
      'Compared logistic regression, LASSO, and PCR — highest accuracy with LASSO (86.2%), highest sensitivity with PCR (98.8%). Full EDA, confusion matrices, and model comparison report.',
    'proj7.title': 'Pima Indians Diabetes Classification',
    'proj7.sub': 'R · logistic regression · KNN · decision trees',
    'proj7.p1':
      "Data Analysis Workshop project (bachelor's degree): binary diabetes classification on the Pima Indians dataset (768 observations). Co-authored with Maksym Dunajewski.",
    'proj7.p2':
      'Compared three models — KNN (~78% accuracy), decision tree, and logistic regression. Full EDA, feature selection, hyperparameter tuning, and report with confusion matrices.',
    'proj2.sub': 'Multivariate analysis · R · Local Data Bank',
    'proj2.p1':
      'Comparison of 16 Polish voivodeships based on 22 socio-economic indicators from Statistics Poland Local Data Bank (2024): labour market, investment, housing, education, R&D, and infrastructure.',
    'proj2.p2':
      'In R I implemented a full pipeline: preliminary analysis and variable diagnostics, PCA, Hellwig feature selection, hierarchical clustering and k-means, TOPSIS/COPRAS rankings, and canonical analysis. Results saved as tables and charts in the final report.',
    'proj3.title': 'NBA Statistics Analysis',
    'proj3.sub': 'End-to-End Analytics · R',
    'proj3.p1':
      'End-to-end R project: acquisition of NBA player and game data, cleaning, consistency validation, and dataset preparation for statistical analysis.',
    'proj3.p2':
      'I performed exploratory analysis of key metrics, regression models explaining relationships between statistics and outcomes, and summary visualizations — from raw data to a clear analytical report.',
    'proj4.p1':
      'Live poker broadcast system: real-time recognition of cards and table state from video using OpenCV and PyTorch models.',
    'proj4.p2':
      'Includes stream processing pipeline, read correctness validation, hand statistics aggregation, and live results presentation — with emphasis on data reliability under dynamic visual input.',
    'tag.validation': 'Validation',
    'edu1.title': "Master's degree",
    'edu1.org': '2025 – present · University of Gdańsk',
    'edu1.desc': 'Computer Science and Econometrics<br>Specialization: Big Data',
    'edu2.title': "Bachelor's degree",
    'edu2.org': '2022 – 2025 · University of Gdańsk',
    'edu2.desc': 'Mathematical Modelling<br>and Data Analysis',
    'footer.rodo':
      'I consent to the processing of my personal data for recruitment purposes in accordance with GDPR (EU 2016/679).',
  },
} as const

export const MARQUEE_ITEMS = {
  pl: [
    'SQL',
    'Excel',
    'Power BI',
    'Python',
    'R',
    'Tableau',
    'n8n',
    'Cursor',
    'ETL',
    'EDA',
    'Git',
    'GenAI',
  ],
  en: [
    'SQL',
    'Excel',
    'Power BI',
    'Python',
    'R',
    'Tableau',
    'n8n',
    'Cursor',
    'ETL',
    'EDA',
    'Git',
    'GenAI',
  ],
} as const

export const TOOLS = [
  'SQL',
  'Excel',
  'Power Query',
  'Power BI',
  'Tableau',
  'Python',
  'R',
  'n8n',
  'Cursor',
] as const

export const SKILL_KEYS = [
  'skill.etl',
  'skill.validation',
  'skill.eda',
  'skill.regression',
  'skill.inference',
  'skill.timeseries',
  'skill.multivariate',
  'skill.viz',
] as const satisfies readonly TranslationKey[]

export const CERTIFICATES = [
  {
    id: 'aif',
    date: '07.2026',
    title: 'cert.aif.title',
    org: 'cert.aif.org',
    href: '/certs/datacamp-ai-fundamentals.pdf',
  },
  {
    id: 'powerbi',
    date: '09.2025',
    title: 'cert.powerbi.title',
    org: 'cert.powerbi.org',
  },
  {
    id: 'ids',
    date: '09.2025',
    title: 'cert.ids.title',
    org: 'cert.ids.org',
  },
  {
    id: 'dt',
    date: '09.2025',
    title: 'cert.dt.title',
    org: 'cert.dt.org',
  },
  {
    id: 'english',
    date: '07.2022',
    title: 'cert.english.title',
    org: 'cert.english.org',
  },
] as const satisfies readonly {
  id: string
  date: string
  title: TranslationKey
  org: TranslationKey
  href?: string
}[]

export const EXPERIENCE = [
  {
    date: '08–09.2023',
    title: 'exp1.title',
    org: 'exp1.org',
    bullets: ['exp1.b1', 'exp1.b2', 'exp1.b3', 'exp1.b4'],
  },
] as const satisfies readonly {
  date: string
  title: TranslationKey
  org: TranslationKey
  bullets: readonly TranslationKey[]
}[]

export const PROJECTS: readonly {
  titleKey?: TranslationKey
  title?: string
  subKey?: TranslationKey
  sub?: string
  p1: TranslationKey
  p2: TranslationKey
  tags: readonly (TranslationKey | string)[]
  href: string | null
}[] = [
  {
    titleKey: 'proj6.title',
    subKey: 'proj6.sub',
    p1: 'proj6.p1',
    p2: 'proj6.p2',
    tags: ['R', 'LASSO', 'Klasyfikacja'],
    href: 'https://github.com/idzil/nasa_neo_classification',
  },
  {
    titleKey: 'proj1.title',
    subKey: 'proj1.sub',
    p1: 'proj1.p1',
    p2: 'proj1.p2',
    tags: ['Power BI', 'Tableau', 'DAX'],
    href: 'https://github.com/idzil/opoznienia_lotow_bi',
  },
  {
    titleKey: 'proj5.title',
    subKey: 'proj5.sub',
    p1: 'proj5.p1',
    p2: 'proj5.p2',
    tags: ['Python', 'pandas', 'tag.actuarial'],
    href: 'https://github.com/idzil/ubezpieczenia_aktuarial',
  },
  {
    titleKey: 'proj7.title',
    subKey: 'proj7.sub',
    p1: 'proj7.p1',
    p2: 'proj7.p2',
    tags: ['R', 'KNN', 'Klasyfikacja'],
    href: 'https://github.com/idzil/pima_diabetes_classification',
  },
  {
    title: 'Factory Reset',
    subKey: 'proj2.sub',
    p1: 'proj2.p1',
    p2: 'proj2.p2',
    tags: ['R', 'PCA', 'Clustering'],
    href: 'https://github.com/idzil/factory_reset_wojewodztwa',
  },
  {
    titleKey: 'proj3.title',
    subKey: 'proj3.sub',
    p1: 'proj3.p1',
    p2: 'proj3.p2',
    tags: ['R', 'ETL', 'Regresja'],
    href: 'https://github.com/idzil/nba_stats_analysis',
  },
  {
    title: 'Poker Broadcast System',
    sub: 'Python · OpenCV · PyTorch',
    p1: 'proj4.p1',
    p2: 'proj4.p2',
    tags: ['Python', 'OpenCV', 'tag.validation'],
    href: null,
  },
]
