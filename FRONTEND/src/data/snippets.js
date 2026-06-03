export const snippets = [
  {
    id: 'neon-red-button',
    title: 'Neon Red Button',
    category: 'Tailwind CSS',
    icon: 'Code2',
    language: 'HTML',
    code: `<button class="px-6 py-2
bg-red-600 text-white
rounded-md font-medium
shadow-[0_0_10px_#ff0000]
hover:shadow-[0_0_20px_#ff0000]">
  Click Me
</button>`,
  },
  {
    id: 'primary-red',
    title: 'Primary Red',
    category: 'Colors',
    icon: 'Palette',
    language: 'CSS',
    code: `/* Primary Red Palette */

--red-50:  #fee2e2;
--red-500: #ef4444;
--red-600: #dc2626;
--red-700: #b91c1c;
--red-900: #7f1d1d;`,
  },
  {
    id: 'star-icon',
    title: 'Star Icon',
    category: 'SVGs',
    icon: 'Star',
    language: 'SVG',
    code: `<svg viewBox="0 0 24 24"
fill="currentColor"
xmlns="http://www.w3.org/2000/svg">
  <path d="M12 17.27L18.18 21l
  -1.64-7.03L22 9.24l-7.19-.61L12
  2 9.19 7.63 2 8.24l5.46 5.73L5.82
  21z"/>
</svg>`,
  },
  {
    id: 'glassmorphism-card',
    title: 'Glassmorphism Card',
    category: 'Tailwind CSS',
    icon: 'Code2',
    featured: true,
    language: 'HTML',
    code: `<div class="backdrop-blur-md
bg-white/10 border border-white/20
rounded-xl p-6 shadow-lg
dark:bg-white/5">
  <h3 class="text-white text-xl
  font-semibold">Card Title</h3>
  <p class="text-gray-300 mt-2">
  This is a glassmorphism card.
  </p>
</div>`,
  },
  {
    id: 'fade-in-up',
    title: 'Fade In Up',
    category: 'Animations',
    icon: 'Zap',
    language: 'CSS',
    code: `@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`,
  },
  {
    id: 'heading-gradient',
    title: 'Heading Gradient',
    category: 'Typography',
    icon: 'Heading1',
    language: 'HTML',
    code: `<h1 class="text-4xl font-bold
bg-gradient-to-r from-red-500
to-red-700 bg-clip-text
text-transparent">
  Bold Gradient Heading
</h1>`,
  },
  {
    id: 'flex-center',
    title: 'Flex Center',
    category: 'Tailwind CSS',
    icon: 'Code2',
    language: 'HTML',
    code: `<div class="flex items-center
justify-center min-h-screen">
  <span class="text-white">
  Centered Content
  </span>
</div>`,
  },
  {
    id: 'dark-neutrals',
    title: 'Dark Neutrals',
    category: 'Colors',
    icon: 'Palette',
    language: 'CSS',
    code: `/* Neutral Gray Scale */

--gray-100: #f3f4f6;
--gray-300: #d1d5db;
--gray-600: #4b5563;
--gray-800: #1f2937;
--gray-950: #0a0a0a;`,
  },
  {
    id: 'hover-slide-right',
    title: 'Hover Slide Right',
    category: 'Tailwind CSS',
    icon: 'Code2',
    language: 'HTML',
    code: `<a class="group inline-flex items-center
text-red-500 transition-transform
duration-300 hover:translate-x-2">
  Read More
  <svg class="w-4 h-4 ml-2 transform
  group-hover:translate-x-1" ...>
  </svg>
</a>`,
  },
  {
    id: 'animated-side-navigation',
    title: 'Animated Side Navigation',
    category: 'Tailwind CSS',
    icon: 'Code2',
    language: 'HTML',
    code: `<nav class="fixed top-0 left-0 h-full w-64
  bg-black border-r border-red-500
  transform -translate-x-full
  transition-transform duration-300 ease-in-out
  data-open='true' class='translate-x-0'">
  <div class="p-6 flex items-center gap-3 mb-10">
    <div class="text-2xl text-red-500">
      <i class="ri-code-s-slash-line"></i>
    </div>
    <span class="text-xl font-bold text-white">
      SNIPPET VAULT
    </span>
  </div>
  <ul class="space-y-2 px-4">
    <li>
      <a href="#" class="flex items-center gap-3
      px-4 py-3 rounded-lg text-gray-300
      hover:bg-red-600 hover:text-white"
      transition-colors">
        <i class="ri-home-5-line"></i>
        <span>Dashboard</span>
      </a>
    </li>
    <!-- More items -->
  </ul>
</nav>`,
  },
];
