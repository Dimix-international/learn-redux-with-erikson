import {useQuery} from "react-query";
import {cardApi} from "../../api/api";

export const useFetchCards = () => {
    return useQuery('cards', cardApi.getAllProducts);
}