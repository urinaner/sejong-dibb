export interface MenuItem {
  name: string;
  path: string;
}

export interface NavItem {
  title: string;
  path: string;
  menuItems: MenuItem[];
}
