/** Estilo para escalonar animaciones: style={stagger(2)} → --i: 2 */
export const stagger = (i: number) => ({ "--i": i }) as React.CSSProperties;
