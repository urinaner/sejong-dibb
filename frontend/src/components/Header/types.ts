export interface MenuItem {
  name: string;
  path: string;
}

export interface NavItemProps {
  title: string;
  path: string;
  menuItems: MenuItem[];
}
