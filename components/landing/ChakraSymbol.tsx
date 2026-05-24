/**
 * Renders an offscreen <svg> that defines a reusable #chakra symbol.
 * Use it once on a page; reference via <svg><use href="#chakra"/></svg>.
 */
export function ChakraSymbol() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <symbol id="chakra" viewBox="0 0 100 100">
        <g fill="none" stroke="currentColor" strokeWidth="0.45">
          <circle cx="50" cy="50" r="48.5" />
          <circle cx="50" cy="50" r="44" />
          <circle cx="50" cy="50" r="13" />
          <circle cx="50" cy="50" r="2.2" fill="currentColor" stroke="none" />
        </g>
        <g stroke="currentColor" strokeWidth="0.5" fill="none">
          {Array.from({ length: 24 }).map((_, i) => (
            <line
              key={i}
              x1="50"
              y1="6"
              x2="50"
              y2="44"
              transform={`rotate(${i * 15} 50 50)`}
            />
          ))}
        </g>
      </symbol>
    </svg>
  );
}
