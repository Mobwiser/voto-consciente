import { NextApiRequest, NextApiResponse } from "next";
import Parser from 'rss-parser';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const parser = new Parser();
        const feed = await parser.parseURL('https://news.google.com/rss/search?q=eleicoes+legislativas+2024&hl=pt-PT&gl=PT&ceid=PT:pt-150');

        // so vai buscar as ultimas x entries - neste caso 20 (alterar conforme necessario)
        const limitedItems = feed.items.slice(0, 20);

        const transformedData = {
          title: feed.title,
          items: limitedItems.map(item => ({
            title: item.title,
            pubDate: item.pubDate,
            link: item.link,
          })),
        };

        res.status(200).json(transformedData);
      } catch (error) {
        console.error('Error fetching or parsing RSS feed:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;
    default:
      res.status(405).json({ error: 'Method Not Allowed' });
  }
}
