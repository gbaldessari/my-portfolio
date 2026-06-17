export interface Project {
  title: string;
  subtitle: string;
  tags: string[];
  description: string;
  image?: string;
}

export const projects: Project[] = [
  {
    title: 'Plataforma de Gestión Operativa La Alpina Park',
    subtitle: 'Ingeniero de software y desarrollador · Proyecto individual · La Alpina Park, pista de motocross',
    tags: ['React', 'TypeScript', 'NestJS', 'MongoDB', 'Vercel', 'Railway'],
    description:
      'Diseñé e implementé de forma integral una aplicación web para la gestión operativa diaria de la pista: administración de pilotos, programación de días de pista, registro de asistencias, cobros y pagos con historial de movimientos, y un panel de control con KPIs y gráficos de deudores y asistencia. Definí la arquitectura del sistema (frontend SPA y backend REST), desarrollé el módulo de administración de usuarios con recuperación de contraseña por correo y desplegué la solución en producción (frontend en <b>Vercel</b> y backend en <b>Railway</b>).',
    image: 'assets/projects/LaAlpinaPark.png',
  },
  {
    title: 'Plataforma de Gestión Comercial Ventas Fama',
    subtitle: 'Ingeniero de software y desarrollador · Práctica Profesional · Ventas Fama, empresa distribuidora',
    tags: ['React', 'TypeScript', 'NestJS', 'MongoDB', 'Google Maps API', 'WhatsApp Cloud API', 'Vercel', 'Railway', 'Resend', 'WooCommerce'],
    description:
      'Diseñé e implementé de forma integral una plataforma web para la gestión comercial y operativa de una empresa distribuidora, orientada a la administración de catálogos de productos y ofertas, geolocalización de clientes y sectores territoriales, captura y validación de datos comerciales, y alertas automáticas de vencimiento de lotes. Definí la arquitectura del sistema (frontend SPA, backend REST y API de integración), implementé autenticación por roles, generación asíncrona de catálogos PDF, carga masiva de datos e integraciones con <b>WhatsApp Cloud API</b> y <b>WooCommerce</b>, y gestioné el despliegue productivo en <b>Vercel</b> y <b>Railway</b>.',
    image: 'assets/projects/VentasFama.png',
  },
  {
    title: 'Plataforma Digital de Captación y Gestión de Leads',
    subtitle: 'Ingeniero de software y desarrollador · Freelance · Laguna Roja (inmobiliaria), Valle del Elqui',
    tags: ['PHP', 'JavaScript', 'NestJS', 'TypeScript', 'MongoDB', 'Kommo', 'Odoo', 'Google Ads API', 'Make', 'Railway', 'Resend', 'Hostinger'],
    description:
      'Diseñé e implementé de forma integral landing pages de captación de leads y una API de integración CRM para proyectos inmobiliarios de parcelas en el Valle del Elqui. Desarrollé sitios orientados a conversión con formularios validados, seguimiento de campañas publicitarias (<b>Google Tag Manager</b>, <b>Meta Pixel</b>) y envío automático de prospectos a <b>Kommo</b> mediante webhooks; además construí una API en <b>NestJS</b> para sincronizar leads Kommo→Odoo con OAuth, jobs programados, mapeo de atributos UTM y registro de conversiones offline en <b>Google Ads</b>. Gestioné el despliegue productivo de la aplicación en <b>Railway</b> con <b>MongoDB</b>.',
    image: 'assets/projects/LagunaRoja.png',
  },
  {
    title: 'Plataforma de Gestión Comercial y Documental ACAMU',
    subtitle: 'Ingeniero de software y desarrollador · Desarrollo individual · ACAMU SAC, Perú',
    tags: ['React', 'TypeScript', 'NestJS', 'MongoDB', 'Vercel', 'Railway', 'Resend'],
    description:
      'Diseñé e implementé de forma integral una plataforma web para centralizar la gestión documental, comercial y operativa de una empresa exportadora de frutas, conectando a administradores, proveedores y clientes en un portal único con trazabilidad por envío. Definí la arquitectura del sistema (frontend SPA y backend REST desacoplados), modelé el dominio de negocio exportador —certificaciones de proveedores y plantas de empaque, órdenes de compra, pagos, documentación de embarque y empresas transportistas— e incorporé control de acceso por roles, carga segura de documentos PDF, recordatorios automáticos de documentación pendiente y notificaciones por correo. Gestioné el despliegue productivo del frontend en <b>Vercel</b> y del backend en <b>Railway</b>.',
    image: 'assets/projects/ACAMU.png',
  },
  {
    title: 'Sistema de Gestión Operativa GP-Performance',
    subtitle: 'Ingeniero de software y desarrollador · Desarrollo individual · GP-Performance, Taller Automotriz',
    tags: ['React', 'TypeScript', 'NestJS', 'PostgreSQL', 'Vercel', 'Railway', 'Resend'],
    description:
      'Diseñé e implementé de forma integral una aplicación web para la gestión operativa y comercial de un taller automotriz, cubriendo el ciclo completo del negocio: clientes y vehículos, órdenes de trabajo con seguimiento de estados, cotizaciones, inventario con control de stock, ventas de productos y servicios, facturación, flujo de caja y comunicaciones con clientes. Definí la arquitectura del sistema (backend REST con <b>NestJS</b> y frontend SPA con <b>React</b>), modelé la base de datos relacional y gestioné el despliegue productivo del frontend en <b>Vercel</b> y del backend en <b>Railway</b>.',
    image: 'assets/projects/GPPerformance.png',
  },
  {
    title: 'Plataforma de Gestión Operativa UOCT',
    subtitle: 'Desarrollador principal y líder técnico · Equipo multidisciplinario · UOCT, Región de Coquimbo',
    tags: ['React', 'TypeScript', 'NestJS', 'PostgreSQL', 'PostGIS', 'Docker', 'Jenkins', 'Linux', 'Resend'],
    description:
      'Lideré el diseño e implementación de una aplicación web para la unidad operativa de control de tránsito de la region de Coquimbo, orientada al reporte georreferenciado de incidentes en vía pública, monitoreo en tiempo real y análisis histórico para la toma de decisiones operativas. Definí la arquitectura del sistema (backend REST/WebSockets y frontend SPA), coordiné al equipo de desarrollo y gestioné el despliegue productivo en infraestructura local de la <b>UOCT</b> mediante <b>Docker Compose</b> y <b>Jenkins</b>.',
    image: 'assets/projects/UOCT.png',
  },
];
