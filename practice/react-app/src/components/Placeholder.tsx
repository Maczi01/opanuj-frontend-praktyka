export const Placeholder = ({ lines, height }: { lines: number; height: number }) => {
  return (
    <>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`animate-pulse h-${height} bg-gray-300 rounded-lg mb-2`}
        />
      ))}
    </>
  );
};