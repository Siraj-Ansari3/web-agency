// techIcons.js
import { FaReact, FaNodeJs, FaJs, FaHtml5, FaCss3Alt, FaAngular, FaJava, FaPhp, FaLaravel, FaGitAlt, FaGithub, FaAws, FaCode } from "react-icons/fa";
import { SiExpress, SiMongodb, SiRedux, SiNextdotjs, SiTypescript, SiTailwindcss, SiSass, SiBootstrap, SiJquery, SiVuedotjs, SiSvelte, SiNuxtdotjs, SiGatsby, SiDjango, SiFlask, SiSpring, SiPython, SiGo, SiRust, SiCplusplus, SiC, SiKotlin, SiSwift, SiDart, SiFlutter, SiAndroid, SiApple, SiMysql, SiPostgresql, SiSqlite, SiFirebase, SiSupabase, SiRedis, SiGraphql, SiDocker, SiKubernetes, SiHeroku, SiVercel, SiNetlify, SiGitlab, SiNpm, SiYarn, SiPnpm, SiWebpack, SiBabel, SiJest, SiMocha, SiStorybook, SiFigma, SiAdobexd, SiAdobephotoshop, SiAdobeillustrator, SiCypress, SiSelenium, SiTestinglibrary, SiWordpress, SiStrapi, SiContentful, SiSanity, SiJekyll, SiEleventy, SiAstro, SiElectron, SiSocketdotio, SiRuby, SiRubyonrails } from "react-icons/si";

const techIcons = {
  // JavaScript Ecosystem
  "react": FaReact,
  "react.js": FaReact,
  "node": FaNodeJs,
  "node.js": FaNodeJs,
  "nodejs": FaNodeJs,
  "express": SiExpress,
  "express.js": SiExpress,
  "mongodb": SiMongodb,
  "mongoose": SiMongodb,
  "redux": SiRedux,
  "next.js": SiNextdotjs,
  "nextjs": SiNextdotjs,
  "typescript": SiTypescript,
  "javascript": FaJs,
  "js": FaJs,
  // Frontend
  "html": FaHtml5,
  "html5": FaHtml5,
  "css": FaCss3Alt,
  "css3": FaCss3Alt,
  "tailwind": SiTailwindcss,
  "tailwind css": SiTailwindcss,
  "tailwindcss": SiTailwindcss,
  "sass": SiSass,
  "scss": SiSass,
  "bootstrap": SiBootstrap,
  "jquery": SiJquery,
  // Frameworks
  "angular": FaAngular,
  "angular.js": FaAngular,
  "vue": SiVuedotjs,
  "vue.js": SiVuedotjs,
  "vuejs": SiVuedotjs,
  "svelte": SiSvelte,
  "nuxt": SiNuxtdotjs,
  "gatsby": SiGatsby,
  // Backend
  "django": SiDjango,
  "flask": SiFlask,
  "laravel": FaLaravel,
  "php": FaPhp,
  "ruby": SiRuby,
  "ruby on rails": SiRubyonrails,
  "rails": SiRubyonrails,
  "java": FaJava,
  "spring": SiSpring,
  "python": SiPython,
  "go": SiGo,
  "golang": SiGo,
  "rust": SiRust,
  "c#": FaCode,
  "csharp": FaCode,
  "c++": SiCplusplus,
  "cpp": SiCplusplus,
  "c": SiC,
  "kotlin": SiKotlin,
  "swift": SiSwift,
  "dart": SiDart,
  // Databases
  "mysql": SiMysql,
  "postgresql": SiPostgresql,
  "postgres": SiPostgresql,
  "sqlite": SiSqlite,
  "firebase": SiFirebase,
  "supabase": SiSupabase,
  "redis": SiRedis,
  "graphql": SiGraphql,
  // DevOps & Cloud
  "docker": SiDocker,
  "kubernetes": SiKubernetes,
  "aws": FaAws,
  "heroku": SiHeroku,
  "vercel": SiVercel,
  "netlify": SiNetlify,
  // Tools
  "git": FaGitAlt,
  "github": FaGithub,
  "gitlab": SiGitlab,
  "npm": SiNpm,
  "yarn": SiYarn,
  "pnpm": SiPnpm,
  "webpack": SiWebpack,
  "babel": SiBabel,
  "jest": SiJest,
  "mocha": SiMocha,
  "storybook": SiStorybook,
  // CMS
  "wordpress": SiWordpress,
  "strapi": SiStrapi,
  "contentful": SiContentful,
  "sanity": SiSanity,
  // Static Site Generators
  "gatsby": SiGatsby,
  "jekyll": SiJekyll,
  "eleventy": SiEleventy,
  "astro": SiAstro,
  // Other
  "electron": SiElectron,
  "socket.io": SiSocketdotio,
};

const colorClasses = {
  react: "text-blue-500",
  "react.js": "text-blue-500",
  node: "text-green-600",
  "node.js": "text-green-600",
  nodejs: "text-green-600",
  express: "text-gray-300",
  "express.js": "text-gray-300",
  mongodb: "text-green-700",
  mongoose: "text-green-700",
  redux: "text-purple-500",
  "next.js": "text-black dark:text-white",
  nextjs: "text-black dark:text-white",
  typescript: "text-blue-600",
  javascript: "text-yellow-400",
  js: "text-yellow-400",
  html: "text-orange-500",
  html5: "text-orange-500",
  css: "text-blue-400",
  css3: "text-blue-400",
  tailwind: "text-cyan-400",
  "tailwind css": "text-cyan-400",
  tailwindcss: "text-cyan-400",
  sass: "text-pink-400",
  scss: "text-pink-400",
  bootstrap: "text-purple-600",
  jquery: "text-blue-400",
  angular: "text-red-600",
  "angular.js": "text-red-600",
  vue: "text-green-400",
  "vue.js": "text-green-400",
  vuejs: "text-green-400",
  svelte: "text-orange-500",
  nuxt: "text-green-500",
  gatsby: "text-purple-500",
  django: "text-green-800",
  flask: "text-gray-300",
  laravel: "text-red-500",
  php: "text-indigo-400",
  ruby: "text-red-400",
  "ruby on rails": "text-red-500",
  rails: "text-red-500",
  java: "text-red-700",
  spring: "text-green-500",
  python: "text-blue-400",
  go: "text-cyan-500",
  golang: "text-cyan-500",
  rust: "text-orange-600",
  "c#": "text-green-700",
  csharp: "text-green-700",
  "c++": "text-blue-500",
  cpp: "text-blue-500",
  c: "text-blue-600",
  kotlin: "text-purple-400",
  swift: "text-orange-400",
  dart: "text-blue-500",
  flutter: "text-blue-400",
  "react native": "text-blue-500",
  android: "text-green-500",
  ios: "text-gray-300",
  mysql: "text-blue-700",
  postgresql: "text-blue-500",
  postgres: "text-blue-500",
  sqlite: "text-blue-300",
  firebase: "text-yellow-500",
  supabase: "text-green-500",
  redis: "text-red-600",
  graphql: "text-pink-500",
  docker: "text-blue-400",
  kubernetes: "text-blue-500",
  aws: "text-yellow-600",
  azure: "text-blue-500",
  gcp: "text-blue-400",
  heroku: "text-purple-500",
  vercel: "text-black dark:text-white",
  netlify: "text-teal-400",
  git: "text-orange-600",
  github: "text-gray-300",
  gitlab: "text-orange-500",
  npm: "text-red-500",
  yarn: "text-blue-500",
  pnpm: "text-yellow-500",
  webpack: "text-blue-500",
  babel: "text-yellow-500",
  jest: "text-red-500",
  mocha: "text-brown-500",
  storybook: "text-pink-500",
  figma: "text-purple-500",
  xd: "text-pink-500",
  photoshop: "text-blue-500",
  illustrator: "text-orange-500",
  cypress: "text-gray-300",
  selenium: "text-green-500",
  "testing library": "text-red-500",
  wordpress: "text-blue-500",
  strapi: "text-purple-500",
  contentful: "text-blue-500",
  sanity: "text-pink-500",
  jekyll: "text-red-500",
  eleventy: "text-black dark:text-white",
  astro: "text-orange-500",
  electron: "text-blue-400",
  "socket.io": "text-black dark:text-white",
  "three.js": "text-black dark:text-white",
  "p5.js": "text-pink-500",
  "d3.js": "text-orange-500",
};

export function getTechIcon(name) {
  const key = name.trim().toLowerCase();
  const Icon = techIcons[key];
  const colorClass = colorClasses[key] || "";
  return Icon ? <Icon className={colorClass + " text-4xl sm:text-5xl"} /> : null;
} 