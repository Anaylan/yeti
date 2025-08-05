## Approach and Implementation Details

### Core Principles
1. **BEM Methodology**  
   - Strict modularity is implemented: each component (example `search-form`, `card`) is autonomous
   - The naming scheme `block__element_modifier` is used (example: `.header__link_active`)  
   - Styles almost isolated 
2. **Zero-Build Approach**  
   - Project works without buildtools (Webpack/Vite/Gulp)  
   - All dependencies include in `<script>` and `<link>`  
   - Pure Vanilla JS realization without translation

### Project Structure
```plaintext
css/
├── components/           # BEM-blocks
│   ├── auth-form/        # auth-form component
│   ├── footer/           # footer component
│   └── alert/            # alert component
├── global.css            # global styles for a page
├── normalize.css         # normalize styles
└── utilites.js           # utilites
fonts/
img/
index.html                # main page
validator.js              # validator library
alert.js                  # alert library
```

## Challenges and Solutions

### Browser Compatibility
- **Challenge**: Supporting Safari 14+ without build tools
- **Solution**:
  - Manual vendor prefixes for Flexbox

### Development Experience
- **Challenge**: No hot-reload for CSS changes
- **Solution**: Live Server extension with file watchers
