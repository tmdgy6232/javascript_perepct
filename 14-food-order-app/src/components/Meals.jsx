import useHttp from "../hooks/useHttp";
import Error from "./Error";
import MealItem from "./MealItem";

// 객체 생성하면 useEffect때문에 무한루프 도니까 밖에다가 생성
const requestConfig = {};
export default function Meals() {
  const {
    data: loadedmeals,
    error,
    isLoading,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (isLoading) {
    return <p className="center">Fetching ...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  return (
    <ul id="meals">
      {loadedmeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
