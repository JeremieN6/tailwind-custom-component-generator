import { defineStore } from 'pinia';
const LS_KEY = 'tbuilder:v2:theme';
const defaultTheme = {
    colors: {
        primary: '#3b82f6',
        secondary: '#64748b',
        accent: '#f59e0b',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#06b6d4',
        bg: '#ffffff',
        surface: '#f8fafc',
        surfaceSoft: '#f1f5f9',
        surfaceSofter: '#e2e8f0',
        text: '#0f172a',
        muted: '#6b7280',
    },
    radii: {
        sm: '0.125rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
    },
    fonts: {
        title: "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
        body: "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
        mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    }
};
export const useThemeStore = defineStore('theme', {
    state: () => ({
        tokens: { ...defaultTheme },
    }),
    actions: {
        load() {
            try {
                const raw = localStorage.getItem(LS_KEY);
                if (raw)
                    this.tokens = { ...defaultTheme, ...JSON.parse(raw) };
            }
            catch { }
        },
        save() {
            try {
                localStorage.setItem(LS_KEY, JSON.stringify(this.tokens));
            }
            catch { }
        },
        set(key, value) {
            // @ts-ignore
            this.tokens[key] = value;
            this.save();
        },
        setColor(name, value) {
            this.tokens.colors[name] = value;
            this.save();
        },
        setFont(name, value) {
            this.tokens.fonts[name] = value;
            this.save();
        },
        setRadius(name, value) {
            this.tokens.radii[name] = value;
            this.save();
        }
    },
});
export function themeVariablesStyle(tokens) {
    return `:root{\n`
        + `--twb-color-primary:${tokens.colors.primary};\n`
        + `--twb-color-secondary:${tokens.colors.secondary};\n`
        + `--twb-color-accent:${tokens.colors.accent};\n`
        + `--twb-color-success:${tokens.colors.success};\n`
        + `--twb-color-warning:${tokens.colors.warning};\n`
        + `--twb-color-error:${tokens.colors.error};\n`
        + `--twb-color-info:${tokens.colors.info};\n`
        + `--twb-color-bg:${tokens.colors.bg};\n`
        + `--twb-color-surface:${tokens.colors.surface};\n`
        + `--twb-color-surface-soft:${tokens.colors.surfaceSoft};\n`
        + `--twb-color-surface-softer:${tokens.colors.surfaceSofter};\n`
        + `--twb-color-text:${tokens.colors.text};\n`
        + `--twb-color-muted:${tokens.colors.muted};\n`
        + `--twb-radius-sm:${tokens.radii.sm};\n`
        + `--twb-radius-md:${tokens.radii.md};\n`
        + `--twb-radius-lg:${tokens.radii.lg};\n`
        + `--twb-radius-xl:${tokens.radii.xl};\n`
        + `--twb-radius-full:${tokens.radii.full};\n`
        + `--twb-font-title:${tokens.fonts.title};\n`
        + `--twb-font-body:${tokens.fonts.body};\n`
        + `--twb-font-mono:${tokens.fonts.mono};\n`
        + `}`;
}
