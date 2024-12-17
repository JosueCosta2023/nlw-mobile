import { View, Alert } from "react-native";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { Categories, CategoriesProps } from "@/components/categories";
import { PlaceProps } from "@/components/place";
import { Places } from "@/components/places";
import MapView from "react-native-maps";
import * as Location from 'expo-location';

type MarketsProps = PlaceProps & {}

const currentLocation = {
    latitude: -13.450677,
    longetude: -56.7290972
}


export default function Home(){
    const [ categories, setCategories] = useState<CategoriesProps>([])
    const [category, setCategory] = useState("");
    const [markets, setMarkets] = useState<MarketsProps[]>([])


    async function fetchCategories(){
        try {

            const {data} = await api.get("/categories")
            setCategories(data)
            setCategory(data[0].id)
            
        } catch (error) {
            console.log(error)
            Alert.alert("Categorias", "Falha ao carregar categorias.")
        }
    }

    async function fetchgMarkets(){
        try {
            if(!category){
                return
            }

            const {data} = await api.get("/markets/category/" + category)
            setMarkets(data)
        } catch (error) {
            console.log(error)
            Alert.alert("Locais:", "Não foi possivel carregar os locais.")
        }
    }

    async function getCurrentLocation(){
    try {
        const {granted} = await Location.requestForegroundPermissionsAsync()
        if(granted){
           const location =  await Location.getCurrentPositionAsync({})
           console.log(location)
        }

        
    } catch (error) {
        console.log(error);
        Alert.alert("Localização:", "Impossivel identificar sua localização")
    }
    }

    useEffect(() =>{
        fetchCategories()
    }, [])

    useEffect(() =>{
        fetchgMarkets()
    }, [category])
    
return(
    <View style={{flex: 1, justifyContent: "center", alignItems: "center",  backgroundColor: "gray" }}>
        <Categories data={categories} onSelect={setCategory} selected={category}/>
        <MapView
            style={{flex: 1, width: "100%",height: "100%"}}
            region={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longetude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
        />
        <Places data={markets}/>
    </View>
)
}
