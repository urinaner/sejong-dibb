import { Shortcut } from '../../MainStyle';
import { ShortcutItem as ShortcutItemType } from './types';

interface ShortcutItemProps {
  item: ShortcutItemType;
}

export const ShortcutItem = ({ item }: ShortcutItemProps) => {
  return (
    <a href={item.link} target="_blank" rel="noopener noreferrer">
      <Shortcut>
        <img src={item.icon} alt={item.title} />
        {item.title}
      </Shortcut>
    </a>
  );
};
