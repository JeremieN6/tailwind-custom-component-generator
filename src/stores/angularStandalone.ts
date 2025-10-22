export interface AngularStandaloneOptions {
  selector?: string
  componentName?: string
  styles?: string[]
}

// Generate a minimal Angular Standalone Component with inline template
export function generateAngularStandalone(bodyHtml: string, opts: AngularStandaloneOptions = {}): string {
  const selector = opts.selector || 'app-exported-page'
  const className = opts.componentName || 'ExportedPageComponent'
  const styles = opts.styles || []
  const stylesBlock = styles.length
    ? ",\n  styles: [\n" + styles.map(s => `    \`${s}\``).join(',\n') + "\n  ]"
    : ''

  return `import { Component } from '@angular/core';\n\n@Component({\n  selector: '${selector}',\n  standalone: true,\n  template: \`\n${bodyHtml}\n  \`${stylesBlock}\n})\nexport class ${className} { }\n`
}
