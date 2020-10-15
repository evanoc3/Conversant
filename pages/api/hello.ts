import type { NextApiRequest, NextApiResponse } from "next";


export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).send(`Hello, World! It is ${new Date()}`);
}
