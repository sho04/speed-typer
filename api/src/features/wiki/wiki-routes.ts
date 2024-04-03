import express from 'express';
import { getWiki } from './wiki-controller';

export default (router: express.Router) => {
    router.get('/wiki', getWiki);
}