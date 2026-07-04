// Script-context declaration (no imports/exports) so this is a GLOBAL ambient
// wildcard, letting `tsc` accept global CSS side-effect imports like
// `import "./overrides.css"` in layout.tsx.
declare module "*.css";
