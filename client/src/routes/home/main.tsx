import react from "react";
import { useState, useEffect } from "react";
import TypeBox from "../../components/type-box/main";
import "./style.scss";
import { useFetchArticle, Article } from "../../hooks/useFetchArticle";

const Home = () => {
    const { article, loading, error, fetchArticle } = useFetchArticle();
    const [gameState, setGameState] = useState<
        "loading" | "playing" | "finished"
    >("playing");

    useEffect(() => {
        //fetchArticle();
    }, []);

    useEffect(() => {
        console.log(article);
    }, [article]);

    useEffect(() => {}, [gameState]);

    return (
        <div className="home">
            <TypeBox
                {...{ article, loading, error, fetchArticle, setGameState }}
            />

            <button>Start Game</button>
        </div>
    );
};

export default Home;
