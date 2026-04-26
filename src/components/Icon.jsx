import React, { memo } from "react";
import {
  AlertCircle,
  ArrowLeft,
  Award,
  Bell,
  BellOff,
  Camera,
  Check,
  CheckCheck,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Clock,
  Droplets,
  ExternalLink,
  Eye,
  EyeOff,
  Gift,
  HelpCircle,
  Home,
  Info,
  Layers,
  List,
  Loader2,
  Lock,
  LogIn,
  LogOut,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Package,
  Palette,
  Phone,
  Plus,
  Shield,
  ShoppingCart,
  Tag,
  Trash2,
  User,
  UserPlus,
} from "lucide-react";

const ICON_MAP = {
  "alert-circle": AlertCircle,
  "arrow-left": ArrowLeft,
  award: Award,
  bell: Bell,
  "bell-off": BellOff,
  camera: Camera,
  check: Check,
  "check-check": CheckCheck,
  "check-circle": CheckCircle,
  "chevron-down": ChevronDown,
  "chevron-right": ChevronRight,
  "chevron-up": ChevronUp,
  clock: Clock,
  droplets: Droplets,
  "external-link": ExternalLink,
  eye: Eye,
  "eye-off": EyeOff,
  gift: Gift,
  "help-circle": HelpCircle,
  home: Home,
  info: Info,
  instagram: Camera,
  layers: Layers,
  list: List,
  "loader-2": Loader2,
  lock: Lock,
  "log-in": LogIn,
  "log-out": LogOut,
  mail: Mail,
  "map-pin": MapPin,
  menu: Menu,
  "message-circle": MessageCircle,
  package: Package,
  palette: Palette,
  phone: Phone,
  plus: Plus,
  shield: Shield,
  "shopping-cart": ShoppingCart,
  tag: Tag,
  "trash-2": Trash2,
  user: User,
  "user-plus": UserPlus,
};

const Icon = memo(function Icon({
  name,
  size = 20,
  className = "",
  style = {},
}) {
  const LucideIcon = ICON_MAP[name];
  if (!LucideIcon) {
    if (import.meta.env.DEV)
      console.warn(`[Icon] Ícone não mapeado: "${name}"`);
    return (
      <span
        style={{
          width: size,
          height: size,
          display: "inline-block",
          background: "#f87171",
          borderRadius: 3,
          flexShrink: 0,
          ...style,
        }}
        title={`Ícone ausente: ${name}`}
        aria-hidden="true"
      />
    );
  }
  return (
    <LucideIcon
      size={size}
      className={className}
      style={style}
      aria-hidden="true"
    />
  );
});

export default Icon;
