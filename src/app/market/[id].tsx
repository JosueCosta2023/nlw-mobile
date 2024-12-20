import { View, Alert, Modal, StatusBar, ScrollView } from "react-native";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { api } from "@/services/api";
import { useEffect, useRef, useState } from "react";
import { Loading } from "@/components/loading";
import { Cover } from "@/components/market/cover";
import { Details, PropsDetails } from "@/components/market/details";
import { Coupon } from "@/components/market/coupon";
import { Button } from "@/components/button";
import { CameraView, useCameraPermissions } from "expo-camera";

type DataProps = PropsDetails & {
  cover: string;
};

export default function Market() {
  const [_, requestPermission] = useCameraPermissions();
  const params = useLocalSearchParams<{ id: string }>();
  const [data, setData] = useState<DataProps>();
  const [isLoading, setIsLoading] = useState(true);
  const [cupom, setCupom] = useState<string | null>(null);
  const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false);
  const [couponIsFetching, setCouponIsFetching] = useState(false);

  const qrLock = useRef(false);

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

  async function handleOpenCamera() {
    try {
      const { granted } = await requestPermission();

      if (!granted) {
        return Alert.alert("Camera", "Você precisa habilitar o uso da camera");
      }
      qrLock.current = false;
      setIsVisibleCameraModal(true);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Camera",
        "Não foi possivel utilizar a camera de seu dispositivo."
      );
    }
  }

  async function getCoupon(id: string) {
    try {
      setCouponIsFetching(true);
      const { data } = await api.patch(`/coupons/${id}`);
      Alert.alert("Cupom", data.coupon);
      setCupom(data.coupon);
    } catch (error) {
      console.log(error);
      Alert.alert("Cupom:", "Falha ao recuperar cupom, verifique se existe saldo de cupom para esta loja e também se o qrcode corresponde ao cupom fornecido pela loja.");
    } finally {
      setCouponIsFetching(false);
    }
  }

  function handleUseCoumpon(id: string) {
    setIsVisibleCameraModal(false);
    Alert.alert(
      "Cupom",
      "Atenção, Você pode utilizar somente 1 unica vez este cupom. Deseja realmente resgatar o cupom?",
      [
        { style: "cancel", text: "Não" },
        { style: "default", text: "Sim", onPress: () => getCoupon(id) },
      ]
    );
  }

  useEffect(() => {
    fetchMarket();
  }, [params.id, cupom]);

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <Redirect href="/home" />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <StatusBar barStyle="light-content" hidden={isVisibleCameraModal} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Cover uri={data.cover} />
        <Details data={data} />

        {cupom && <Coupon code={cupom} />}
      </ScrollView>

      <View style={{ padding: 32, width: "100%" }}>
        <Button onPress={() => handleOpenCamera()}>
          <Button.Title>Ler Qr Code</Button.Title>
        </Button>
      </View>

      <Modal style={{ flex: 1 }} visible={isVisibleCameraModal}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data && !qrLock.current) {
              qrLock.current = true;
              setTimeout(() => handleUseCoumpon(data), 500);
            }
          }}
        />
        <View
          style={{
            flex: 1,
            position: "absolute",
            bottom: 32,
            left: 32,
            right: 32,
          }}
        >
          <Button
            isLoading={couponIsFetching}
            onPress={() => setIsVisibleCameraModal(false)}
          >
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  );
}
