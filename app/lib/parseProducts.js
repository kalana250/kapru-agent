export function parseProductsFromMCP(text) {
  if (!text || typeof text !== "string") return [];

  const products = [];
  
  // Match pattern: **N. Product Name**\n   ID: `...` · LKR X,XXX · ... · ...
  // Then [View product](url)
  const regex = /\*\*\d+\.\s+(.+?)\*\*\s*\n\s*ID:\s*`([^`]+)`\s*·\s*LKR\s*([\d,]+)\s*·\s*([^·\n]+)·\s*([^\n]+)\n\s*\[View product\]\(([^)]+)\)/g;

  let match;
  while ((match = regex.exec(text)) !== null) {
    const [_, name, id, priceStr, stockStr, shipStr, url] = match;
    const price = parseInt(priceStr.replace(/,/g, ""), 10);
    
    products.push({
      id: id.trim(),
      name: name.trim(),
      price,
      url: url.trim(),
      inStock: stockStr.toLowerCase().includes("stock"),
      stockLow: stockStr.toLowerCase().includes("low"),
      shipsInternational: shipStr.toLowerCase().includes("international"),
    });
  }

  return products;
}