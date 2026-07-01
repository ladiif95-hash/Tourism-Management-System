const images = [
  "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=700&q=80"
];

export function DestinationShowcase({ destinations }) {
  return (
    <div className="showcase">
      {destinations.slice(0, 3).map((destination, index) => (
        <article className="placeCard" key={destination.destinationId}>
          <img src={images[index]} alt={destination.destinationName} />
          <div>
            <strong>{destination.destinationName}</strong>
            <span>{destination.location} - ${Number(destination.entryFee).toFixed(2)}</span>
          </div>
        </article>
      ))}
    </div>
  );
}

