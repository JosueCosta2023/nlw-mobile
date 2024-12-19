import { View, Text, Alert } from "react-native";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { Loading } from "@/components/loading";
import { Cover } from "@/components/market/cover";
import { Details, PropsDetails } from "@/components/market/details";
import { Coupon } from "@/components/market/coupon";

type DataProps = PropsDetails & {
  cover: string;
};

export default function Market() {
  const params = useLocalSearchParams<{ id: string }>();
  const [data, setData] = useState<DataProps>();
  const [isLoading, setIsLoading] = useState(true);
  const [cupom, setCupom] = useState<string | null>(null)

  async function fetchMarket() {
    try {
      const { data } = await api.get(`/markets/${params.id}`);
      setData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro:", "Não foi possivel carregar os dados da loja", [
        { text: "OK", onPress: () => router.back() },
      ]);
    }
  }

  useEffect(() => {
    fetchMarket();
  }, [params.id]);

  if (isLoading) {
    return <Loading />;
  }

  if(!data){
    return <Redirect href="/home"/>
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Cover uri={data.cover} />
      <Details data={data}/>

      {cupom && <Coupon code={cupom}/>}
      
    </View>
  );
}
