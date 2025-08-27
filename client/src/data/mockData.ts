import { User, Permission } from '../types';

export const additionalInfoOptions = [
  'Nie stosować u dzieci, kobiet w ciąży i w trakcie laktacji.',
  '*Korzystne działanie występuje w przypadku spożywania 3 g kreatyny dziennie.',
  'Przechowywać w suchym miejscu w temperaturze pokojowej.',
  'Nie przekraczać zalecanej dziennej porcji.',
  'Suplement diety nie może być stosowany jako substytut zróżnicowanej diety.',
  'W przypadku przyjmowania leków skonsultuj się z lekarzem.',
  'Przechowywać w miejscu niedostępnym dla małych dzieci.',
  '*Pozytywny wpływ występuje przy spożywaniu co najmniej 250 mg DHA dziennie.',
  'Produkt może zawierać śladowe ilości glutenu, soi, jaj i orzechów.',
  'Nie stosować w przypadku alergii na którykolwiek ze składników.',
  'Przed użyciem należy zapoznać się z ulotką.',
  '*Kwas foliowy przyczynia się do prawidłowego rozwoju tkanki matczynej w czasie ciąży.'
];

export const permissions: Permission[] = [
  { id: '1', name: 'dashboard_view', description: 'Dostęp do dashboardu' },
  { id: '2', name: 'users_manage', description: 'Zarządzanie użytkownikami' },
  { id: '3', name: 'products_view', description: 'Przeglądanie produktów' },
  { id: '4', name: 'products_edit', description: 'Edycja produktów' },
  { id: '5', name: 'reports_view', description: 'Dostęp do raportów' },
  { id: '6', name: 'admin_full', description: 'Pełne uprawnienia administratora' }
];

export const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'Jan',
    lastName: 'Kowalski',
    email: 'admin@pim.pl',
    position: 'Administrator',
    password: 'admin123',
    permissions: permissions,
    isActive: true,
    createdAt: '2024-01-15',
    lastLogin: '2024-01-20'
  },
  {
    id: '2',
    firstName: 'Anna',
    lastName: 'Nowak',
    email: 'anna.nowak@pim.pl',
    position: 'Manager Produktów',
    password: 'manager123',
    permissions: [permissions[0], permissions[2], permissions[3], permissions[4]],
    isActive: true,
    createdAt: '2024-01-10',
    lastLogin: '2024-01-19'
  },
  {
    id: '3',
    firstName: 'Piotr',
    lastName: 'Wiśniewski',
    email: 'piotr.wisniewski@pim.pl',
    position: 'Specjalista ds. Produktów',
    password: 'user123',
    permissions: [permissions[0], permissions[2]],
    isActive: true,
    createdAt: '2024-01-08',
    lastLogin: '2024-01-18'
  }
];