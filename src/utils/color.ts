/**
 * Converts a hex color to RGB values
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  // Remove the hash if present
  hex = hex.replace('#', '');
  
  // Handle 3-digit hex codes by expanding them
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }
  
  // Validate hex format
  if (hex.length !== 6 || !/^[0-9A-Fa-f]{6}$/.test(hex)) {
    return null;
  }
  
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  
  return { r, g, b };
}

/**
 * Calculates the relative luminance of an RGB color
 * Based on WCAG 2.1 guidelines
 */
function getRelativeLuminance(r: number, g: number, b: number): number {
  // Normalize RGB values to 0-1 range
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  
  // Calculate relative luminance
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Determines the appropriate text color (black or white) for a given hex background color
 * @param hexColor - The background color in hex format (with or without #)
 * @returns '#000000' for dark text or '#ffffff' for light text
 */
export function getTextColorForBackground(hexColor: string): string {
  const rgb = hexToRgb(hexColor);
  
  if (!rgb) {
    console.warn(`Invalid hex color: ${hexColor}. Defaulting to black text.`);
    return '#000000';
  }
  
  const luminance = getRelativeLuminance(rgb.r, rgb.g, rgb.b);
  
  // Use white text for dark backgrounds (luminance < 0.5)
  // Use black text for light backgrounds (luminance >= 0.5)
  return luminance < 0.5 ? '#ffffff' : '#000000';
}

/**
 * Converts RGB values to a hex color string
 */
function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (c: number) => {
    const hex = Math.round(c).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Calculates an adequate border color for a given hex background color
 * @param hexColor - The background color in hex format (with or without #)
 * @param adjustmentFactor - How much to adjust the brightness (default: 0.2)
 * @returns A hex color string for the border
 */
export function getBorderColorForBackground(hexColor: string, adjustmentFactor: number = 0.2): string {
  const rgb = hexToRgb(hexColor);
  
  if (!rgb) {
    console.warn(`Invalid hex color: ${hexColor}. Defaulting to gray border.`);
    return '#808080';
  }
  
  const luminance = getRelativeLuminance(rgb.r, rgb.g, rgb.b);
  
  // If luminance is dark (< 0.5), make the border brighter
  // If luminance is light (>= 0.5), make the border darker
  const isDark = luminance < 0.5;
  const factor = isDark ? 1 + adjustmentFactor : 1 - adjustmentFactor;
  
  // Adjust each RGB component
  const adjustedR = Math.min(255, Math.max(0, rgb.r * factor));
  const adjustedG = Math.min(255, Math.max(0, rgb.g * factor));
  const adjustedB = Math.min(255, Math.max(0, rgb.b * factor));
  
  return rgbToHex(adjustedR, adjustedG, adjustedB);
}
