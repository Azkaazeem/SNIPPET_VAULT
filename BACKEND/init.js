const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Snippet = require('./models/snippet.js');

dotenv.config();

async function main() {
    await mongoose.connect("mongodb://localhost:27017/snippetDB");
}

let snippets = [
    {
        title: "Neon Red Button",
        category: "Tailwind CSS",
        content: '<button class="px-6 py-2 bg-red-600 text-white rounded-md font-medium shadow-[0_0_10px_#ff0000] hover:shadow-[0_0_20px_#ff0000]"> Click Me </button>'
    },
    {
        title: "Primary Red",
        category: "Colors",
        content: '/* Primary Red Palette */ --red-50:  #fee2e2; --red-500: #ef4444; --red-600: #dc2626; --red-700: #b91c1c; --red-900: #7f1d1d;'
    },
    {
        title: "Flexbox Centering",
        category: "CSS",
        content: '.center-all {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}'
    },
    {
        title: "Gradient Text",
        category: "Tailwind CSS",
        content: '<h1 class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Hello World</h1>'
    },
    {
        title: "Glassmorphism Card",
        category: "CSS",
        content: '.glass {\n  background: rgba(255, 255, 255, 0.2);\n  border-radius: 16px;\n  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);\n  backdrop-filter: blur(5px);\n  -webkit-backdrop-filter: blur(5px);\n  border: 1px solid rgba(255, 255, 255, 0.3);\n}'
    },
    {
        title: "Custom Scrollbar",
        category: "CSS",
        content: '::-webkit-scrollbar {\n  width: 10px;\n}\n::-webkit-scrollbar-track {\n  background: #f1f1f1;\n}\n::-webkit-scrollbar-thumb {\n  background: #888;\n  border-radius: 5px;\n}\n::-webkit-scrollbar-thumb:hover {\n  background: #555;\n}'
    },
    {
        title: "Smooth Scrolling",
        category: "CSS",
        content: 'html {\n  scroll-behavior: smooth;\n}'
    },
    {
        title: "Pulse Animation",
        category: "Tailwind CSS",
        content: '<div class="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>'
    },
    {
        title: "Responsive Video",
        category: "HTML/CSS",
        content: '.video-container {\n  position: relative;\n  padding-bottom: 56.25%; /* 16:9 */\n  height: 0;\n}\n.video-container iframe {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}'
    },
    {
        title: "Card Hover Effect",
        category: "Tailwind CSS",
        content: '<div class="transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl bg-white p-6 rounded-lg">\n  Hover me\n</div>'
    },
    {
        title: "Dark Mode Toggle",
        category: "JavaScript",
        content: 'const toggleDarkMode = () => {\n  document.documentElement.classList.toggle("dark");\n};'
    },
    {
        title: "Hide Scrollbar",
        category: "Tailwind CSS",
        content: '.no-scrollbar::-webkit-scrollbar {\n  display: none;\n}\n.no-scrollbar {\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}'
    }
];

main()
.then(async () => {
    await Snippet.insertMany(snippets);
    console.log("Snippets inserted successfully!");
})
.catch((err) => {console.log(err)})
.finally(() => {
    mongoose.connection.close();
});