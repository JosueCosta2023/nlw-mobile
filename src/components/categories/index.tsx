import { View, FlatList } from "react-native";
import {s} from "./style"
import { Category } from "../category";

export type CategoriesProps = {
    id: string,
    name: string
}[]

type Props = {
    data: CategoriesProps
}


export function Categories({data}: Props){
    return(
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={(item)=> <Category name={item.item.name} iconId={item.item.id}/>}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={s.container}
            style={s.container}
        />
            
    )
}