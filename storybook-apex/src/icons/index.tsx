import type { CSSProperties, HTMLAttributes } from 'react';

/**
 * Ícones do projeto: Material Symbols (estilo Outlined), servidos localmente por
 * `@material-symbols/font-400` (importado em `.storybook/preview.ts` e no app do produto).
 * Todos os ícones devem ser importados daqui (ou do barrel `src/index.ts`), nunca de outra biblioteca.
 * Para um ícone novo: `export const NomeDoIcone = createIcon('nome_do_simbolo');` (nomes em fonts.google.com/icons).
 */
export interface IconProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
  /** Tamanho em px (padrão 24). */
  size?: number;
  /** Cor (padrão: herda `currentColor`). Prefira um token: `var(--color-text-primary)`. */
  color?: string;
}

export type IconComponent = (props: IconProps) => JSX.Element;

/** Decorativo por padrão (`aria-hidden`); passe `aria-label` + `role="img"` quando o ícone for a única informação. */
export function createIcon(symbol: string): IconComponent {
  function Icon({ size = 24, color, style, className, ...rest }: IconProps) {
    const iconStyle: CSSProperties = {
      fontSize: size,
      width: size,
      height: size,
      lineHeight: 1,
      color,
      flexShrink: 0,
      userSelect: 'none',
      ...style,
    };
    const decorative = rest['aria-label'] === undefined && rest['aria-labelledby'] === undefined;
    return (
      <span
        aria-hidden={decorative ? true : undefined}
        {...rest}
        className={['material-symbols-outlined', className].filter(Boolean).join(' ')}
        style={iconStyle}
      >
        {symbol}
      </span>
    );
  }
  Icon.displayName = `Icon(${symbol})`;
  return Icon;
}

export const Home = createIcon('home');
export const Search = createIcon('search');
export const SearchX = createIcon('search_off');
export const Bell = createIcon('notifications');
export const Settings = createIcon('settings');
export const User = createIcon('person');
export const Users = createIcon('group');
export const Mail = createIcon('mail');
export const Phone = createIcon('call');
export const Camera = createIcon('photo_camera');
export const Heart = createIcon('favorite');
export const Star = createIcon('star');
export const Trash = createIcon('delete');
export const Trash2 = createIcon('delete');
export const Edit = createIcon('edit');
export const Pencil = createIcon('edit');
export const Plus = createIcon('add');
export const Minus = createIcon('remove');
export const X = createIcon('close');
export const Check = createIcon('check');
export const ChevronDown = createIcon('expand_more');
export const ChevronUp = createIcon('expand_less');
export const ChevronLeft = createIcon('chevron_left');
export const ChevronRight = createIcon('chevron_right');
export const ChevronsUpDown = createIcon('unfold_more');
export const ArrowLeft = createIcon('arrow_back');
export const ArrowRight = createIcon('arrow_forward');
export const ArrowUp = createIcon('arrow_upward');
export const ArrowDown = createIcon('arrow_downward');
export const ArrowDownUp = createIcon('swap_vert');
export const Upload = createIcon('upload');
export const Download = createIcon('download');
export const Share = createIcon('share');
export const Copy = createIcon('content_copy');
export const Eye = createIcon('visibility');
export const EyeOff = createIcon('visibility_off');
export const Lock = createIcon('lock');
export const Unlock = createIcon('lock_open');
export const Key = createIcon('key');
export const Shield = createIcon('shield');
export const ShieldCheck = createIcon('verified_user');
export const AlertCircle = createIcon('error');
export const AlertTriangle = createIcon('warning');
export const Info = createIcon('info');
export const CheckCircle = createIcon('check_circle');
export const CircleCheck = createIcon('check_circle');
export const XCircle = createIcon('cancel');
export const CircleX = createIcon('cancel');
export const HelpCircle = createIcon('help');
export const CircleQuestionMark = createIcon('help');
export const Loader = createIcon('progress_activity');
export const RefreshCw = createIcon('refresh');
export const RotateCw = createIcon('rotate_right');
export const FileText = createIcon('description');
export const Folder = createIcon('folder');
export const FolderOpen = createIcon('folder_open');
export const Image = createIcon('image');
export const ImageIcon = createIcon('image');
export const ImagePlus = createIcon('add_photo_alternate');
export const Music = createIcon('music_note');
export const Video = createIcon('videocam');
export const File = createIcon('draft');
export const Calendar = createIcon('calendar_month');
export const Clock = createIcon('schedule');
export const MapPin = createIcon('location_on');
export const Globe = createIcon('language');
export const Wifi = createIcon('wifi');
export const Battery = createIcon('battery_full');
export const Bluetooth = createIcon('bluetooth');
export const Sun = createIcon('light_mode');
export const Moon = createIcon('dark_mode');
export const Cloud = createIcon('cloud');
export const Wind = createIcon('air');
export const Zap = createIcon('bolt');
export const Flame = createIcon('local_fire_department');
export const ShoppingCart = createIcon('shopping_cart');
export const CreditCard = createIcon('credit_card');
export const DollarSign = createIcon('attach_money');
export const Package = createIcon('package_2');
export const Tag = createIcon('sell');
export const Tags = createIcon('sell');
export const Bookmark = createIcon('bookmark');
export const MessageCircle = createIcon('chat_bubble');
export const MessageSquare = createIcon('chat');
export const Send = createIcon('send');
export const Inbox = createIcon('inbox');
export const Archive = createIcon('archive');
export const Menu = createIcon('menu');
export const Grid = createIcon('grid_view');
export const List = createIcon('list');
export const Layout = createIcon('view_quilt');
export const Sidebar = createIcon('view_sidebar');
export const Layers = createIcon('layers');
export const Bold = createIcon('format_bold');
export const Italic = createIcon('format_italic');
export const Underline = createIcon('format_underlined');
export const AlignLeft = createIcon('format_align_left');
export const AlignCenter = createIcon('format_align_center');
export const AlignRight = createIcon('format_align_right');
export const Funnel = createIcon('filter_alt');
export const Shirt = createIcon('checkroom');
export const LayoutDashboard = createIcon('dashboard');
export const ChartColumn = createIcon('bar_chart');
export const Receipt = createIcon('receipt_long');
export const LogOut = createIcon('logout');
export const MoreHorizontal = createIcon('more_horiz');
export const Wrench = createIcon('build');
export const Save = createIcon('save');
