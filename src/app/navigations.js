export const navigations = [
  { 
    name: 'Dashboard', 
    path: '/dashboard/default', 
    icon: 'dashboard',
    children: [
      { 
        name: 'Summary',
        path: '/dashboard/test',
        iconText: 'S',
      },
      { 
        name: 'Clubs',
        path: '/dashboard/test',
        iconText: 'C',
      },
      { 
        name: 'Memebers',
        path: '/dashboard/test',
        iconText: 'M',
      },
      { 
        name: 'Events',
        path: '/dashboard/test',
        iconText: 'E',
      },
    ] 
  },
  { label: 'General', type: 'label' },
  {
    name: 'Clubs',
    path: '/test',
    icon: 'home',
  },
  {
    name: 'Memebers',
    path: '/test',
    icon: 'group',
  },
  {
    name: 'Events',
    path: '/test',
    icon: 'event',
  },
  {
    name: 'Finances',
    path: '/finance',
    icon: 'account_balance_wallet',
  },
  { label: 'PAGES', type: 'label' },
  {
    name: 'Session/Auth',
    icon: 'security',
    children: [
      { name: 'Sign in', iconText: 'SI', path: '/session/signin' },
      { name: 'Sign up', iconText: 'SU', path: '/session/signup' },
      { name: 'Forgot Password', iconText: 'FP', path: '/session/forgot-password' },
      { name: 'Error', iconText: '404', path: '/session/404' },
    ],
  },
  { label: 'Components', type: 'label' },
  {
    name: 'Components',
    icon: 'favorite',
    badge: { value: '30+', color: 'secondary' },
    children: [
      { name: 'Auto Complete', path: '/material/autocomplete', iconText: 'A' },
      { name: 'Buttons', path: '/material/buttons', iconText: 'B' },
      { name: 'Checkbox', path: '/material/checkbox', iconText: 'C' },
      { name: 'Dialog', path: '/material/dialog', iconText: 'D' },
      { name: 'Expansion Panel', path: '/material/expansion-panel', iconText: 'E' },
      { name: 'Form', path: '/material/form', iconText: 'F' },
      { name: 'Icons', path: '/material/icons', iconText: 'I' },
      { name: 'Menu', path: '/material/menu', iconText: 'M' },
      { name: 'Progress', path: '/material/progress', iconText: 'P' },
      { name: 'Radio', path: '/material/radio', iconText: 'R' },
      { name: 'Switch', path: '/material/switch', iconText: 'S' },
      { name: 'Slider', path: '/material/slider', iconText: 'S' },
      { name: 'Snackbar', path: '/material/snackbar', iconText: 'S' },
      { name: 'Table', path: '/material/table', iconText: 'T' },
    ],
  },
  {
    name: 'Charts',
    icon: 'trending_up',
    children: [{ name: 'Echarts', path: '/charts/echarts', iconText: 'E' }],
  },
  // {
  //   name: 'Documentation',
  //   icon: 'launch',
  //   type: 'extLink',
  //   path: 'http://demos.ui-lib.com/matx-react-doc/',
  // },
  {
    name: 'LandingPage',
    icon: 'store_front',
    path: '/LandingPage',
  },
];
