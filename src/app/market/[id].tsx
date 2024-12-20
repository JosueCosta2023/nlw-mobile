import { View, Text, Alert, Modal } from "react-native";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { Loading } from "@/components/loading";
import { Cover } from "@/components/market/cover";
import { Details, PropsDetails } from "@/components/market/details";
import { Coupon } from "@/components/market/coupon";
import { Button } from "@/components/button";

type DataProps = PropsDetails & {
  cover: string;
};

export default function Market() {
  const params = useLocalSearchParams<{ id: string }>();
  const [data, setData] = useState<DataProps>();
  const [isLoading, setIsLoading] = useState(true);
  const [cupom, setCupom] = useState<string | null>(null);
  const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false);

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

  function handleOpenCamera() {
    try {
      setIsVisibleCameraModal(true);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error",
        "Não foi possivel abrir a camera de seu dispositivo."
      );
    }
  }

  useEffect(() => {
    fetchMarket();
  }, [params.id]);

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <Redirect href="/home" />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Cover uri={data.cover} />
      <Details data={data} />

      {cupom && <Coupon code={cupom} />}

      <View style={{ padding: 32 }}>
        <Button onPress={() => handleOpenCamera()}>
          <Button.Title>Ler Qr Code</Button.Title>
        </Button>

        <Modal style={{ flex: 1 }} visible={isVisibleCameraModal}>
          <View style={{flex: 1, justifyContent: "center"}}>
            <Button onPress={() => setIsVisibleCameraModal(false)}>
              <Button.Title>Voltar</Button.Title>
            </Button>
          </View>
        </Modal>
      </View>
    </View>
  );
}
