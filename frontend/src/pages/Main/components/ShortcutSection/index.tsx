import { ShortcutContainer } from '../../MainStyle';
import { ShortcutItem } from './ShortcutItem';
import { SHORTCUT_LINKS } from '../../constants';

export const ShortcutSection = () => {
  return (
    <ShortcutContainer>
      {SHORTCUT_LINKS.map((link) => (
        <ShortcutItem key={link.title} item={link} />
      ))}
    </ShortcutContainer>
  );
};
