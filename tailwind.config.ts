
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				// Bold Contrast Design System Colors
				'bg': 'var(--bg)',
				'fg': 'var(--fg)',
				'muted': 'var(--muted)',
				'muted-2': 'var(--muted-2)',
				'accent': 'var(--accent)',
				'dark-bg': 'var(--dark-bg)',
				'dark-fg': 'var(--dark-fg)',
				'dark-muted': 'var(--dark-muted)',
				
				// Legacy shadcn colors for compatibility
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			fontFamily: {
				// Bold Contrast Typography
				'heading': 'var(--font-heading)',
				'body': 'var(--font-body)',
				// Legacy compatibility
				sans: ['Inter', 'sans-serif'],
				display: ['Space Grotesk', 'sans-serif']
			},
			fontSize: {
				// Bold Contrast Typography Scale
				'h1': ['var(--text-h1-mobile)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
				'h2': ['var(--text-h2-mobile)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
				'h3': ['var(--text-h3-mobile)', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
				'body': ['var(--text-body-mobile)', { lineHeight: '1.6' }],
				'small': ['var(--text-small-mobile)', { lineHeight: '1.5' }],
			},
			spacing: {
				// Bold Contrast Spacing Scale
				'container-mobile': 'var(--container-padding-mobile)',
				'container-desktop': 'var(--container-padding-desktop)',
				'section-mobile': 'var(--section-spacing-mobile)',
				'section-desktop': 'var(--section-spacing-desktop)',
			},
			maxWidth: {
				'container': 'var(--container-max-width)',
			},
			borderRadius: {
				// Bold Contrast Border Radius
				'button': 'var(--button-radius)',
				'card': 'var(--card-radius)',
				// Legacy compatibility
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			height: {
				'input': 'var(--input-height)',
			},
			keyframes: {
				'spray-draw': {
					'0%': { 'stroke-dasharray': '0 100' },
					'100%': { 'stroke-dasharray': '100 0' }
				},
				'fade-in-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				// Legacy shadcn animations
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				}
			},
			animation: {
				'spray-draw': 'spray-draw 200ms ease-out',
				'fade-in-up': 'fade-in-up 0.6s ease-out',
				// Legacy compatibility
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
			screens: {
				'xs': '480px',
			},
			zIndex: {
				'5': '5',
				'15': '15',
				'16': '16',
				'20': '20',
				'30': '30',
				'40': '40',
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		// Custom plugin for Bold Contrast utilities
		function({ addUtilities, theme }: any) {
			const newUtilities = {
				// Typography utilities
				'.text-h1-desktop': {
					fontSize: 'var(--text-h1)',
					lineHeight: '1.1',
					letterSpacing: '-0.01em',
					fontFamily: 'var(--font-heading)',
					fontWeight: '500',
				},
				'.text-h2-desktop': {
					fontSize: 'var(--text-h2)',
					lineHeight: '1.2',
					letterSpacing: '-0.01em',
					fontFamily: 'var(--font-heading)',
					fontWeight: '500',
				},
				'.text-h3-desktop': {
					fontSize: 'var(--text-h3)',
					lineHeight: '1.3',
					letterSpacing: '-0.01em',
					fontFamily: 'var(--font-heading)',
					fontWeight: '500',
				},
				'.text-body-desktop': {
					fontSize: 'var(--text-body)',
					lineHeight: '1.6',
				},
				'.text-small-desktop': {
					fontSize: 'var(--text-small)',
					lineHeight: '1.5',
				},
				// Focus ring utility
				'.focus-ring': {
					'&:focus': {
						outline: 'none',
						boxShadow: `0 0 0 2px var(--accent), 0 0 0 4px rgba(59, 130, 246, 0.2)`,
					}
				}
			}
			addUtilities(newUtilities, ['responsive'])
		}
	],
} satisfies Config;
