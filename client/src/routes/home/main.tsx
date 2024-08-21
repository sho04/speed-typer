import react from "react";
import { useState, useEffect } from "react";
import TypeBox from "../../components/type-box/main";
import "./style.scss";
import { useFetchArticle } from "../../hooks/useFetchArticle";
import PointDisplay from "../../components/point-display/main";
import Store from "../../components/store/main";

const Home = () => {
    const { article, loading, error, fetchArticle } = useFetchArticle();
    const [gameState, setGameState] = useState<
        "loading" | "playing" | "finished"
    >("playing");

    const [points, setPoints] = useState(0);

    const addPoints = (accuracy: number, wordCount: number) => {
        setPoints(points + Math.round(accuracy * wordCount));
    };

    useEffect(() => {
        //fetchArticle();
    }, []);

    useEffect(() => {
        console.log(article);
    }, [article]);

    useEffect(() => {}, [gameState]);

    return (
        <div className="home">
            <div className={"side"}>
                <Store />
            </div>

            <div className={"main"}>
                <PointDisplay {...{ points }}></PointDisplay>
                <TypeBox
                    {...{
                        article,
                        loading,
                        error,
                        fetchArticle,
                        setGameState,
                        addPoints,
                    }}
                />
            </div>

            {/* <button>Start Game</button> */}
        </div>
    );
};

export default Home;
