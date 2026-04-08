/**
 * src/components/Icon.jsx
 *
 * MELHORIA 5 (revisão): Imports nomeados diretos em vez de `import *`.
 *
 * Antes: `import * as LucideIcons from 'lucide-react'`
 *   → bundler inclui TODOS os ~1400 ícones (~900KB) pois não consegue
 *     fazer tree-shaking de um acesso dinâmico por chave de objeto.
 *
 * Depois: cada ícone é importado pelo nome exato → Vite/Rollup inclui
 *   apenas os ~35 ícones realmente usados no projeto (~35KB gzip).
 *
 * O mapa ICON_MAP converte kebab-case → componente React, mantendo
 * a API pública `<Icon name="arrow-left" />` idêntica.
 *
 * Para adicionar um novo ícone:
 *   1. Importe-o aqui: import { NomeDoIcone } from 'lucide-react'
 *   2. Adicione ao ICON_MAP: 'nome-do-icone': NomeDoIcone
 */
import React, { memo } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  Award,
  Bell,
  BellOff,
  Camera,         // substitui Instagram (não existe no Lucide)
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
} from 'lucide-react';

// Mapa kebab-case → componente React
// Adicione novos ícones aqui quando precisar
const ICON_MAP = {
  'alert-circle':   AlertCircle,
  'arrow-left':     ArrowLeft,
  'award':          Award,
  'bell':           Bell,
  'bell-off':       BellOff,
  'camera':         Camera,
  'check':          Check,
  'check-check':    CheckCheck,
  'check-circle':   CheckCircle,
  'chevron-down':   ChevronDown,
  'chevron-right':  ChevronRight,
  'chevron-up':     ChevronUp,
  'clock':          Clock,
  'droplets':       Droplets,
  'external-link':  ExternalLink,
  'eye':            Eye,
  'eye-off':        EyeOff,
  'gift':           Gift,
  'help-circle':    HelpCircle,
  'home':           Home,
  'info':           Info,
  'instagram':      Camera,   // alias: Instagram → Camera
  'layers':         Layers,
  'list':           List,
  'loader-2':       Loader2,
  'lock':           Lock,
  'log-in':         LogIn,
  'log-out':        LogOut,
  'mail':           Mail,
  'map-pin':        MapPin,
  'menu':           Menu,
  'message-circle': MessageCircle,
  'package':        Package,
  'palette':        Palette,
  'phone':          Phone,
  'plus':           Plus,
  'shield':         Shield,
  'shopping-cart':  ShoppingCart,
  'tag':            Tag,
  'trash-2':        Trash2,
  'user':           User,
  'user-plus':      UserPlus,
};

const Icon = memo(function Icon({ name, size = 20, className = '', style = {} }) {
  const LucideIcon = ICON_MAP[name];

  if (!LucideIcon) {
    if (import.meta.env.DEV) {
      console.warn(`[Icon] Ícone não mapeado: "${name}". Adicione em ICON_MAP (src/components/Icon.jsx).`);
    }
    // Fallback visual em desenvolvimento: quadrado vermelho
    return (
      <span
        className={className}
        style={{
          width: size, height: size,
          display: 'inline-block',
          background: '#f87171',
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
