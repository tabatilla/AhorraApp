export function formatPrice(cents) {
    return (cents / 100).toLocaleString("es-PE", {
      style: "currency",
      currency: "PEN"
    });
  }