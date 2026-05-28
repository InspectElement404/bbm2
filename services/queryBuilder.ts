

export function expensiveType(region: string | null) {
    const query = `WITH mark AS (
  SELECT  
    type, 
    commodity, 
    specifications, 
    market, 
    price, 
    ROW_NUMBER() OVER (PARTITION BY type ORDER BY price DESC) AS rn
  FROM master_prices
  WHERE region = '${region}' 
    AND price IS NOT NULL
) 
SELECT 
  type, 
  commodity, 
  specifications, 
  market, 
  price
FROM mark 
WHERE rn = 1;`

    return query

}