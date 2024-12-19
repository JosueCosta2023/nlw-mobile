import {View, Text, Alert} from "react-native"
import {router, useLocalSearchParams} from "expo-router"
import { api } from "@/services/api"
import { useEffect, useState } from "react"
import { isLoading } from "expo-font"
import { Loading } from "@/components/loading"
export default function Market(){

    const params = useLocalSearchParams<{id: string}>()
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true)

    async function fetchMarket(){
        try {
            const {data} = await api.get(`/markets/${params.id}`)
            setData(data)
            setIsLoading(false)
            
        } catch (error) {
            console.log(error)
            Alert.alert("Erro:", "Não foi possivel carregar os dados da loja", [
                {text: "OK", onPress: () => router.back()}
            ])
        }
    }

    useEffect(() => {
        fetchMarket()
    }, [params.id])

    if(isLoading){
        return(
            <Loading/>
        )
    }

    return(
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text></Text>
        </View>
    )
}