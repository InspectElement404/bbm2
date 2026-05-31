import React from "react";

type aiQueryProps = {
  interpret: string;
  region: string;
  result: Record<string, any>;
};

export function aiQueers({ interpret, region, result }: aiQueryProps) {
  if (interpret == "expensive") {
    let resulting = "";

    const builder = result.map((obj: any) => {
      for (let [key, value] of Object.entries(obj)) {
        resulting += `${key} is ${value}`;
      }
    });
    let reports = `
        Act as a market analyst specializing in Philippine agricultural and fishery commodities.Interpret the following query result showing the most expensive commodity in each commodity type / category within ${region}.Important: the data contains different commodity categories(e.g., Fish, Fruits, Corn, Highland Vegetables), so interpret each within its own context and do not directly compare prices across categories. Treat Nan as no data result or empty. Write a concise analytical summary limited to EXACTLY 1 to 2 short paragraphs only.The response should summarize the most expensive commodities, mention notable specifications or variants when relevant, naturally reference market locations, and highlight meaningful observations or patterns in the data.Do not invent missing information, assume causes of pricing, or provide unsupported conclusions.Query Result: ${resulting}
        `;

    return reports;
  }
  return null;
}
