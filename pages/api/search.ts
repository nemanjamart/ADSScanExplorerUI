import { NextApiRequest, NextApiResponse } from "next";
import ArticleType from "../../types/article";


export default async function handler(req: NextApiRequest, res: NextApiResponse<ArticleType[]>) {
    //const { query  } = req.query
    // const response = 

    // if (response.ok) {
    //     return response
    // } else {

    // }

    return fetch('http://localhost:8181/service/metadata/articles')
  }