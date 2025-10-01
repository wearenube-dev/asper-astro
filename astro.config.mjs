// @ts-check
import { defineConfig } from 'astro/config';
import dotenv from "dotenv"
import tailwindcss from "@tailwindcss/vite";
import sitemap from '@astrojs/sitemap';
import path from 'path';

import react from '@astrojs/react';

dotenv.config();

// https://astro.build/config
export default defineConfig({
    output: 'static',
    site: 'http://localhost:4321',
    integrations: [sitemap({
        changefreq: "weekly",
        priority:0.7,
    }), react()],
    vite: {
        plugins: [tailwindcss()],
        resolve:{
            alias:{
                '~': path.resolve('./src'),
            }
        }
    },
    image: {
        domains: [''],
    },
});