import { TOrder } from "../../services/types";
import { selectIngredients } from "../../services/ingredients";
import { useSelector } from "react-redux";

export const FeedListItem = ({order} : {order : TOrder}) => {

    const { ingredients } = useSelector(selectIngredients);

    const ingredientImages = order.ingredients.reduce((accumulator, item) => {
        if (!accumulator.has(item)) {
            const ingredient = ingredients.find(ing => ing._id === item);
            if (ingredient) {
                accumulator.set(item, ingredient.image_mobile);
            }
        }

        return accumulator;
    }, new Map<string, string>());

    return (
        <div>
            <div>#{order.number}&nbsp;{order.createdAt.toLocaleString()}</div>
            <div>#{order.name}</div>
            <div style={{alignItems: "flex-start", display: "flex", transform: "scale(0.5)", boxSizing: "border-box", left: 0, bottom: 0, width: "100%"}}>{Array.from(ingredientImages.values()).map(i => <img src={i} />)}</div>
        </div>
    );
};