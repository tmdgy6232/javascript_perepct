import useHttp from "../hooks/useHttp";
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
    return <p>Fetching ...</p>;
  }

  return (
    <ul id="meals">
      {loadedmeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
