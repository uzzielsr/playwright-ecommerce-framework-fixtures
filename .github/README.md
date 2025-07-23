# GitHub Actions Workflows

Este directorio contiene todos los workflows de GitHub Actions para el framework de testing de Playwright.

## 📁 Estructura de Workflows

### 🎯 Workflows Principales

#### `playwright-tests.yml` - CI/CD Principal
**Triggers:** Push, PR, Manual
- ✅ Tests paralelos por ambiente y browser
- 🔄 Matrix strategy para escalabilidad
- 📊 Reportes automáticos en PRs
- 🎨 Artifacts con traces y reportes HTML

#### `scheduled-tests.yml` - Tests Programados
**Triggers:** Cron, Manual
- 🌅 Tests diarios de smoke en producción (2:00 AM UTC)
- 📅 Regression completa semanal (Domingos 1:00 AM UTC)
- 🚨 Notificaciones automáticas en fallos
- 📈 Reportes semanales automáticos

#### `performance-tests.yml` - Tests de Performance
**Triggers:** Manual, Semanal (Sábados)
- ⚡ Tests de performance con Playwright
- 🔍 Análisis con Lighthouse
- 📊 Métricas de rendimiento
- 📋 Reportes detallados

#### `security-scan.yml` - Escaneo de Seguridad
**Triggers:** Push, PR, Semanal
- 🛡️ npm audit para vulnerabilidades
- 🔒 CodeQL analysis
- 📋 Reportes de seguridad

## 🚀 Configuración Inicial

### 1. Ejecutar Script de Setup
```bash
./.github/setup-actions.sh
```

### 2. Configurar Secretos Manualmente
Si prefieres configurar los secretos manualmente:

```bash
# Secretos de Producción
gh secret set PROD_TEST_EMAIL --body "your-prod-email@example.com"
gh secret set PROD_TEST_PASSWORD --body "your-secure-password"

# Secretos de QA
gh secret set QA_TEST_EMAIL --body "your-qa-email@example.com" 
gh secret set QA_TEST_PASSWORD --body "your-secure-password"

# Secretos de UAT
gh secret set UAT_TEST_EMAIL --body "your-uat-email@example.com"
gh secret set UAT_TEST_PASSWORD --body "your-secure-password"

# Notificaciones (Opcional)
gh secret set SLACK_WEBHOOK --body "https://hooks.slack.com/..."
gh secret set TEAMS_WEBHOOK --body "https://outlook.office.com/webhook/..."
```

## 🎛️ Uso de Workflows

### Manual Execution
Puedes ejecutar workflows manualmente desde la interfaz de GitHub o CLI:

```bash
# Ejecutar tests en ambiente específico
gh workflow run playwright-tests.yml -f environment=qa -f browser=chromium -f test_type=ui

# Ejecutar tests de performance
gh workflow run performance-tests.yml -f environment=prod -f duration=10

# Ejecutar suite completa
gh workflow run scheduled-tests.yml -f full_suite=true
```

### Parámetros Disponibles

#### `playwright-tests.yml`
- `environment`: prod, qa, uat
- `browser`: chromium, firefox, webkit, all
- `test_type`: all, ui, api

#### `performance-tests.yml`
- `environment`: prod, qa, uat
- `duration`: duración en minutos (default: 5)

#### `scheduled-tests.yml`
- `full_suite`: ejecutar suite completa (boolean)

## 📊 Reportes y Artifacts

### Artifacts Generados
- **HTML Reports**: Reportes detallados de Playwright
- **Traces**: Archivos de trace para debugging
- **Screenshots**: Capturas en fallos
- **Videos**: Grabaciones de tests fallidos
- **Performance Reports**: Métricas de rendimiento
- **Security Reports**: Resultados de auditoría

### Acceso a Reportes
1. Ve a la pestaña **Actions** en GitHub
2. Selecciona el workflow run
3. Descarga los artifacts desde la sección **Artifacts**

## 🔄 Estrategias de Testing

### Matrix Strategy
Los workflows utilizan matrix strategy para ejecutar tests en paralelo:

```yaml
strategy:
  fail-fast: false
  matrix:
    environment: ['prod', 'qa', 'uat']
    browser: ['chromium', 'firefox', 'webkit']
```

### Caching
- ✅ Cache de dependencias npm
- ✅ Cache de browsers de Playwright
- ✅ Optimización de tiempos de build

### Conditional Execution
- Tests API se ejecutan primero (más rápidos)
- Tests UI solo si API pasan
- Notificaciones solo en fallos críticos

## 🚨 Troubleshooting

### Fallos Comunes

#### Tests Timeout
```yaml
# Aumentar timeout en playwright.config.ts
timeout: 60000 // 60 segundos
```

#### Memory Issues
```yaml
# Reducir workers en CI
workers: process.env.CI ? 1 : undefined
```

#### Browser Installation
```yaml
# Reinstalar browsers
- name: Install Playwright browsers
  run: npx playwright install --with-deps
```

### Debugging
1. **Habilitar trace**: Los workflows ya incluyen trace en fallos
2. **Revisar screenshots**: Disponibles en artifacts
3. **Logs detallados**: Usar `--reporter=list` para más detalles

## 📈 Mejores Prácticas Implementadas

### ✅ Security
- Uso de secretos para credenciales
- No hardcodear valores sensibles
- CodeQL analysis automático
- Auditoría de dependencias

### ✅ Performance  
- Ejecución paralela
- Cache inteligente
- Conditional execution
- Matrix optimization

### ✅ Maintainability
- Templates reutilizables
- Documentación clara
- Naming conventions
- Modular structure

### ✅ Observability
- Reportes detallados
- Notificaciones automáticas
- Artifacts preservados
- Metrics tracking

## 🔧 Personalización

### Agregar Nuevo Ambiente
1. Crear archivo `.env.staging`
2. Agregar secrets correspondientes
3. Actualizar matrix en workflows

### Nuevo Browser
```yaml
matrix:
  browser: ['chromium', 'firefox', 'webkit', 'edge']
```

### Custom Reporters
```yaml
- name: Custom reporter
  run: npx playwright test --reporter=custom-reporter
```

## 📞 Soporte

Para issues relacionados con los workflows:
1. Revisar logs en Actions tab
2. Verificar secretos configurados
3. Validar permisos de repository
4. Crear issue usando templates

---

**Mantenido por:** Uzziel Sierra  
**Última actualización:** $(date +%Y-%m-%d)
