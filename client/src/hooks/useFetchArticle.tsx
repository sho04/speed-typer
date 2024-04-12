import {useState, useCallback} from 'react';
import axios from 'axios';

export type Article = {
    title: string;
    pageid: number;
    extract: string;
}

// Call hook in component to set article loading error and fetch article
// This hook is used to fetch a random article from wikipedia
// fetchArticle is a callback that can be called from the component that is using this hook.
export const useFetchArticle = () => {
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchArticle = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get<Article>('http://localhost:3050/api/wiki/random');
            setArticle(response.data);
        } catch (error) {
            setError("Failed to fetch wiki data");
        } finally {
            setLoading(false);
        }
    }, []);

    return {article, loading, error, fetchArticle};
}